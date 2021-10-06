import { useEffect, useReducer, useState } from "react";
import Pokemons from "../container/pokemons";
import "./pagination.css";
import { Guid } from "guid-typescript";
import Modal from "./modal/Modal";
import { CAUGHT_POKEMONS, POKEMONS_URL } from "../utils/const";
import { Search, Status, ReducerAction } from "../typings/type"

const Pagination = () => {
  const [search, setSearch] = useState("");
  const [next, setNext] = useState<any>();
  const [url, setUrl] = useState<string>(POKEMONS_URL);
  const [modal, setModal] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(Status.All);

  const itemsReducer = (state: any, action: ReducerAction) => {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: state.items.concat(action.items),
        };
      default:
        throw new Error();
    }
  };
  const [pagination, dispatchPagination] = useReducer(itemsReducer, {
    items: [],
    isLoaded: true,
  });

  useEffect(() => {
    if(url){
      fetch(url)
      .then((results) => results.json())
      .then((result) => {
        dispatchPagination({ type: "ADD_ITEM", items: result.results } as ReducerAction);
        setNext(result.next);
      })
      .catch((err) => {
        throw new Error(err);
      });
    }
    return () => {};
  }, [url]);

  return (
    <>
      <Modal setOpenModal={setModal} openModal={modal} />
      <div>
        <h1 className="pokedex-label">Pokédex</h1>
        <div className="search">
          <span className="search-label">Search a Pokémon:</span>
          <div>
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="filters-buttons">
          <button className="button-style" onClick={() => { setModal(!modal); document.body.style.overflow = 'hidden'; } }>
            List of caught Pokémons
          </button>
          <button
            className="button-style"
            onClick={() => {
              setStatus(Status.All);
            }}
          >
            All
          </button>
          <button
            className="button-style"
            onClick={() => {
              setStatus(Status.Caught);
            }}
          >
            Caught
          </button>

          <button
            className="button-style"
            onClick={() => {
              setStatus(Status.Uncaught);
            }}
          >
            Uncaught
          </button>
        </div>
        <div className="pokemon-detail">
          {pagination.items
            .filter((searchResult: Search) => {
              if (
                CAUGHT_POKEMONS.includes(searchResult.name) &&
                status === Status.Caught
              ) {
                return searchResult;
              } else if (
                !CAUGHT_POKEMONS.includes(searchResult.name) &&
                status === Status.Uncaught
              ) {
                return searchResult;
              } else if (status === Status.All) {
                return pagination.items;
              }

              return null;
            })
            .filter((searchResult: Search) => {
              if (!search) {
                return searchResult;
              }

              return searchResult.name.startsWith(search);
            })
            .map((item: any) => {
              return (
                <div key={Guid.create().toString()}>
                  <Pokemons name={item.name} url={item.url} id={item.id} />
                </div>
              );
            })}
        </div>
        <div className="next">
          <button className="button-style" onClick={() => setUrl(next)}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
