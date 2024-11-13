<script>
  import Alert from './components/Alert.svelte';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  // Variables de control como `writable`
  const applyOutline = writable(false);
  const applyBackgroundRemoval = writable(false);
  const outlineWidth = writable(10);
  const outlineColor = writable('#000000');

  const applyText = writable(false);
  const textContent = writable('Texto');
  const textColor = writable('#000000');
  const textSize = writable(50);
  const textFont = writable('Arial');

  // Lista de fuentes de Cloudinary
  const cloudinaryFonts = ['Arial', 'Verdana', 'Times New Roman', 'Roboto'];

  // Recibir la URL de la imagen generada como prop
  export let imageUrl;

  // Variable para controlar la visibilidad del Alert
  let showAlert = false;
  
  // Función de actualización
  function updateProperty(property, event) {
    dispatch(property, { ...event });
  }

// Función para descargar la imagen y mostrar el Alert
async function downloadImage() {
    if (!imageUrl) {
      console.warn("No hay imagen disponible para descargar.");
      return;
    }

    try {
      // Fetch para obtener la imagen como blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `sticker_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Mostrar el Alert después de la descarga
      showAlert = true;
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
    }
  }

  // Función para cerrar el Alert
  function closeAlert() {
    showAlert = false;
  }
</script>

<div class="flex flex-col w-full space-y-6 p-6 bg-gray-50 rounded-md shadow-md overflow-y-scroll">
  <!-- Quitar Fondo -->
  <div class="flex items-center justify-between">
    <span class="text-gray-700 font-semibold">Quitar Fondo</span>
    <input 
      type="checkbox" 
      bind:checked={$applyBackgroundRemoval} 
      on:change={() => updateProperty('updateBackgroundRemoval', { applyBackgroundRemoval: $applyBackgroundRemoval })}
      class="toggle-checkbox hidden"
      id="toggle-background-removal"
    />
    <label 
      for="toggle-background-removal" 
      class="toggle-label cursor-pointer w-12 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-300"
      style="background-color: {$applyBackgroundRemoval ? '#3b82f6' : '#d1d5db'};"
    >
      <span 
        class="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
        style="transform: translateX({$applyBackgroundRemoval ? '24px' : '0px'})"
      ></span>
    </label>
  </div>

  <!-- Activar Borde -->
  <div class="flex items-center justify-between">
    <span class="text-gray-700 font-semibold">Borde</span>
    <input 
      type="checkbox" 
      bind:checked={$applyOutline} 
      on:change={() => updateProperty('updateOutline', { applyOutline: $applyOutline, outlineWidth: $outlineWidth, outlineColor: $outlineColor })}
      class="toggle-checkbox hidden"
      id="toggle-outline"
    />
    <label 
      for="toggle-outline" 
      class="toggle-label cursor-pointer w-12 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-300"
      style="background-color: {$applyOutline ? '#3b82f6' : '#d1d5db'};"
    >
      <span 
        class="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
        style="transform: translateX({$applyOutline ? '24px' : '0px'})"
      ></span>
    </label>
  </div>

  <!-- Controles de Contorno -->
  {#if $applyOutline}
    <div class="flex flex-col space-y-4 pl-4 border-l-2 border-gray-200">
      <label for="outline-width" class="text-gray-700 font-medium">Ancho del Contorno: {$outlineWidth}px</label>
      <input 
        type="range" 
        id="outline-width" 
        min="1" 
        max="100" 
        bind:value={$outlineWidth} 
        on:input={() => updateProperty('updateOutline', { applyOutline: $applyOutline, outlineWidth: $outlineWidth, outlineColor: $outlineColor })}
        class="w-full max-w-xs accent-blue-500"
      />
      <div class="flex items-center space-x-2">
        <label for="outline-color" class="text-gray-700 font-medium">Color del Contorno</label>
        <input 
          type="color" 
          id="outline-color" 
          bind:value={$outlineColor} 
          on:input={() => updateProperty('updateOutline', { applyOutline: $applyOutline, outlineWidth: $outlineWidth, outlineColor: $outlineColor })}
          class="w-10 h-10 cursor-pointer border rounded-md"
        />
        <input 
          type="text" 
          bind:value={$outlineColor} 
          on:input={() => updateProperty('updateOutline', { applyOutline: $applyOutline, outlineWidth: $outlineWidth, outlineColor: $outlineColor })}
          class="w-24 h-10 px-2 border rounded-md text-center" 
          placeholder="#ffffff"
          maxlength="7"
        />
      </div>
    </div>
  {/if}

  <!-- Activar Texto -->
  <div class="flex items-center justify-between">
    <span class="text-gray-700 font-semibold">Texto</span>
    <input 
      type="checkbox" 
      bind:checked={$applyText} 
      on:change={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
      class="toggle-checkbox hidden"
      id="toggle-text"
    />
    <label 
      for="toggle-text" 
      class="toggle-label cursor-pointer w-12 h-6 bg-gray-300 rounded-full flex items-center transition-colors duration-300"
      style="background-color: {$applyText ? '#3b82f6' : '#d1d5db'};"
    >
      <span 
        class="toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
        style="transform: translateX({$applyText ? '24px' : '0px'})"
      ></span>
    </label>
  </div>

  <!-- Controles de Texto -->
  {#if $applyText}
    <div class="flex flex-col space-y-4 pl-4 border-l-2 border-gray-200">
      <label for="text-content" class="text-gray-700 font-medium">Texto:</label>
      <input 
        type="text" 
        id="text-content" 
        bind:value={$textContent} 
        on:input={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
        class="w-full max-w-xs px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe aquí..."
      />
      <div class="flex flex-col space-y-2">
        <label for="text-font" class="text-gray-700 font-medium">Fuente:</label>
        <select 
          id="text-font" 
          bind:value={$textFont} 
          on:change={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
          class="w-full max-w-xs px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {#each cloudinaryFonts as font}
            <option value={font}>{font}</option>
          {/each}
        </select>
        <label for="text-size" class="text-gray-700 font-medium">Tamaño del Texto:</label>
        <input 
          type="number" 
          id="text-size" 
          min="10" 
          max="80" 
          bind:value={$textSize} 
          on:input={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
          class="w-full max-w-xs px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex items-center space-x-2">
        <label for="text-color" class="text-gray-700 font-medium">Color del Texto:</label>
        <input 
          type="color" 
          id="text-color" 
          bind:value={$textColor} 
          on:input={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
          class="w-10 h-10 cursor-pointer border rounded-md"
        />
        <input 
          type="text" 
          bind:value={$textColor} 
          on:input={() => updateProperty('updateText', { applyText: $applyText, textContent: $textContent, textColor: $textColor, textSize: $textSize, textFont: $textFont })}
          class="w-24 h-10 px-2 border rounded-md text-center" 
          placeholder="#ffffff"
          maxlength="7"
        />
      </div>
    </div>
  {/if}
  <!-- Botón de descarga -->
  <button 
    on:click={downloadImage} 
    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition"
  >
    Descargar Imagen
  </button>
  <!-- Mostrar el Alert si showAlert es true -->
  {#if showAlert}
    <Alert {imageUrl} onClose={closeAlert}/>
  {/if}
</div>

