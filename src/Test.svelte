<script>
  import { Cloudinary } from "@cloudinary/url-gen";
  import {
    outline,
    backgroundRemoval,
  } from "@cloudinary/url-gen/actions/effect";
  import { source } from "@cloudinary/url-gen/actions/overlay";
  import { text } from "@cloudinary/url-gen/qualifiers/source";
  import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
  import { ImageStatus } from "../types.d";
  import { writable } from "svelte/store";
  import Controladores from "./Controladores.svelte";
  import { imageStatus, modifiedImage } from "./store";

  export let publicId;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  // Variables de control
  let applyOutline = false;
  let outlineWidth = 10;
  let outlineColor = "#000000";
  let applyBackgroundRemoval = false;
  let applyText = false;
  let textContent = "Texto de Ejemplo";
  let textColor = "#000000";
  let textSize = 20;
  let textFont = "Arial";

  let persistentPublicId = ""; // Guardará el `public_id` de la imagen sin fondo
  let processingImage = false;
  let showModified = false; // Controla si se muestra la imagen modificada o la original

  // Manejo de cambios en la imagen
  async function updateImage() {
    let img = cld.image(persistentPublicId || publicId);

    if (applyBackgroundRemoval && !persistentPublicId) {
      await processBackgroundRemoval();
    }

    if (applyOutline) {
      img = img.effect(outline().width(outlineWidth).color(outlineColor));
    }

    if (applyText) {
      img = img.overlay(
        source(text(textContent, new TextStyle(textFont, textSize))),
      );
    }

    modifiedImage.set(img.toURL());
    imageStatus.set(ImageStatus.DONE);
  }

  // Subir imagen sin fondo una sola vez
  async function processBackgroundRemoval() {
    processingImage = true;
    let img = cld.image(publicId).effect(backgroundRemoval());

    try {
      const res = await fetch(img.toURL());
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "ml_default");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dr4htmwol/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await uploadRes.json();
      persistentPublicId = data.public_id; // Guardar el nuevo `public_id`
      await updateImage(); // Aplicar contorno si está activado
    } catch (error) {
      console.error("Error al subir la imagen sin fondo:", error);
    } finally {
      processingImage = false;
    }
  }

  function toggleImage() {
    showModified = !showModified;
  }

  function handleUpdateOutline(event) {
    applyOutline = event.detail.applyOutline;
    outlineWidth = event.detail.outlineWidth;
    outlineColor = event.detail.outlineColor;
    updateImage(); // Llamar directamente a updateImage al cambiar los parámetros del contorno
  }

  function handleUpdateBackgroundRemoval(event) {
    applyBackgroundRemoval = event.detail.applyBackgroundRemoval;
    if (applyBackgroundRemoval && !persistentPublicId) {
      processBackgroundRemoval();
    }
  }

  // Nueva función para manejar los cambios de texto
  function handleUpdateText(event) {
    applyText = event.detail.applyText;
    textContent = event.detail.textContent;
    textColor = event.detail.textColor;
    textSize = event.detail.textSize;
    textFont = event.detail.textFont;
    updateImage(); // Actualizar la imagen con el texto
  }
</script>

<div class="flex md:flex-row w-full h-full bg-silver">
  <div class="absolute top-48 left-48 z-10">
    <button on:click={toggleImage} class="bg-pink-100 text-pink-600 font-semibold py-1 px-4 rounded-md shadow-md hover:bg-pink-200">
      {showModified ? "Antes" : "Después"}
    </button>
  </div>
  <!-- Contenedor del área de visualización de la imagen (Tapiz) -->
  <div class="flex flex-col items-center justify-center w-full md:w-3/5 lg:w-3/5 max-h-[80vh] relative mx-auto overflow-y-auto">
    <!-- Botón para alternar entre antes/después, ubicado dentro del tapiz -->
    {#if processingImage}
      <p class="text-gray-700 text-lg font-medium mt-10">Procesando imagen...</p>
    {:else}
      <!-- Contenedor de la imagen dentro del tapiz sin bordes ni sombra -->
      <div class="flex items-center justify-center w-1/2 h-4/5 bg-white shadow-md rounded-md">
        <img
          src={$modifiedImage}
          alt="Imagen con efectos"
          class="flex justify-center items-center max-w-full max-h-full object-contain"
        />
      </div>
    {/if}
  </div>

  <!-- Barra de opciones, pegada al lado derecho -->
  <div class="w-full md:w-1/5 h-full bg-white md:sticky md:top-0 p-4 z-10">
    <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Crea un Sticker</h2>
    <Controladores
      on:updateOutline={handleUpdateOutline}
      on:updateBackgroundRemoval={handleUpdateBackgroundRemoval}
      on:updateText={handleUpdateText}
    />
  </div>
</div>


