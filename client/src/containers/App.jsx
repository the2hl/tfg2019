import React, { Component } from 'react';
import '../assets/styles/App.scss';
import Acceso from "./Acceso.jsx";
import Register from "./Register.jsx";
import MainUsuario from "./MainUsuario.jsx";
import MainSuperusuario from "./MainSuperusuario.jsx";
import Creador from "./Creador.jsx";
import { Creditos } from '../components/Creditos';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isLoginOpen: false,
      isRegisterOpen: true,
      isCreditosOpen: false,
      isRegistrado: false,
      isAutenticado: false,
      isDesconectado: false,
      drizzleState: null,
      creadorDir: null,
      dirBuscada: null
    };
    // Funciones auxiliares
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showCreditos = this.showCreditos.bind(this);
    this.usuarioRegistrado = this.usuarioRegistrado.bind(this);
    this.usuarioAutenticado = this.usuarioAutenticado.bind(this);
    this.getCreadorDir = this.getCreadorDir.bind(this);
    this.logOut = this.logOut.bind(this);
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
        this.setState({ loading: false, drizzleState }
        );
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

  usuarioRegistrado(resultado) {
    this.setState({ isRegistrado: resultado });
  }

  usuarioAutenticado() {
    this.setState({ isAutenticado: true, isDesconectado: false });
  }

  getCreadorDir(direccion) {
    this.setState({ creadorDir: direccion });
  }

  logOut() {
    this.setState({ isAutenticado: false, isDesconectado: true });
  }

  render() {
    if (this.state.loading) {
      return "Cargando Drizzle...";
    }
    let cuenta = this.state.drizzleState.accounts[0];
    let htmlCode;
    if (cuenta === this.state.creadorDir) {
      htmlCode = (
        <div>
          <MainSuperusuario
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </div>
      );
    }
    else if (!this.state.isRegistrado && !this.state.isAutenticado) {
      htmlCode = (
        <div>
          <div className="box-controller" role="navigation">
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
            {this.state.isRegisterOpen &&
              <Register
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState} />}
            {this.state.isCreditosOpen && <Creditos />}
          </div>
        </div>
      );
    }
    else if (this.state.isAutenticado && this.state.isRegistrado) {
      htmlCode = (
        <div>
          <MainUsuario
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            direccion={cuenta}
            action={this.logOut}
          />
        </div>
      );
    }
    return (
      <div className="root-container">
        <div className="nombre-app" role="complementary">LastWillManager</div>
        <Creador
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          action={this.getCreadorDir}
        />
        <Acceso
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          actionRegistrar={this.usuarioRegistrado}
          actionAutenticar={this.usuarioAutenticado}
          isDesconectado={this.state.isDesconectado}
          creadorDir={this.state.creadorDir}
        />
        {htmlCode}
      </div>
    );
  }
}

export default App;