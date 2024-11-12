![Texto alternativo](/public/logo.png)

StickersLab es una aplicación que permite a los usuarios cargar imágenes, eliminar fondos, agregar efectos y bordes personalizados para crear stickers únicos. Desarrollada con Svelte, Vite y Cloudinary, esta herramienta ofrece edición en tiempo real, permitiendo aplicar múltiples efectos acumulativos a las imágenes.

> Proyecto Fork de [Midu Dev](https://github.com/midudev).

## 🌟 Características

- **Subida de Imágenes**: Carga imágenes en formato PNG, JPG, WebP y JPEG.
- **Eliminación de Fondos**: Quita el fondo automáticamente.
- **Aplicación de Bordes y Contornos**: Personaliza los bordes con diferentes colores y grosores.
- **Edición en Tiempo Real**: Visualiza los cambios al instante a medida que aplicas efectos.
- **Añadir Múltiples Efectos**: Agrega efectos de manera acumulativa para obtener resultados únicos.

## 📸 Interfaz de Usuario

![alt text](/public/image.png)

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instrucciones de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/StickersLab.git
   cd StickersLab
   ```

2. Instala las dependencias:

   ```js
   npm install
   ```

3. Configura tus variables de entorno en un archivo .env  en la raíz del proyecto, con las siguientes variables:

   ```js
   VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
   VITE_CLOUDINARY_API_KEY=tu_api_key
   ```

4. Inicia el servidor de desarrollo:

   ```js
   npm run dev
   ```
