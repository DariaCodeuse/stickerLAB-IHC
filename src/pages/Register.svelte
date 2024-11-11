<script>
  // Aquí puedes agregar la lógica para el formulario de registro
</script>

<main class="flex flex-col items-center p-4">
  <h1 class="text-2xl font-bold mb-4">Registro</h1>
  <div class="bg-rose-200/50 p-8 rounded-lg w-[820px] shadow-md text-center">
    <form class="mb-4">
      <label for="name" class="block mb-1 text-gray-700">Nombre</label>
      <input
        type="text"
        id="name"
        placeholder="Alejandra Castellanos Cortez"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-red-200/50"
      />

      <label for="email" class="block mb-1 text-gray-700">Correo Electrónico</label>
      <input
        type="email"
        id="email"
        placeholder="correo@gmail.com"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-red-200/50"
      />

      <label for="password" class="block mb-1 text-gray-700">Contraseña</label>
      <input
        type="password"
        id="password"
        placeholder="*********"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-red-200/50"
      />

      <label for="confirm-password" class="block mb-1 text-gray-700">Confirmar Contraseña</label>
      <input
        type="password"
        id="confirm-password"
        placeholder="*********"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-red-200/50"
      />

      <button type="submit" class="w-[433px] p-2 bg-blue-600 text-black rounded-md text-lg font-semibold mt-4">
        Registrar
      </button>
    </form>
  </div>
</main>
