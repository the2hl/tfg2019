/**
 * @fileoverview Componente visual que muestra la página de Créditos de la app.
 * 
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';
import Lottie from "react-lottie";
import animationData from '../lotties/credits.json';

export const Creditos = (props) => {
  const defaultOptions = {
    loop: 1,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="creditos">
      <div className="header">
        Créditos
      </div>
      <h1>Origen</h1>
      <p>Esta aplicación es el resultado del Trabajo Fin de Grado del alumno Hans Huaita Loyola
          titulado <strong>"Desarrollo de un servicio de gestión de testamentos basado en la cadena de bloques Ethereum y
          el sistema de ficheros IPFS"</strong>.
      </p>
      <h1>Autor</h1>
      <p>Hans Sebastian Huaita Loyola</p>
      <p>hans.huaita.loyola@alumnos.upm.es</p>
      <p>Estudiante del Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación (especialidad en Telemática) en la ETSIT de la
        Universidad Politécnica de Madrid.</p>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}