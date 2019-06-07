/**
 * @fileoverview Componente visual que muestra la pantalla para buscar un testamento registrado en la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationData from '../lotties/buscar.json';

export const BusquedaTestamento = (props) => {
  const defaultOptions = {
    loop: 1,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="box-container" role="contentinfo">
      <div className="header">
        Buscar testamento
        </div>
      <div className="box">
        <form onSubmit={props.buscarTestamento} method="post">
          <div className="input-group">
            <label className="login-label" htmlFor="dni">DNI</label>
            <input type="text" name="dni" id="contraseña" aria-label="dni"
              className="login-input" placeholder="Debe tener 9 caracteres" onChange={props.onDNIChange} />
            <small className="danger-error">{props.errorDNI}</small>
            <button type="submit" className="login-btn">Buscar</button>
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        </form>
      </div>
    </div >
  );
}