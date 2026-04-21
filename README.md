# Gestión de Locales

Aplicación móvil desarrollada con **Ionic 8 + Angular 20 + Capacitor 8** para gestionar información de locales (descripción y recomendación).

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| Ionic | 8 |
| Angular | 20 |
| Capacitor | 8 |
| TypeScript | 5.9 |
| Node.js | 18+ |

---

## Requisitos previos

Instalar antes de comenzar:

- [Node.js](https://nodejs.org/) v18 o superior
- Ionic CLI:
  ```bash
  npm install -g @ionic/angular
  ```
- **Para Android:** Android Studio con SDK y un emulador configurado (AVD)

---

## Crear el proyecto desde cero

### 1. Instalar Ionic CLI

```bash
npm install -g @ionic/cli
```

### 2. Crear el proyecto

```bash
ionic start gestion-locales blank --type=angular --capacitor
cd gestion-locales
```

### 3. Instalar dependencias de Capacitor Android

```bash
npm install @capacitor/android
```

### 4. Modificar `angular.json`

Aumentar el budget de estilos en la sección `configurations > production` para evitar errores de compilación:

```json
{
  "type": "anyComponentStyle",
  "maximumWarning": "10kb",
  "maximumError": "20kb"
}
```

### 5. Agregar la fuente Inter en `src/global.scss`

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### 6. Desarrollar la página principal

Editar los archivos:

- `src/app/home/home.page.ts` — lógica CRUD
- `src/app/home/home.page.html` — interfaz
- `src/app/home/home.page.scss` — estilos
- `src/theme/variables.scss` — design tokens

Crear el componente del modal:

```
src/app/home/local-modal/
├── local-modal.component.ts
├── local-modal.component.html
└── local-modal.component.scss
```

Registrar el componente en `src/app/home/home.module.ts`:

```typescript
import { LocalModalComponent } from './local-modal/local-modal.component';

@NgModule({
  declarations: [HomePage, LocalModalComponent]
})
```

---

## Levantar en el navegador

```bash
ionic serve --port=8102
```

Abrir en el navegador: **http://localhost:8102**

> Si el puerto ya está ocupado, liberar primero:
> ```bash
> npx kill-port 8102
> ```

---

## Levantar en emulador Android

### Requisitos adicionales
- Android Studio instalado con un AVD creado (ej. Pixel 9)
- JDK 21 (incluido en Android Studio: `Program Files/Android/Android Studio/jbr`)

### Pasos

**1. Generar los assets web:**
```bash
ionic build
```

**2. Agregar la plataforma Android** (solo la primera vez):
```bash
npx cap add android
```

**3. Agregar fixes en `android/gradle.properties`:**
```properties
android.overridePathCheck=true
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```
> `overridePathCheck` es necesario si la ruta del proyecto contiene caracteres especiales (tildes, espacios, etc.).  
> `java.home` apunta al JDK 21 incluido en Android Studio, requerido por Capacitor 8.

**4. Sincronizar Capacitor:**
```bash
npx cap sync android
```

**5. Construir el APK:**
```bash
cd android
.\gradlew.bat assembleDebug
```

El APK se genera en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**6. Iniciar el emulador** (desde Android Studio o por línea de comandos):
```bash
emulator -avd Pixel_9 -no-snapshot-load
```

**7. Instalar e iniciar la app:**
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n "io.ionic.starter/.MainActivity"
```

---

## Funcionalidades

- **Agregar** locales con descripción y recomendación (modal)
- **Editar** registros existentes (modal pre-cargado)
- **Eliminar** registros seleccionados
- **Buscar** por descripción o recomendación en tiempo real
- **Limpiar** selección y búsqueda
- Validaciones: campos obligatorios y descripción única (llave primaria)
- Botones Editar/Eliminar deshabilitados hasta seleccionar un registro

---

## Estructura del proyecto

```
src/
├── app/
│   ├── home/
│   │   ├── local-modal/        # Modal para agregar/editar
│   │   │   ├── local-modal.component.ts
│   │   │   ├── local-modal.component.html
│   │   │   └── local-modal.component.scss
│   │   ├── home.page.ts        # Lógica principal
│   │   ├── home.page.html      # Plantilla
│   │   ├── home.page.scss      # Estilos (glassmorphism dark)
│   │   └── home.module.ts
│   └── app.module.ts
├── theme/
│   └── variables.scss          # Design tokens
└── global.scss
```

---

## Curso

**ITI-621 Tecnologías y Sistemas Web III**  
Universidad Técnica Nacional — Sede Guanacaste
