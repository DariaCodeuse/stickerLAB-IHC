<script>
  import { Cloudinary } from '@cloudinary/url-gen';
  import { outline, backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
  import { ImageStatus } from "../types.d"
  import { writable } from 'svelte/store';
  import Controladores from "./Controladores.svelte";
  import { imageStatus, modifiedImage } from './store';

  // Recibe el `publicId` como prop
  export let publicId;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
  });

  // Stores para los valores de efectos
  let applyOutline = false;
  let outlineWidth = 10;
  let applyBackgroundRemoval = false;

  // URL de la imagen que se actualiza en función de los efectos
  $: if (publicId) {
    let img = cld.image(publicId);

    if (applyOutline) {
      img = img.effect(outline().width(outlineWidth).color('red'));
    }
    if (applyBackgroundRemoval) {
      img = img.effect(backgroundRemoval());

      console.log(img.toURL())
    }

    imageStatus.set(ImageStatus.DONE)
    modifiedImage.set(img.toURL()); // Guardamos la URL de la imagen modificada en el store `modifiedImage`
  }

  function handleUpdateOutline(event) {
    applyOutline = event.detail.applyOutline;
    outlineWidth = event.detail.outlineWidth;
  }

  function handleUpdateBackgroundRemoval(event) {
    applyBackgroundRemoval = event.detail.applyBackgroundRemoval;
  }
</script>

<div class="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
  <div class="w-full max-w-xs">
    <img src={$modifiedImage} alt="Imagen con efectos" class="rounded-lg shadow-lg border border-gray-300" />
  </div>

  <Controladores on:updateOutline={handleUpdateOutline} on:updateBackgroundRemoval={handleUpdateBackgroundRemoval} />
</div>
