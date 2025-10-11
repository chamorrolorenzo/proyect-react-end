# Reacerlo

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

[text](d:/ChatContext_explicado.md)
[text](d:/Checklist_chat_persistencia.md)
[text](d:/Explicacion_app_para_niña_8.md)

Botón Clip — Resumen (Markdown)

Función principal: despliega un menú de acciones (Galería, Contacto, Documento, Audio, Ubicación) al hacer click en el clip.

Apertura/cierre sin JS: usa CSS :focus-within.

Click en el clip → el foco queda dentro → se muestra el menú.

Click fuera → el foco sale → se oculta el menú.

Botones seguros: cada opción es un <button type="button"> → no envían formularios ni causan navegación.

Traducciones: los textos se obtienen con t("...") desde SettingsContext y cambian según el idioma seleccionado.

Modo oscuro (.energy): el ícono del clip se ve blanco (filtro CSS) y el menú adopta fondo oscuro con texto claro.

Accesibilidad: el botón tiene aria-label="Adjuntar"; el contenedor del menú usa role="menu" y cada opción role="menuitem".
