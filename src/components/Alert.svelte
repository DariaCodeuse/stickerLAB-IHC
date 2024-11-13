<script>
  export let imageUrl = ''; // La URL de la imagen generada
  export let onClose; // Función de cierre
</script>

<div class="alert-container fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="alert-box bg-white rounded-xl p-6 w-2/4 md:w-1/5 shadow-lg relative">
    <button class="close-btn absolute top-4 right-4 bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-gray-300" on:click={onClose}>
      ✕
    </button>
    <div class="flex flex-col items-center">
      <div class="check-circle bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <span class="text-green-600 text-4xl">✔</span>
      </div>
      <p class="text-green-700 font-bold text-lg mb-4">¡Tu sticker ha sido creado!</p>
      <img src={imageUrl} alt="Sticker" class="w-32 h-32 object-contain rounded-md border-2 border-gray-300" />
    </div>
  </div>
</div>

<style>
  .alert-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alert-box {
    position: relative;
  }
  .close-btn {
    cursor: pointer;
  }
</style>
