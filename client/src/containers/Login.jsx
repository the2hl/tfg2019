/**
 * @fileoverview Componente contenedor que gestiona el inicio de sesión de un usuario en la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import Sha256 from 'js-sha256';
import { InicioSesion } from '../components/InicioSesion.jsx'; // Componente visual hijo

class Login extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar a un método del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null,
            /**
             * Propiedad que almacena la contraseña introducida por el usuario.
             *  @type {string}
             */
            password: "",
            /**
             * Propiedad que almacena el mensaje de error en relación a la contraseña introducida por el usuario.
             *  @type {string}
             */
            passwordErr: ""
        };

        // Binding de las funciones auxiliares
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.crearTraza = this.crearTraza.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

    componentDidUpdate() {
        // Si la contraseña introducida tiene como mínimo 5 caracteres
        if (this.state.password.length >= 5) {
            const { LastWillManager } = this.props.drizzleState.contracts;
            if (LastWillManager.autenticar[this.state.dataKey]) {
                // Se obtiene el resultado de llamar al método "autenticar" usando la "dataKey" guardada
                let resultado = LastWillManager.autenticar[this.state.dataKey].value;
                let passwordErrAux = "";
                if (!resultado) {
                    passwordErrAux = "La contraseña introducida es incorrecta";
                    // Se actualiza el estado solo si se ha producido un cambio
                    if (passwordErrAux !== this.state.passwordErr) {
                        this.crearTraza("Contraseña incorrecta");
                        this.setState({ passwordErr: passwordErrAux });
                    }
                } else {
                    this.crearTraza("Contraseña correcta");
                    this.props.actionAutenticar(); // Se llama a la función heredada del componente padre: "actionAutenticar"
                }
            }

        }
    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "Login: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    /**
     * Función que se llama cuando el usario introduce su contraseña y pulsa el botón "Iniciar sesión".
     * @param {*} e 
     */
    iniciarSesion(e) {
        e.preventDefault(); // Evita que se recargue la página al hacer submit. Necesario en React.
        let passwordErrAux = "";
        // Si la contraseña introducida tiene menos de 5 caracteres
        if (this.state.password.length < 5) {
            passwordErrAux = "Su contraseña debe tener 5 caracteres como mínimo";
            this.setState({ passwordErr: passwordErrAux });
        } else {
            this.crearTraza("Contraseña introducida: " + this.state.password);
            const hash = Sha256(this.state.password);
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            // Se informa a Drizzle de que se va a llamar al método "autenticar"
            const dataKeyAux = contract.methods["autenticar"].cacheCall(hash);
            // Se guarda la "dataKey" para usarlo después
            this.setState({ dataKey: dataKeyAux, passwordErr: passwordErrAux });
        }
    }

    /**
     * Función que almacena la contraseña introducida por el usuario.
     * @param {*} e 
     */
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="box-container" role="contentinfo">
                <InicioSesion
                    iniciarSesion={this.iniciarSesion}
                    onPasswordChange={this.onPasswordChange}
                    passwordErr={this.state.passwordErr}
                />
            </div>
        );
    }
}
export default Login;