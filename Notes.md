# Notes

- dependencies

  - `data-fns` for date formating
  - `firebase` db
  - `react-loading-screen` animated loading skeletons
  - `react-router-dom` different pages
  - `prop-types` type checking

- architecture

  - client side rendered app: react (cra)
  - database: firebase (firestore)
  - styling: tailwindcss

- src structure

  - components
  - constants: paths and routes
  - context
  - helpers: protected routes
  - hooks: custom hooks
  - lib: firebase
  - services: firebase functions
  - styles: tailwind and app

- db structure

  - collections
    - users
    - photos

- setup firebase

  - create the firebase project
  - firestore cloud db: set rules as test for now
  - firebase authentication

- when a user is created the are assigned a unique id, which is used to track them.

  - In the seed data, we have a `userId` property that is included in each document of the users collection.
    - Each document refers to each individual user that has signed up, and it is connected to them using there id.

- using `React.lazy` for dynamic import and a fallback component to improve performance
