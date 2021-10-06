# Pokédex

This project is generated with [React](https://it.reactjs.org/docs/getting-started.html) version `17.0.2`.

## Project

This project is a minimal version of `Pokédex` that catalogs and provide information regarding the various species of `Pokémon`.

This allows you to to see the detail of a single `Pokémon` and also allows you to search through its name or whether it is caught or not.

This projects uses the official [PokéApi](https://pokeapi.co/).

The endpoints that we're using are:

- https://pokeapi.co/api/v2/pokemon

- https://pokeapi.co/api/v2/pokemon/

- https://pokeapi.co/api/v2/pokemon-species/


First of all I created a `React` project, using the command `npx create-react-app my-app --template typescript`, in this way I installed all the modules needed to work on the `React` project.

Proceeding with the work, I immediately started to create my components.

The components I created are the following:

- [pagination](https://github.com/jasvir-jassal/Pokedex/blob/main/src/components/pagination.tsx)

- [pokemons](https://github.com/jasvir-jassal/Pokedex/blob/main/src/container/pokemons.tsx)

- [pokemon](https://github.com/jasvir-jassal/Pokedex/blob/main/src/pages/pokemon/pokemon.tsx)

- [modal](https://github.com/jasvir-jassal/Pokedex/blob/main/src/components/modal/Modal.tsx)

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Navigate to the `main directory` and run `npm i yarn` to install `yarn` into the project and then run `yarn` for installing the node modules.