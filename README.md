# React + Vite

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Babel](https://babeljs.io/) (o [oxc](https://oxc.rs) cuando se usa en [rolldown-vite](https://vite.dev/guide/rolldown)) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Compilador de React

El Compilador de React no está habilitado en esta plantilla debido a su impacto en el rendimiento de desarrollo y construcción. Para añadirlo, consulta [esta documentación](https://react.dev/learn/react-compiler/installation).

## Ampliando la configuración de ESLint

Si estás desarrollando una aplicación de producción, te recomendamos usar TypeScript con las reglas de linting conscientes del tipo habilitadas. Echa un vistazo a la [plantilla de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obtener información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.
