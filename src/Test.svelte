<script>
  import { Cloudinary } from '@cloudinary/url-gen';
  import { outline, backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
  import { writable } from 'svelte/store';
  import { imageStatus, modifiedImage, originalImage } from './store'; // Uso de tus variables y stores
  import { ImageStatus } from "../types.d";

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
  });

  const imageId = 'samples/chair';

  // Variables reactivas para aplicar efectos
  let applyOutline = writable(false);
  let applyBackgroundRemoval = writable(false);

  // URL de la imagen que se actualiza en función de los efectos
  $: {
    let img = cld.image(imageId);
    
    if ($applyOutline) {
      img = img.effect(outline().width(10).color('red')); // Ajusta según el color y el ancho deseado
    }
    if ($applyBackgroundRemoval) {
      img = img.effect(backgroundRemoval());
    }

    modifiedImage.set(img.toURL()); // Guardamos la URL de la imagen modificada en el store `modifiedImage`
  }

  // Cambia `imageStatus` a `DONE` para indicar que la imagen está lista
  imageStatus.set(ImageStatus.DONE);
</script>

<div class="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
  <!-- Imagen con efectos y estilo de borde -->
  <div class="w-full max-w-xs">
    <img src={$modifiedImage} alt="Imagen con efectos" class="rounded-lg shadow-lg border border-gray-300" />
  </div>

  <!-- Botones para activar o desactivar efectos -->
  <div class="flex flex-col space-y-2 w-full max-w-xs">
    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={$applyOutline} class="text-blue-600 focus:ring-blue-500" />
      <span class="text-gray-700 font-medium">Activar Contorno</span>
    </label>

    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={$applyBackgroundRemoval} class="text-blue-600 focus:ring-blue-500" />
      <span class="text-gray-700 font-medium">Remover Fondo</span>
    </label>
  </div>
</div>

