import React from 'react';
import Sha256 from "js-sha256";
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stackId: null,
            nombre: "",
            apellido1: "",
            apellido2: "",
            dni: "",
            password: "",
            errorNombre: false,
            errorApellido1: false,
            errorDNI: false,
            errorPassword: false,
            nivelSeguridad: "weak"
        };
        // Funciones auxiliares
        this.submitRegister = this.submitRegister.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onApellido1Change = this.onApellido1Change.bind(this);
        this.onApellido2Change = this.onApellido2Change.bind(this);
        this.onDNIChange = this.onDNIChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.getTxStatus = this.getTxStatus.bind(this);
    }

    submitRegister(e) {
        e.preventDefault(); // Evitar que se recargue la página al hacer submit. Necesario en React.
        let errorNomAux = false, errorApell1Aux = false, errorDNIAux = false, errorPWAux = false;
        if (this.state.nombre === "") {
            errorNomAux = true;
        }
        if (this.state.apellido1 === "") {
            errorApell1Aux = true;
        }
        if (this.state.dni.length !== 9) {
            errorDNIAux = true;
        }
        if (this.state.password.length < 5) {
            errorPWAux = true;
        }
        this.setState({
            errorNombre: errorNomAux,
            errorApellido1: errorApell1Aux,
            errorDNI: errorDNIAux,
            errorPassword: errorPWAux
        })
        if (!errorNomAux && !errorApell1Aux && !errorDNIAux && !errorPWAux) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            const nombre = this.state.nombre;
            const apellido1 = this.state.apellido1;
            const apellido2 = this.state.apellido2;
            const dni = this.state.dni;
            const hash = Sha256(this.state.password);
            // Se informa a Drizzle que se va a llamar al método "nuevoContrato" con los parámetros "nombre, apellido1, ..."
            const stackIdAux = contract.methods["nuevoContrato"].cacheSend(
                nombre, apellido1, apellido2, dni, hash,
                {
                    from: drizzleState.accounts[0], // Número de cuenta actual
                    gas: 280000
                }
            );
            console.log("Cuenta de Metamask: " + drizzleState.accounts[0]);
            console.log("Nuevo contrato añadido: " + nombre + " " + apellido1 + " " + apellido2 + " con DNI " + dni);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackId: stackIdAux });
        }
    }

    onNombreChange(e) {
        this.setState({ nombre: e.target.value });
    }

    onApellido1Change(e) {
        this.setState({ apellido1: e.target.value });
    }
    onApellido2Change(e) {
        this.setState({ apellido2: e.target.value });
    }

    onDNIChange(e) {
        this.setState({ dni: e.target.value });
    }

    onPasswordChange(e) {
        let longitud = e.target.value.length;
        let seguridad = "weak";
        if (longitud > 6) {
            seguridad = "medium";
        }
        if (longitud > 11) {
            seguridad = "strong";
        }
        this.setState({ password: e.target.value, nivelSeguridad: seguridad });
    }

    // Se obtiene el estado de las transacciónn a partir del estado de Drizzle
    getTxStatus() {
        const { transactions, transactionStack } = this.props.drizzleState;
        // Se obtiene el hash de la transacción usando el "stackId" guardado
        const txHash = transactionStack[this.state.stackId];
        // Si el hash de la transacción no existe, no se devuelve nada
        if (!txHash) {
            return null;
        }
        // Si la transacción no existe, no se devuelve nada
        if (!transactions[txHash]) {
            return null;
        }
        let estadoTx = transactions[txHash].status;
        // Si existe, se devuelve el estado de la transacción
        return `Estado de la transacción: ${estadoTx}`;
    };

    render() {
        let nombreErr = null, apellido1Err = null, passwordErr = null, dniErr = null;
        if (this.state.errorNombre) {
            nombreErr = "Introduzca su nombre por favor"
        }
        if (this.state.errorApellido1) {
            apellido1Err = "Introduzca su primer apellido por favor"
        }
        if (this.state.errorDNI) {
            dniErr = "Su DNI debe tener 9 caracteres"
        }
        if (this.state.errorPassword) {
            passwordErr = "Su contraseña debe tener 5 caracteres como mínimo"
        }

        let pwdWeak = false, pwdMedium = false, pwdStrong = false;
        //Weak password set onlt the pwdWeak to true, cause render only the first bar 
        if (this.state.nivelSeguridad === "weak") {
            pwdWeak = true;
        } else if (this.state.nivelSeguridad === "medium") {
            //Medium pwd then render the weak and medium bars 
            pwdWeak = true;
            pwdMedium = true;
        } else if (this.state.nivelSeguridad === "strong") {
            //Strong, render all the previoud bars 
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }

        return (
            <div className="inner-container">
                <div className="header">
                    Registrarse
                </div>
                <div className="box">
                    <form onSubmit={this.submitRegister} method="post">
                        <div className="input-group">
                            <label className="login-label" htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" className="login-input" placeholder="Introduzca su nombre"
                                onChange={this.onNombreChange} />
                            <small className="danger-error">{nombreErr ? nombreErr : ""}</small>
                        </div>
                        <div className="input-group">
                            <label className="login-label" htmlFor="apellido1">Primer apellido</label>
                            <input type="text" name="apellido1" className="login-input"
                                placeholder="Introduzca su primer apellido" onChange={this.onApellido1Change} />
                            <small className="danger-error">{apellido1Err ? apellido1Err : ""}</small>
                        </div>
                        <div className="input-group">
                            <label className="login-label" htmlFor="apellido2">Segundo apellido (opcional)</label>
                            <input type="text" name="apellido2" className="login-input"
                                placeholder="Introduzca su segundo apellido" onChange={this.onApellido2Change} />
                        </div>
                        <div className="input-group">
                            <label className="login-label" htmlFor="dni">DNI</label>
                            <input type="text" name="dni" className="login-input" placeholder="Debe tener 9 caracteres"
                                onChange={this.onDNIChange} />
                            <small className="danger-error">{dniErr ? dniErr : ""}</small>
                        </div>
                        <div className="input-group">
                            <label className="login-label" htmlFor="password">Contraseña</label>
                            <input type="password" name="password" autoComplete="on" className="login-input"
                                placeholder="Debe tener 5 caracteres como mínimo" onChange={this.onPasswordChange} />
                            {this.state.password &&
                                <div className="password-state">
                                    <div
                                        className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}></div>
                                    <div
                                        className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}></div>
                                    <div
                                        className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}></div>
                                </div>}
                            <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                        </div>
                        <button type="submit" className="login-btn">Registrarme</button>
                    </form>
                    <p>{this.getTxStatus}</p>
                </div>
            </div>
        );
    }
}
export default Register;