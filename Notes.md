# Notes

- dependencies

  - `data-fns` for date formating
  - `firebase` db
  - `react-loading-screen` animated loading skeletons

- architecture

  - client side rendered app: react (cra)
  - database: Firebase
    - storing links to the images on firebase
  - dependencies: react-loading-screen
  - styling: tailwind

- src structure
  <pre>
  ├── components
  ├── constants: paths and routes
  ├── context 
  ├── helpers: protected routes
  ├── hooks: custom hooks
  ├── lib: firebase
  ├── services: firebase functions
  └── styles
      ├── app
      └── tailwind
  </pre>
