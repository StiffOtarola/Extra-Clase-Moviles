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

- [Node.js](https://nodejs.org/) v18 o superior
- [Ionic CLI](https://ionicframework.com/docs/cli): `npm install -g @ionic/cli`
- **Para Android:** Android Studio con SDK y un emulador configurado (AVD)

---

## Instalación del proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/StiffOtarola/Extra-Clase-Moviles.git
cd Extra-Clase-Moviles

# 2. Instalar dependencias
npm install
```

---

## Levantar en el navegador (desarrollo)

```bash
ionic serve --port=8102
```

Abrir en el navegador: **http://localhost:8102**

---

## Levantar en emulador Android

### Requisitos adicionales
- Android Studio instalado
- Emulador **Pixel_9** (o cualquier AVD) creado
- JDK 21 (incluido en Android Studio en `Program Files/Android/Android Studio/jbr`)

### Pasos

**1. Generar los assets web:**
```bash
ionic build
```

**2. Agregar la plataforma Android** (solo la primera vez):
```bash
npx cap add android
```

Luego agregar estas líneas al archivo `android/gradle.properties`:
```properties
android.overridePathCheck=true
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

**3. Sincronizar Capacitor:**
```bash
npx cap sync android
```

**4. Construir el APK:**
```bash
cd android
.\gradlew.bat assembleDebug
```

El APK se genera en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**5. Instalar e iniciar en el emulador** (emulador debe estar corriendo):
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n "io.ionic.starter/.MainActivity"
```

---

## Funcionalidades

- **Agregar** locales con descripción y recomendación
- **Editar** registros existentes mediante modal
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
│   │   ├── home.page.ts        # Lógica principal
│   │   ├── home.page.html      # Plantilla
│   │   └── home.page.scss      # Estilos (glassmorphism dark)
│   └── app.module.ts
├── theme/
│   └── variables.scss          # Design tokens (colores, radios, efectos)
└── global.scss
```

---

## Curso

**ITI-621 Tecnologías y Sistemas Web III**  
Universidad Técnica Nacional — Sede Guanacaste
