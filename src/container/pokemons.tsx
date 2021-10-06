import React, { useEffect, useState } from "react";
import "./pokemons.css";
import captured from "../public/images/captured.png";
import noCaptured from "../public/images/noCaptured.png";
import { Link } from "react-router-dom";
import { typesColors } from "../utils/typeColor";
import { CAUGHT_POKEMONS } from "../utils/const";
import { PokemonsProps, Pokemon } from "../typings/type"

const Pokemons: React.FC<PokemonsProps> = (props) => {
  const [pokemon, setPokemon] = useState<Pokemon | any>({
    items: [],
    id: "",
    sprites: {
      other: {
        official_artwork: {
          front_default: "",
        },
      },
    },
    types: [
      {
        type: {
          name: "",
        },
      },
    ],
  });

  useEffect(() => {
    fetch(props.url)
      .then((results) => results.json())
      .then((result) => {
        setPokemon({
          items: result,
          id: result.id,
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  result.sprites.other["official-artwork"].front_default,
              },
            },
          },
          types: [
            {
              type: {
                name: result.types.map((pokemonTypes: any) => {
                  return pokemonTypes.type.name;
                }),
              },
            },
          ],
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
    return () => {
      setPokemon({});
    };
  }, [props.url]);

  return (
    <>
      <Link className="link-style-none" to={"/pokemons/" + pokemon.id}>
        <div className="pokemon">
          <div className="pokemon-card">
            <div className="pokemon-detail">
              <img
                src={pokemon.sprites.other.official_artwork.front_default}
                alt={props.name}
                title={props.name}
                width={200}
                height={200}
              />
            </div>
            <div className="pokemon-detail">N°: {pokemon.id}</div>
            <div className="pokemon-types-flex-row">
              <div
                className="pokemon-detail pokemon-type"
                style={{
                  backgroundColor: typesColors(pokemon.types[0].type.name[0]),
                  boxShadow: `0px 0px 10px ${typesColors(
                    pokemon.types[0].type.name[0]
                  )}`,
                }}
              >
                {pokemon.types[0].type.name[0]}
              </div>
              {pokemon.types[0].type.name[1] !== undefined ? (
                <div
                  className="pokemon-detail pokemon-type"
                  style={{
                    backgroundColor: typesColors(pokemon.types[0].type.name[1]),
                    boxShadow: `0px 0px 10px ${typesColors(
                      pokemon.types[0].type.name[1]
                    )}`,
                  }}
                >
                  {pokemon.types[0].type.name[1]}
                </div>
              ) : null}
            </div>
            <div className="pokemon-detail">{props.name}</div>
            <div>
              {CAUGHT_POKEMONS.includes(props.name) ? (
                <img src={captured} alt="Caught" title="Caught" width={20} height={20} />
              ) : (
                <img src={noCaptured} alt="Uncaught" title="Uncaught" width={20} height={20} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Pokemons;
