/**
 * @fileoverview Componente visual que muestra la pantalla para buscar un testamento registrado en la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';

export const BusquedaTestamento = (props) => {
  return (
    <div className="box-container" role="contentinfo">
      <div className="inner-container">
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
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}