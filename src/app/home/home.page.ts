import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalModalComponent } from './local-modal/local-modal.component';

interface Local {
  id: number;
  descripcion: string;
  recomendacion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  locales: Local[] = [];
  filteredLocales: Local[] = [];
  busqueda: string = '';
  selectedId: number | null = null;
  nextId: number = 1;

  get selectedLocal(): Local | undefined {
    return this.locales.find(l => l.id === this.selectedId);
  }

  get puedeEditarEliminar(): boolean {
    return this.selectedId !== null;
  }

  constructor(private modalCtrl: ModalController) {}

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: LocalModalComponent,
      componentProps: { localesExistentes: this.locales },
      cssClass: 'bottom-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      handle: false,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.locales.push({ id: this.nextId++, ...data });
      this.aplicarBusqueda();
    }
  }

  async abrirModalEditar() {
    if (!this.selectedLocal) return;
    const modal = await this.modalCtrl.create({
      component: LocalModalComponent,
      componentProps: {
        localEditar: this.selectedLocal,
        localesExistentes: this.locales,
      },
      cssClass: 'bottom-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      handle: false,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      const index = this.locales.findIndex(l => l.id === this.selectedId);
      if (index !== -1) {
        this.locales[index] = { id: this.selectedId!, ...data };
      }
      this.limpiar();
      this.aplicarBusqueda();
    }
  }

  seleccionar(local: Local) {
    this.selectedId = this.selectedId === local.id ? null : local.id;
  }

  eliminar() {
    if (this.selectedId === null) return;
    this.locales = this.locales.filter(l => l.id !== this.selectedId);
    this.limpiar();
    this.aplicarBusqueda();
  }

  buscar() {
    this.aplicarBusqueda();
  }

  private aplicarBusqueda() {
    const term = this.busqueda.trim().toLowerCase();
    this.filteredLocales = term
      ? this.locales.filter(
          l =>
            l.descripcion.toLowerCase().includes(term) ||
            l.recomendacion.toLowerCase().includes(term)
        )
      : [...this.locales];
  }

  limpiar() {
    this.busqueda = '';
    this.selectedId = null;
    this.filteredLocales = [...this.locales];
  }
}
