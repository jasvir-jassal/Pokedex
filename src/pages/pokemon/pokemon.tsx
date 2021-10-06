import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./pokemon.css";
import captured from "../../public/images/captured.png";
import noCaptured from "../../public/images/noCaptured.png";
import { typesColors } from "../../utils/typeColor";
import { POKEMON_URL, POKEMON_DESCRIPTION_URL, CAUGHT_POKEMONS } from "../../constants/const";
import { PokemonDetailProps } from "../../typings/type";

const Pokemon = () => {
  let match = useRouteMatch();
  let params = match.params as any;
  const [description, setDescription] = useState<string>("");
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailProps>({
    isLoaded: false,
    item: [],
    id: "",
    height: 0,
    weight: 0,
    abilities: [
      {
        ability: {
          name: "",
        },
      },
    ],
    species: {
      name: "",
    },
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
    fetch(POKEMON_URL + params.id)
      .then((results) => results.json())
      .then((result) => {
        setPokemonDetail({
          isLoaded: true,
          item: result,
          id: result.id,
          height: result.height,
          weight: result.weight,
          abilities: [
            {
              ability: {
                name: result.abilities.map((pokemonAbilities: any) => {
                  return pokemonAbilities.ability.name;
                }),
              },
            },
          ],
          species: {
            name: result.species.name,
          },
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

    fetch(POKEMON_DESCRIPTION_URL + params.id)
      .then((results) => results.json())
      .then((result) => {
        let entry = result.flavor_text_entries.filter(
          (f: { language: { name: string } }) => f.language.name === "en"
        )[0].flavor_text;
        /*eslint no-control-regex: "off"*/
        let description = entry.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
        setDescription(unescape(description));
      });
  }, [params.id]);

  return (
    <>
      <div className="pokemon-detail-page">
        <div className="pokemon-detail-box">
          <div>
            <div className="pokemon-name">
              {pokemonDetail.species.name.toUpperCase()} N°{pokemonDetail.id}
            </div>
            <div className="pokemon-detail">
              <img
                src={pokemonDetail.sprites.other.official_artwork.front_default}
                alt={pokemonDetail.species.name}
                title={pokemonDetail.species.name}
                width={400}
                height={400}
              />
              <div className="pokemon-info">
                <div className="description">{description}</div>
                <div className="marginTop">
                  <span className="pokemon-height">Height:</span>
                  <span>{pokemonDetail.height}</span>
                </div>
                <div className="marginTop">
                  <span className="pokemon-weight">Weight:</span>
                  <span>{pokemonDetail.weight}</span>
                </div>
                <div className="marginTop">
                  <span className="pokemon-abilities">Abilities:</span>
                  <span>{pokemonDetail.abilities[0].ability.name[0]} </span>
                  <span>{pokemonDetail.abilities[0].ability.name[1]}</span>
                </div>
                <div className="marginTop">
                  <div className="pokemon-types">
                    <span>Types:</span>
                    <span
                      className="pokemon-first-type"
                      style={{
                        backgroundColor: typesColors(
                          pokemonDetail.types[0].type.name[0]
                        ),
                        boxShadow: `0px 0px 10px ${typesColors(
                          pokemonDetail.types[0].type.name[0]
                        )}`,
                      }}
                    >
                      {pokemonDetail.types[0].type.name[0]}{" "}
                    </span>
                    {pokemonDetail.types[0].type.name[1] ? (
                      <span
                        className="pokemon-second-type"
                        style={{
                          backgroundColor: typesColors(
                            pokemonDetail.types[0].type.name[1]
                          ),
                          boxShadow: `0px 0px 10px ${typesColors(
                            pokemonDetail.types[0].type.name[1]
                          )}`,
                        }}
                      >
                        {pokemonDetail.types[0].type.name[1]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    {CAUGHT_POKEMONS.includes(pokemonDetail.species.name) ? (
                      <img src={captured} alt="Caught" title="Caught" width={20} height={20} />
                    ) : (
                      <img src={noCaptured} alt="Uncaught" title="Uncaught" width={20} height={20} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
