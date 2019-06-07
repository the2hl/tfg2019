/**
 * @fileoverview Componente visual que muestra la pantalla para la visualización y edición del fichero con el testamento del usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationDataVer from '../lotties/ver-fichero.json';
import animationDataSubir from '../lotties/subir-fichero.json';
import animationDataSubiendo from '../lotties/subiendo-fichero.json';

export const Fichero = (props) => {
  const defaultOptionsVer = {
    loop: 2,
    autoplay: true,
    animationData: animationDataVer,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptionsSubir = {
    loop: 1,
    autoplay: true,
    animationData: animationDataSubir,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptionsSubiendo = {
    loop: true,
    autoplay: true,
    animationData: animationDataSubiendo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div >
      <div className="header">
        Mi testamento
      </div>
      <div className="box">
        <div className="lottie-and-text">
          <p><strong>Fichero subido</strong></p>
          <Lottie options={defaultOptionsVer} height={60} width={100} />
        </div>
        <p>{props.htmlFile === undefined ?
          "No tiene ningun fichero subido." : props.htmlFile}</p>
        <a href={props.htmlLink} target="_blank" rel="noopener noreferrer">{props.htmlLink === undefined ? null : "Abrir en otra pestaña"}</a>
        <div className="lottie-and-text">
          <p><strong>Subir fichero</strong></p>
          <Lottie options={defaultOptionsSubir} height={60} width={100} />
        </div>
        {props.isCargando ?
          <div className="lottieCargando ">
            <p id="avisoFichero">Subiendo fichero IPFS...</p>
            <Lottie options={defaultOptionsSubiendo} height={60} width={75} />
          </div> : null}
        <form onSubmit={props.enviarFichero} >
          <input type='file' onChange={props.capturarFichero} />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
}