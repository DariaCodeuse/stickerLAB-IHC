<script lang="ts">
  import { onMount } from "svelte";

  // Estado para el menú desplegable y referencia al navbar
  let isOpen = false;
  let navbar;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  // Función para manejar el scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky", "top-0", "shadow-md", "bg-opacity-90", "translate-y-0");
      navbar.classList.remove("opacity-100");
    } else {
      navbar.classList.remove("sticky", "shadow-md", "bg-opacity-90", "translate-y-0");
      navbar.classList.add("opacity-100");
    }
  };

  // Registrar el evento de scroll cuando el componente se monta
  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav bind:this={navbar} class="bg-tapiz p-4 flex justify-between items-center relative shadow-lg transition-all duration-300 ease-in-out transform opacity-100">
  <!-- Logo -->
  <div class="flex items-center space-x-4">
    <a href="/">
      <img src="/logo.png" alt="Stickers Lab Logo" class="w-40 h-auto cursor-pointer" />
    </a>
  </div>

  <!-- Botones y menú hamburguesa -->
  <div class="flex items-center space-x-4">
    <a href="/iniciar-sesion" class="text-primario font-medium">Acceder</a>
    <a href="/registrate" class="bg-primario text-silver font-medium py-2 px-4 rounded-md">Regístrate</a>

    <div class="relative">
      <button
        class="space-y-1 cursor-pointer focus:outline-none"
        on:click={toggleMenu}
        aria-label="Abrir menú"
      >
        <span class="block w-6 h-0.5 bg-primario"></span>
        <span class="block w-6 h-0.5 bg-primario"></span>
        <span class="block w-6 h-0.5 bg-primario"></span>
      </button>
      
      {#if isOpen}
        <div class="absolute right-0 mt-2 w-48 bg-silver rounded-md shadow-lg py-2 z-50">
          <a href="/" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" />
            </svg>
            Inicio
          </a>
          <a href="/crear-un-sticker" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v5h6v-5M12 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            Crea un Sticker
          </a>
          <a href="/crear-muchos-stickers" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.656 0 3-1.343 3-3 0-1.657-1.344-3-3-3s-3 1.343-3 3c0 1.657 1.344 3 3 3zm0 3c-3.867 0-7 3.134-7 7v4h14v-4c0-3.866-3.133-7-7-7z" />
            </svg>
            Crea Muchos Stickers
          </a>
          <a href="/editar-imagenes" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.656 0 3-1.343 3-3 0-1.657-1.344-3-3-3s-3 1.343-3 3c0 1.657 1.344 3 3 3zm0 3c-3.867 0-7 3.134-7 7v4h14v-4c0-3.866-3.133-7-7-7z" />
            </svg>
            Edita una Imagen
          </a>
          <a href="/test" class="flex items-center px-4 py-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.656 0 3-1.343 3-3 0-1.657-1.344-3-3-3s-3 1.343-3 3c0 1.657 1.344 3 3 3zm0 3c-3.867 0-7 3.134-7 7v4h14v-4c0-3.866-3.133-7-7-7z" />
            </svg>
            Test Only
          </a>
        </div>
      {/if}
    </div>
  </div>
</nav>
