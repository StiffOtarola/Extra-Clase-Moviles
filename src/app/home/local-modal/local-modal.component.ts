import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-local-modal',
  templateUrl: 'local-modal.component.html',
  styleUrls: ['local-modal.component.scss'],
  standalone: false,
})
export class LocalModalComponent implements OnInit {

  @Input() localEditar: { id: number; descripcion: string; recomendacion: string } | null = null;
  @Input() localesExistentes: { id: number; descripcion: string }[] = [];

  descripcion: string = '';
  recomendacion: string = '';

  errorDescripcion = false;
  errorRecomendacion = false;
  errorDuplicado = false;

  get modoEdicion(): boolean {
    return this.localEditar !== null;
  }

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.localEditar) {
      this.descripcion = this.localEditar.descripcion;
      this.recomendacion = this.localEditar.recomendacion;
    }
  }

  guardar() {
    this.errorDescripcion = !this.descripcion.trim();
    this.errorRecomendacion = !this.recomendacion.trim();
    if (this.errorDescripcion || this.errorRecomendacion) return;

    const duplicado = this.localesExistentes.some(
      l =>
        l.descripcion.trim().toLowerCase() === this.descripcion.trim().toLowerCase() &&
        l.id !== this.localEditar?.id
    );
    if (duplicado) { this.errorDuplicado = true; return; }

    this.modalCtrl.dismiss({
      descripcion: this.descripcion.trim(),
      recomendacion: this.recomendacion.trim(),
    }, 'confirm');
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
