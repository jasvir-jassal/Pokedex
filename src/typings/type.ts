export type Search = {
    name: string;
  };
  
export enum Status {
    Caught,
    Uncaught,
    All
  };

export type ReducerAction = {
    type: string;
    items: any[]
  };

export type PokemonsProps = {
    name: string;
    url: string;
    id: string;
  };

export type Pokemon = {
    items: any[];
    id: string;
    sprites: {
      other: {
        official_artwork: {
          front_default: string;
        };
      };
    };
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
  };

export type PokemonDetailProps = {
    isLoaded: boolean;
    item: any[];
    id: string;
    height: number;
    weight: number;
    abilities: [
      {
        ability: {
          name: string;
        };
      }
    ];
    species: {
      name: string;
    };
    sprites: {
      other: {
        official_artwork: {
          front_default: string;
        };
      };
    };
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
  };

export type ModalProps = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  };