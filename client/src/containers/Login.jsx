import React from 'react';
import Sha256 from 'js-sha256';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            dni: "",
            password: "",
            dniErr: "",
            passwordErr: ""
        };
        this.submitLogin = this.submitLogin.bind(this);
        this.logearUsuario = this.logearUsuario.bind(this);
    }

    componentDidUpdate() {
        const { TFG } = this.props.drizzleState.contracts;
        // Se obtiene la variable usando la "dataKey" guardada
        let resultado;
        if (TFG.buscarContrato[this.state.dataKey]) {
            resultado = parseInt(TFG.buscarContrato[this.state.dataKey].value);
        }
        let dniErrAux = "", passwordErrAux = "";
        let cambio = false;
        if (resultado === -3) {
            dniErrAux = "El DNI introducido no está registrado";
            passwordErrAux = "La contraseña introducida es errónea";
            if (dniErrAux !== this.state.dniErr && passwordErrAux !== this.state.passwordErr) {
                cambio = true;
            }
        } else if (resultado === -2) {
            dniErrAux = "El DNI introducido no está registrado";
            if (dniErrAux !== this.state.dniErr) {
                cambio = true;
            }
        } else if (resultado === -1) {
            passwordErrAux = "La contraseña introducida es errónea";
            if (passwordErrAux !== this.state.passwordErr) {
                cambio = true;
            }
        } else if (resultado > 0) {
            console.log("Usuario loggeado");
            this.logearUsuario(resultado);
        }
        if (cambio) {
            this.setState({ dniErr: dniErrAux, passwordErr: passwordErrAux });
        }
    }

    submitLogin() {
        let errorDNILong = false, errorPasswordLong = false;
        const dni = this.state.dni;
        if (dni.length !== 9) {
            errorDNILong = true;
        }
        if (this.state.password.length < 5) {
            errorPasswordLong = true;
        }

        let dniErrAux = "", passwordErrAux = "";
        if (errorDNILong) {
            dniErrAux = "Su DNI debe tener 9 caracteres";
        }
        if (errorPasswordLong) {
            passwordErrAux = "Su contraseña debe tener 5 caracteres como mínimo";
        }
        if (!errorDNILong && !errorPasswordLong) {
            const hash = Sha256(this.state.password);
            const { drizzle } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "buscarContrato" con los parámetros "dni, hash"
            const dataKeyAux = contract.methods["buscarContrato"].cacheCall(dni, hash);
            console.log("Contrato buscado: dni " + dni + " y hash " + hash);
            // Se guarda el "dataKey" para usarlo después
            this.setState({ dataKey: dataKeyAux, dniErr: dniErrAux, passwordErr: passwordErrAux });
        } else {
            this.setState({ dniErr: dniErrAux, passwordErr: passwordErrAux });
        }

    }

    onDNIChange(e) {
        this.setState({ dni: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    logearUsuario(indice) {
        this.props.action(indice);
    }

    render() {
        return (
            <div className="inner-container">
                <div className="header">
                    Iniciar Sesión
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="dni">DNI</label>
                        <input type="text" name="dni" id="dni" className="login-input" placeholder="DNI"
                            onChange={(e) => this.onDNIChange(e)} />
                        <small className="danger-error">{this.state.dniErr}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" name="contraseña" id="contraseña" aria-label="contraseña" className="login-input" placeholder="Contraseña" onChange={(e) => this.onPasswordChange(e)} />
                        <small className="danger-error">{this.state.passwordErr}</small>
                    </div>
                    <button type="button" className="login-btn"
                        onClick={() => this.submitLogin()}>Iniciar Sesión</button>
                </div>
            </div>
        );
    }
}
export default Login;