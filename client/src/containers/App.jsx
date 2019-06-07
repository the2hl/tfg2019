/**
 * @fileoverview Componente contenedor que actualiza el estado de Drizzle.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React, { Component } from 'react';
import '../assets/styles/App.scss';
import Lottie from "react-lottie";
import Acceso from "./Acceso.jsx"; // Componente contenedor hijo
import animationData from '../lotties/cargando.json';

class App extends Component {

  constructor(props) {
    super(props)

    /* Estado del componente */
    this.state = {
      /**
       * Propiedad que almacena si Drizzle se está cargando o no.
       *  @type {boolean}
       */
      loading: true,
      /**
       * Propiedad que almacena el estado de Drizzle.
       *  @type {any}
       */
      drizzleState: null
    };
  }

  /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

  componentDidMount() {
    const { drizzle } = this.props;
    // Nos suscribimos a los cambios en la store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // Cada vez que la store se actualiza, se coge el estado de Drizzle
      const drizzleState = drizzle.store.getState();
      // Se comprueba si Drizzle está inicializado
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      return (
        <div className="root-container">
          <div className="nombre-app" role="complementary">LastWillManager</div>
          <p>Cargando Drizzle ...</p>
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      );
    } else {
      return (
        <div className="root-container">
          <div className="nombre-app" role="complementary">LastWillManager</div>
          <Acceso
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </div>
      );
    }
  }
}

export default App;