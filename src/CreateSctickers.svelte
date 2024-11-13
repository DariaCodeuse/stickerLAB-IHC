<script lang="ts">
  import { Cloudinary } from "@cloudinary/url-gen";
  import { ImageStatus } from "../types.d";
  import { imageStatus, originalImage } from "./store";
  import { onMount } from "svelte";
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css";
  import { createEventDispatcher } from "svelte";
  import Testeando from "./Testeando.svelte";

  // Título y subtítulo
  export let title = "Crea un";
  export let boldTitle = "STICKER";
  export let subtitle = "Sube una imagen, quítale el fondo y agrégale un borde para crear un sticker personalizado.";

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
    url: {
      secure: true,
    },
  });

  // Despachador de eventos
  const dispatch = createEventDispatcher();

  let publicId = ""; // Define `publicId` aquí para usarlo como prop

  function initializeDropzone() {
    const dropzone = new Dropzone("#dropzone", {
      uploadMultiple: false,
      acceptedFiles: ".jpg,.png,.webp,.jpeg",
      maxFiles: 1,
    });

    dropzone.on("sending", (file, xhr, formData) => {
      imageStatus.set(ImageStatus.UPLOADING);
      formData.append("upload_preset", "ml_default");
      formData.append("timestamp", Date.now() / 1000);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY141818374831);
    });

    dropzone.on("success", (file, response) => {
      const { public_id: id, secure_url: url } = response;
      imageStatus.set(ImageStatus.DONE);
      originalImage.set(url);
      publicId = id;
      dispatch('imageUploaded', { publicId }); // Envía el evento 'imageUploaded' con publicId
    });

    dropzone.on("error", (file, response) => {
      console.error("Error al subir el archivo:", response);
      alert("Hubo un error al subir tu imagen. Verifica tu configuración de Cloudinary.");
    });
  }

  onMount(() => {
    initializeDropzone();
  });
</script>

<div class="w-full h-full flex flex-col items-center justify-center mx-auto">
  {#if $imageStatus === ImageStatus.READY || $imageStatus === ImageStatus.UPLOADING}
    <!-- Dropzone para carga de archivos -->
    <div class="w-full max-w-2xl px-4 text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        {title} <span class="text-blue-600">{boldTitle}</span>
      </h1>
      <p class="mt-2 text-gray-600">{subtitle}</p>

      <!-- Formulario de Dropzone -->
      <form
        id="dropzone"
        class="w-full h-[250px] mt-8 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center gap-2 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg focus-within:border-blue-500 transition-all duration-300 ease-in-out"
        action="https://api.cloudinary.com/v1_1/dvbk40lt2/image/upload"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-12 w-12 text-gray-500 group-hover:text-blue-400 transition duration-300">
          <path d="M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path>
        </svg>
        <p class="text-gray-700 font-medium group-hover:text-blue-600 transition duration-300">Seleccionar Archivos PNG/JPG</p>
        <p class="text-sm italic text-gray-500 group-hover:text-blue-400 transition duration-300">o arrastra y suelta tu archivo aquí</p>
        {#if $imageStatus === ImageStatus.UPLOADING}
          <strong class="text-lg mt-4 text-gray-800">Subiendo archivos...</strong>
        {/if}
      </form>
    </div>
  {:else if $imageStatus === ImageStatus.DONE}
    <!-- Contenedor de `Test` cuando la imagen está lista -->
    <Testeando {publicId} />
  {/if}
</div>

<!-- 
VITE_CLOUDINARY_CLOUD_NAME=dr4htmwol
VITE_CLOUDINARY_API_KEY=713826575382447
VITE_UPLOAD_PRESET=ml_default 

VITE_CLOUDINARY_CLOUD_NAME=dvbk40lt2
VITE_CLOUDINARY_API_KEY=967427271788521
VITE_UPLOAD_PRESET=ml_default 
-->