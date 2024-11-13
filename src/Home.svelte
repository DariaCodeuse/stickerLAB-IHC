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
  <div class="w-full text-center p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">Creadores</h2>
    <div class="card-container flex justify-center space-x-4">
      <div class="card">
          <div class="icon"></div>
          <div class="text">
              <p class="name">Github Nombre</p>
              <p class="price">Price</p>
          </div>
      </div>
      <div class="card">
          <div class="icon"></div>
          <div class="text">
              <p class="name">Github Nombre</p>
              <p class="price">Price</p>
          </div>
      </div>
      <div class="card">
          <div class="icon"></div>
          <div class="text">
              <p class="name">Github Nombre</p>
              <p class="price">Price</p>
          </div>
      </div>
      <div class="card">
          <div class="icon"></div>
          <div class="text">
              <p class="name">Github Nombre</p>
              <p class="price">Price</p>
          </div>
      </div>
      <div class="card">
          <div class="icon"></div>
          <div class="text">
              <p class="name">Github Nombre</p>
              <p class="price">Price</p>
          </div>
      </div>
  </div>
  </div>
 

</div>

<style>
  /* Añade estilos personalizados aquí si es necesario */
  .card-container .card {
          display: flex;
          width: 245px;
          height: 80px;
          padding: 15px 20px 15px 0px;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          border-radius: 8px;
          border: 1px solid var(--Grey-blue, #ABBED1);
          background: #F3F4F6;
      }

      .card-container .icon {
          width: 55px;
          height: 50px;
          flex-shrink: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='55' height='50' viewBox='0 0 55 50' fill='none'%3E%3Crect x='10' width='45' height='50' rx='10' fill='%233B82F6' fill-opacity='0.5'/%3E%3C/svg%3E");
          background-size: cover;
          background-repeat: no-repeat;
      }


      .card-container .text {
          text-align: left;
      }

      .card-container .name {
          font-size: 12px;
          font-weight: bold;
          color: #333;

      }

      .card-container .price {
          font-size: 10px;
          color: #888;
      }
</style>
