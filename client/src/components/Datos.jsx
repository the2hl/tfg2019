/**
 * @fileoverview Componente visual que muestra los datos personales de un usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationData from '../lotties/perfil.json';

export const Datos = (props) => {
  const defaultOptions = {
    loop: 1,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div>
      <div className="header">
        {props.cabecera}
      </div>
      <div className="box">
        <p><strong>Nombre: </strong>{props.nombre}</p>
        <p><strong>Primer apellido: </strong>{props.apellido1}</p>
        <p><strong>Segundo apellido: </strong>{props.apellido2}</p>
        <p><strong>DNI: </strong>{props.dni}</p>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
}