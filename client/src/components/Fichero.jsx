/**
 * @fileoverview Componente visual que muestra la pantalla para la visualización y edición del 
 * fichero con el testamento del usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';

export const Fichero = (props) => {
  return (
    <div className="inner-container">
      <div className="header">
        Mi testamento
      </div>
      <div className="box">
        <p><strong>Fichero subido</strong></p>
        {props.htmlFile}
        <p><strong>Subir fichero</strong></p>
        <form onSubmit={props.enviarFichero} >
          <input type='file' onChange={props.capturarFichero} />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
}