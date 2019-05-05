import React, { Component } from 'react';
import '../assets/styles/App.scss';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import PantallaPrincipal from "./PantallaPrincipal.jsx";
import { Creditos } from '../components/Creditos';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isLoginOpen: true,
      isRegisterOpen: false,
      isCreditosOpen: false,
      isLogged: false,
      posicion: -1,
      drizzleState: null
    };
    // Funciones auxiliares
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showCreditos = this.showCreditos.bind(this);
    this.usuarioLogeado = this.usuarioLogeado.bind(this);
    this.usuarioDesconectado = this.usuarioDesconectado.bind(this);
  }

  // Al montar el componente
  componentDidMount() {
    const { drizzle } = this.props;

    // Nos suscribimos a los cambios en la store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // Cada vez que la store se actualiza, se coge el estado de Drizzle
      const drizzleState = drizzle.store.getState();

      // Se comprueba si está listo: si lo está, se actualiza el estado del componante local
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  showLogin() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false, isCreditosOpen: false });
  }

  showRegister() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false, isCreditosOpen: false });
  }

  showCreditos() {
    this.setState({ isCreditosOpen: true, isLoginOpen: false, isRegisterOpen: false });
  }

  usuarioLogeado(indice) {
    this.setState({ isLogged: true, posicion: indice });
  }

  usuarioDesconectado() {
    this.setState({ isLogged: false, posicion: -1 });
  }

  render() {
    if (this.state.loading) {
      return "Cargando Drizzle...";
    }
    let htmlCode;
    if (this.state.isLogged) {
      htmlCode = (
        <PantallaPrincipal
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          indice={this.state.posicion}
          action={this.usuarioDesconectado}
        />);
    } else {
      htmlCode = (
        <div>
          <div className="box-controller" role="navigation">
            <div
              className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")}
              onClick={this.showLogin}>
              Iniciar Sesión
            </div>
            <div
              className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")}
              onClick={this.showRegister}>
              Registrarse
            </div>
            <div
              className={"controller " + (this.state.isCreditosOpen ? "selected-controller" : "")}
              onClick={this.showCreditos}>
              Créditos
            </div>
          </div>
          <div className="box-container" role="contentinfo">
            {this.state.isLoginOpen &&
              <Login
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
                action={this.usuarioLogeado} />}
            {this.state.isRegisterOpen &&
              <Register
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState} />}
            {this.state.isCreditosOpen && <Creditos />}
          </div>
        </div>
      );
    }
    return (
      <div className="root-container">
        <h1 className="header" role="complementary">LastWillManager</h1>
        {htmlCode}
      </div>
    );
  }
}

export default App;