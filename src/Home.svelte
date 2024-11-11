<script>
  // Aquí puedes agregar lógica si es necesario
</script>

<!-- Contenedor principal en columna -->
<div class="flex flex-col items-center space-y-12 p-8 bg-gray-50">
  
  <!-- Sección 1: Encabezado -->
  <div class="w-full max-w-3xl text-center">
    <div>
      <h1 class="text-4xl font-bold mb-4">Tus imágenes en Stickers únicos</h1>
      <p class="text-lg text-gray-700">Explora nuestras opciones para crear stickers únicos y personalizados.</p>
    </div>
    <img src="" alt="">
  </div>

  <!-- Sección 2: Cards de Funcionalidades -->
  <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
    <a href="/crear-un-sticker" class="card">
      <div class="p-6 bg-gray-50 rounded-lg border border-red-300 shadow hover:shadow-lg transition-all duration-200">
        <div class="flex justify-center mb-4">
          <div class="bg-red-400 w-12 h-12 rounded-full"></div>
        </div>
        <h2 class="text-xl font-bold text-red-600 mb-2">Crea un STICKER</h2>
        <p class="text-gray-700">Sube una imagen, quita el fondo y agrégale un borde. Descárgala como PNG o PDF.</p>
      </div>
    </a>

    <a href="/crear-muchos-stickers" class="card">
      <div class="p-6 bg-gray-50 rounded-lg border border-blue-300 shadow hover:shadow-lg transition-all duration-200">
        <div class="flex justify-center mb-4">
          <div class="bg-blue-600 w-12 h-12 rounded-full"></div>
        </div>
        <h2 class="text-xl font-bold text-blue-600 mb-2">Crea muchos STICKERS</h2>
        <p class="text-gray-700">Sube varias imágenes, edítalas y acomódalas automáticamente en una hoja lista para imprimir.</p>
      </div>
    </a>

    <a href="/editar-imagenes" class="card">
      <div class="p-6 bg-gray-50 rounded-lg border border-orange-300 shadow hover:shadow-lg transition-all duration-200">
        <div class="flex justify-center mb-4">
          <div class="bg-orange-500 w-12 h-12 rounded-full"></div>
        </div>
        <h2 class="text-xl font-bold text-orange-500 mb-2">Edición de Imagen</h2>
        <p class="text-gray-700">Sube una imagen y quita el fondo, recórtala, rota o escala su tamaño. Descárgala como PNG o PDF.</p>
      </div>
    </a>
  </div>

  <!-- Sección 3: Otra sección adicional -->
  <div class="w-full max-w-3xl text-center p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">Más Opciones</h2>
    <p class="text-gray-700">Aquí puedes agregar otra sección con diferentes opciones o información adicional.</p>
  </div>

</div>

<style>
  /* Añade estilos personalizados aquí si es necesario */
</style>
