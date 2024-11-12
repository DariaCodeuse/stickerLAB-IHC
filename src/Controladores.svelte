<script>
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  let applyOutline = writable(false);
  let applyBackgroundRemoval = writable(false);
  let outlineWidth = writable(10);
  let outlineColor = writable('#000000'); // Color inicial del contorno

  let applyText = writable(false);
  let textContent = writable('Texto de Ejemplo');
  let textColor = writable('#000000');
  let textSize = writable(20);
  let textFont = writable('Arial'); // Fuente inicial

  // Lista de fuentes de Cloudinary
  const cloudinaryFonts = ['Arial', 'Verdana', 'Times New Roman', 'Roboto'];

  function updateOutline() {
    dispatch('updateOutline', { 
      applyOutline: $applyOutline, 
      outlineWidth: $outlineWidth,
      outlineColor: $outlineColor 
    });
  }

  function updateBackgroundRemoval() {
    dispatch('updateBackgroundRemoval', { applyBackgroundRemoval: $applyBackgroundRemoval });
  }

  function updateText() {
    dispatch('updateText', {
      applyText: $applyText,
      textContent: $textContent,
      textColor: $textColor,
      textSize: $textSize,
      textFont: $textFont
    });
  }
</script>

<div class="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
  <!-- Remover Fondo -->
  <label class="flex items-center space-x-2">
    <input type="checkbox" bind:checked={$applyBackgroundRemoval} on:change={updateBackgroundRemoval} class="text-blue-600 focus:ring-blue-500" />
    <span class="text-gray-700 font-medium">Quitar Fondo</span>
  </label>

  <!-- Activar Contorno -->
  <label class="flex items-center space-x-2">
    <input type="checkbox" bind:checked={$applyOutline} on:change={updateOutline} class="text-blue-600 focus:ring-blue-500" />
    <span class="text-gray-700 font-medium">Borde</span>
  </label>

  <!-- Controles de Contorno -->
  {#if $applyOutline}
    <div class="flex flex-col items-center space-y-2">
      <!-- Ancho del Contorno -->
      <label for="outline-width" class="text-gray-700 font-medium">Ancho del Contorno: {$outlineWidth}px</label>
      <input 
        type="range" 
        id="outline-width" 
        min="1" 
        max="20" 
        bind:value={$outlineWidth} 
        on:input={updateOutline} 
        class="w-full max-w-xs"
      />

      <!-- Color del Contorno -->
      <label for="outline-color" class="text-gray-700 font-medium">Color del Contorno</label>
      <div class="flex items-center space-x-2">
        <input 
          type="color" 
          id="outline-color" 
          bind:value={$outlineColor} 
          on:input={updateOutline} 
          class="w-10 h-10 cursor-pointer border rounded-md"
        />
        <input 
          type="text" 
          bind:value={$outlineColor} 
          on:input={updateOutline} 
          class="w-24 h-10 px-2 border rounded-md text-center" 
          placeholder="#ffffff"
          maxlength="7"
        />
      </div>
    </div>
  {/if}

  <!-- Activar Texto -->
  <label class="flex items-center space-x-2">
    <input type="checkbox" bind:checked={$applyText} on:change={updateText} class="text-blue-600 focus:ring-blue-500" />
    <span class="text-gray-700 font-medium">Texto</span>
  </label>

  <!-- Controles de Texto -->
  {#if $applyText}
    <div class="flex flex-col items-center space-y-2">
      <!-- Contenido del Texto -->
      <!-- <label for="text-content" class="text-gray-700 font-medium">Tu texto:</label> -->
      <input 
        type="text" 
        id="text-content" 
        bind:value={$textContent} 
        on:input={updateText} 
        class="w-full max-w-xs px-2 border rounded-md"
        placeholder="Escribe aquí..."
      />

      <div>
          <!-- Fuente del Texto -->          
          <select id="text-font" bind:value={$textFont} on:change={updateText} class="w-full max-w-xs px-2 border rounded-md">
            {#each cloudinaryFonts as font}
              <option value={font}>{font}</option>
            {/each}
          </select>

          <!-- Tamaño del Texto -->          
          <input 
            type="number" 
            id="text-size" 
            min="10" 
            max="50" 
            bind:value={$textSize} 
            on:input={updateText} 
            class="w-full max-w-xs"
          />
      </div>      

      <!-- Color del Texto -->
      <div class="flex items-center space-x-2">
        <!-- <label for="text-color" class="text-gray-700 font-medium">Color del Texto</label> -->
        <input 
          type="color" 
          id="text-color" 
          bind:value={$textColor} 
          on:input={updateText} 
          class="w-10 h-10 cursor-pointer border rounded-md"
        />
        <input 
            type="text" 
            bind:value={$outlineColor} 
            on:input={updateOutline} 
            class="w-24 h-10 px-2 border rounded-md text-center" 
            placeholder="#ffffff"
            maxlength="7"
          />
        </div>
    </div>
  {/if}
</div>
