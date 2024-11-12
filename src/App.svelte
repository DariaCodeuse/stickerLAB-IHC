<script lang="ts" >
  import { Router, Route } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import FooterHome from "./components/FooterHome.svelte";
  import Footer from "./components/Footer.svelte";

  import Test from "./Test.svelte";   // TEST ONLY

  import Home from "./Home.svelte";
  import CreateManyStickers from "./CreateManyStickers.svelte";
  import CreateStickers from "./CreateSctickers.svelte";
  import EditImages from "./CreaterEditImages.svelte";
  import Login from "./pages/Login.svelte"
  import Register from "./pages/Register.svelte"
</script>

<Router>
  <!-- Página de Inicio con Navbar, Home y FooterHome -->
  <Route path="/">
    <div class="h-screen w-full flex flex-col">
      <Navbar />
      <main class="flex-1 w-full">
        <Home />
      </main>
      <FooterHome /> <!-- Solo se muestra en la página de inicio -->
    </div>
  </Route>

  <!-- Página de Crear un Sticker con Navbar, Contenido y Footer -->
  <Route path="/crear-un-sticker">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex w-full h-full">
        <CreateStickers />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

  <!-- Página de Crear Muchos Stickers con Footer alternativo -->
  <Route path="/crear-muchos-stickers">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex w-full h-full">
        <CreateManyStickers />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

  <!-- Página de Editar Imágenes con Footer alternativo -->
  <Route path="/editar-imagenes">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex w-full h-full">
        <EditImages />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

  <Route path="/registrate">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex-1 w-full">
        <Register />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

  <Route path="/iniciar-sesion">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex-1 w-full">
        <Login />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

  <Route path="/test">
    <div class="h-screen w-full flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex-1 w-full">
        <Test />
      </main>
      <Footer /> <!-- Footer alternativo para funcionalidades -->
    </div>
  </Route>

</Router>

