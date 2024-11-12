import "./app.postcss";
import { mount } from 'svelte';
import App from './App.svelte';

mount(App, {
  target: document.getElementById("app") // Asegúrate de que este ID exista en el HTML
});
