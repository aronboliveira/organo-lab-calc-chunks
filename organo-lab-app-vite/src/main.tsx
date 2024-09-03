/*
COPYRIGHTED BY: Aron Barbosa de Oliveira
Under GNU/GPL License
https://github.com/aronboliveira
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/flatsomeStyles.scss";
import "./assets/styles/style.scss";
import "./assets/styles/viteAdjustements.scss";
import "./assets/styles/wpBanned.scss";
import "./lib/head/js/wp/wp-emoji-release";
import "./lib/head/js/wp/wp-polyfill";
import "./lib/head/js/flatsome/flatsome";
import "./lib/head/js/flatsome/flatsome-live-search";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
