# Notes

## Planning

- architecture

  - client side rendered app: react (cra)
  - database: firebase (firestore)
  - styling: tailwind css

- src structure

  - components
  - constants: paths and routes
  - context: user and firebase context
  - helpers: protected routes
  - hooks: custom hooks
  - lib: firebase
  - services: firebase functions
  - styles: tailwind

- firebase

  - firestore
    - db structure
      - collections
        - users: stores reference to photos
        - photos
  - firebase authentication
    - using email and password

- used

  - PropTypes
  - Custom Hooks, Context API
  - Firebase (auth, firestore)
  - Lazy loading + Skeleton

- dependencies

  - `firebase`
  - `date-fns` for date formatting
  - `react-loading-skeleton` animated loading screens
  - `react-router-dom` different pages
  - `prop-types` type checking

## Making the context

- `FirebaseContext`: shares the db, auth, app to the entire app
- `UserContext`: shares the user to the entire app

- when a user is created they are assigned a unique id, which is used to track them.

  - In the seed data, we have a `userId` property that is included in each document of the users collection.
    - Each document refers to each individual user that has signed up, and it is connected to them using there id.

- using `React.lazy` for dynamic import and a fallback component to improve performance

## Hooks

- `use-auth-listener`
  - when user is logged add user to the LS(if empty) and set the user in the user context to current user
  - when user is logged out: remove the user from the LS and set the user in the user context to null

- `use-user`
  - when a user logs in, get the user data from the db using the user id.

## Components

- sidebar

  - the sidebar component will have many parts, so we are putting it in a subdirectory in components

- header

  - the header component will be dynamic, if the user is logged in or not
    - we get the user from the user context

I completed the project but I was unable to upload it to github pages.
