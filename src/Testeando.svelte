<script>
  import { Cloudinary } from "@cloudinary/url-gen";
  import { brightness, contrast, saturation } from "@cloudinary/url-gen/actions/adjust";
  import { outline, backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
  import { source } from "@cloudinary/url-gen/actions/overlay";
  import { scale } from "@cloudinary/url-gen/actions/resize";
  import { text } from "@cloudinary/url-gen/qualifiers/source";
  import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
  import { Position } from "@cloudinary/url-gen/qualifiers/position";
  import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
  
  import { imageStatus, modifiedImage, originalImage  } from "./store";
  import { ImageStatus } from "../types.d";
  import { writable } from "svelte/store";
  import Controladores from "./ControllerEI.svelte";
  

  export let publicId;
  let imageUrl = "";

  $: if (publicId) updateImage();

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
  });

  // Variables de control
  let applyOutline = false, outlineWidth = 10, outlineColor = "#000000";
  let applyBackgroundRemoval = false;
  let applyText = false, textContent = "Texto de Ejemplo", textColor = "#000000", textSize = 20, textFont = "Arial", gravity="south", textY=20;
  let brightnessLevel = 0;
  let contrastLevel = 0;
  let saturationLevel = 100;
  
  let persistentPublicId = "";
  let processingImage = false;
  const showModified = writable(false);

  function configureImage() {
    let img = cld.image(persistentPublicId || publicId);

    if (applyOutline) {
      img.effect(outline().width(outlineWidth).color(outlineColor));
    }
    if (applyText && textContent.trim()) {
      // Asegúrate de codificar el texto correctamente
      const encodedText = encodeURIComponent(textContent);

      img.resize(scale().width(500)).overlay(
        source(
          text(encodedText, new TextStyle(textFont, textSize))
            .textColor(textColor)
        ).position(
          new Position()
            .gravity(compass(gravity))
            .offsetY(textY)
        )
      );
    }
    if (brightnessLevel !== 0) {
      img.adjust(brightness().level(brightnessLevel));
    }
    if (contrastLevel !== 0) {
      img.adjust(contrast().level(contrastLevel));
    }
    if (saturationLevel !== 100) { // 100 es el valor por defecto (sin cambio)
      img.adjust(saturation().level(saturationLevel));
    }
    return img;
  }

  async function updateImage() {
    if (applyBackgroundRemoval && !persistentPublicId) {
      await processBackgroundRemoval();
    }
    const img = configureImage();
    modifiedImage.set(img.toURL());
    imageStatus.set(ImageStatus.DONE);
  }

  async function processBackgroundRemoval() {
    processingImage = true;
    try {
      const img = cld.image(publicId).effect(backgroundRemoval());
      const res = await fetch(img.toURL());
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "ml_default");

      const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dvbk40lt2/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      persistentPublicId = data.public_id;
      await updateImage();
    } catch (error) {
      console.error("Error al subir la imagen sin fondo:", error);
    } finally {
      processingImage = false;
    }
  }

  // Corrige la función `toggleImage` para usar `showModified.set`
  function toggleImage(option) {
    showModified.set(option);
  }

  function handleUpdateBackgroundRemoval(event) {
    applyBackgroundRemoval = event.detail.applyBackgroundRemoval;
    if (applyBackgroundRemoval && !persistentPublicId) {
      processBackgroundRemoval();
    } else {
      updateImage();
    }
  }

  function handleUpdateOutline(event) {
    applyOutline = event.detail.applyOutline;
    outlineWidth = event.detail.outlineWidth;
    outlineColor = event.detail.outlineColor;
    updateImage();
  }

  function handleUpdateText(event) {
    applyText = event.detail.applyText;
    textContent = event.detail.textContent;
    textSize = event.detail.textSize;
    textFont = event.detail.textFont;
    textColor = event.detail.textColor;
    gravity = event.detail.gravity;
    textY = event.detail.textY;
    console.log("Color de texto:", textColor);
    console.log("Posicion Y:", textY);
    updateImage();
  }

  function handleUpdateBrightness(event) {
    brightnessLevel = event.detail.brightnessLevel;
    updateImage();
  }

  function handleUpdateContrast(event) {
    contrastLevel  = event.detail.contrastLevel ;
    updateImage();
  }

  function handleUpdateSaturation(event) {
    saturationLevel  = event.detail.saturationLevel ;
    updateImage();
  }
</script>

<div class="flex md:flex-row w-full h-full bg-silver">
  <div class="absolute top-48 left-48 z-10">
    <div class="toggle-container flex bg-gray-200 rounded-full overflow-hidden shadow-inner">
      <button
        on:click={() => toggleImage(false)}
        class="toggle-option px-4 py-2 font-semibold transition-colors duration-300"
        class:bg-white={$showModified === false}
        class:text-gray-900={$showModified === false}
        class:text-gray-600={$showModified === true}
      >
        Antes
      </button>
      <button
        on:click={() => toggleImage(true)}
        class="toggle-option px-4 py-2 font-semibold transition-colors duration-300"
        class:bg-white={$showModified === true}
        class:text-gray-900={$showModified === true}
        class:text-gray-600={$showModified === false}
      >
        Después
      </button>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center w-full md:w-3/5 lg:w-3/5 max-h-[80vh] relative mx-auto overflow-y-auto">
    {#if processingImage}
      <p class="text-gray-700 text-lg font-medium mt-10">Procesando imagen...</p>
    {:else}
      <div class="flex items-center justify-center w-1/2 h-4/5 bg-white shadow-md">
        <img
          src={$showModified ? $modifiedImage : $originalImage} 
          alt="Imagen con efectos"
          class="flex justify-center items-center max-w-full max-h-full object-contain"
        />
      </div>
    {/if}
  </div>

  <div class="w-full md:w-1/5 h-full bg-white md:sticky md:top-0 p-4 z-10">
    <h2 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Crea un Sticker</h2>
    <Controladores
      on:updateOutline={handleUpdateOutline}
      on:updateBackgroundRemoval={handleUpdateBackgroundRemoval}
      on:updateText={handleUpdateText}
      on:updateBrightness={handleUpdateBrightness}
      on:updateContrast={handleUpdateContrast}
      on:updateSaturation={handleUpdateSaturation}
      imageUrl={$modifiedImage}
    />
  </div>
</div>

<style>
  .toggle-container {
    display: inline-flex;
    border-radius: 9999px;
  }
  .toggle-option {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
</style>
