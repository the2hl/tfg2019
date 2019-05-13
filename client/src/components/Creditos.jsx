/**
 * @fileoverview Componente visual que muestra la página de Créditos de la app.
 * 
 * @author Hans Sebastian Huaita Loyola
 */

import React from 'react';

export const Creditos = (props) => {
  return (
    <div>
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
      <h1>Tutor</h1>
      <p>Santiago Pavón</p>
      <p>santiago@dit.upm.es</p>
    </div>
  );
}