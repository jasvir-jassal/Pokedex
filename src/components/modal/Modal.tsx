import React from "react";
import "./modal.css";
import { Guid } from "guid-typescript";
import { CAUGHT_POKEMONS } from "../../constants/const";
import { ModalProps } from "../../typings/type";


const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.openModal ? (
        <div className="body">
          <div className="modal">
            <div className="list">
              <span className="list-pokemons-label">List of caught pokémons</span>
              {CAUGHT_POKEMONS.map((pokemonName) => {
                return (
                  <div key={Guid.create().toString()} className="item-list">
                    {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
                  </div>
                );
              })}
            </div>
            <div className="close">
              <button className="close-modal" onClick={() => { document.body.style.overflow = 'unset'; props.setOpenModal(false)} }>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
