import React from 'react';
import Sha256 from 'js-sha256';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            password: "",
            passwordErr: ""
        };
        this.submitLogin = this.submitLogin.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidUpdate() {
        if (this.state.password.length >= 5) {
            const { TFG } = this.props.drizzleState.contracts;
            // Se obtiene la variable usando la "dataKey" guardada
            if (TFG.autenticar[this.state.dataKey]) {
                let resultado = false;
                resultado = TFG.autenticar[this.state.dataKey].value;
                let passwordErrAux = "";
                let cambio = false;
                if (!resultado) {
                    passwordErrAux = "La contraseña introducida es incorrecta";
                    console.log("Contraseña incorrecta");
                    if (passwordErrAux !== this.state.passwordErr) {
                        cambio = true;
                    }
                } else {
                    console.log("Contraseña correcta");
                    this.props.action();
                }
                if (cambio) {
                    this.setState({ passwordErr: passwordErrAux });
                }
            }

        }
    }

    submitLogin(e) {
        e.preventDefault(); // Evitar que se recargue la página al hacer submit. Necesario en React.
        let errorPasswordLong = false;
        if (this.state.password.length < 5) {
            errorPasswordLong = true;
        }
        let passwordErrAux = "";
        if (errorPasswordLong) {
            passwordErrAux = "Su contraseña debe tener 5 caracteres como mínimo";
            this.setState({ passwordErr: passwordErrAux });
        } else {
            console.log("Contraseña introducida: " + this.state.password);
            const hash = Sha256(this.state.password);
            const { drizzle } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "autenticar"
            const dataKeyAux = contract.methods["autenticar"].cacheCall(hash);
            // Se guarda el "dataKey" para usarlo después
            this.setState({ dataKey: dataKeyAux, passwordErr: passwordErrAux });
        }
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="box-container" role="contentinfo">
                <div className="header">
                    Iniciar Sesión
                    </div>
                <div className="box">
                    <form onSubmit={this.submitLogin}>
                        <div className="input-group">
                            <label className="login-label" htmlFor="contraseña">Contraseña</label>
                            <input type="password" name="contraseña" autoComplete="on" id="contraseña" aria-label="contraseña"
                                className="login-input" placeholder="Debe tener 5 caracteres como mínimo" onChange={this.onPasswordChange} />
                            <small className="danger-error">{this.state.passwordErr}</small>
                            <button type="submit" className="login-btn">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;