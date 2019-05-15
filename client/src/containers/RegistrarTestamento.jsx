/**
 * @fileoverview Componente contenedor para registrar un testamento en la app
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import Sha256 from "js-sha256";
import { Registro } from '../components/Registro.jsx'; // Componente visual hijo

class RegistrarTestamento extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena el nombre introducido por el usuario.
             *  @type {string}
             */
            nombre: "",
            /**
             * Propiedad que almacena el primer apellido introducido por el usuario.
             *  @type {string}
             */
            apellido1: "",
            /**
             * Propiedad que almacena el segundo apellido introducido por el usuario.
             *  @type {string}
             */
            apellido2: "",
            /**
             * Propiedad que almacena el dni introducido por el usuario.
             *  @type {string}
             */
            dni: "",
            /**
             * Propiedad que almacena la contraseña introducida por el usuario.
             *  @type {string}
             */
            password: "",
            /**
             * Propiedad que indica si hay un error en el nombre introducido por el usuario.
             *  @type {boolean}
             */
            isNombreMal: false,
            /**
             * Propiedad que almacena si hay un error en el primer apellido introducido por el usuario.
             *  @type {boolean}
             */
            isApellido1Mal: false,
            /**
             * Propiedad que almacena si hay un error en el dni introducido por el usuario.
             *  @type {boolean}
             */
            isDNIMal: false,
            /**
             * Propiedad que almacena si hay un error en la contraseña introducida por el usuario.
             *  @type {boolean}
             */
            isPasswordMal: false,
            /**
             * Propiedad que almacena el nivel de seguridad de la contraseña introducida por el usuario.
             *  @type {string}
             */
            nivelSeguridad: "débil"
        };

        // Binding de las funciones auxiliares
        this.registrar = this.registrar.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onApellido1Change = this.onApellido1Change.bind(this);
        this.onApellido2Change = this.onApellido2Change.bind(this);
        this.onDNIChange = this.onDNIChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.crearTraza = this.crearTraza.bind(this);
    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que almacena el nombre introducido por el usuario.
     * @param {*} e 
     */
    onNombreChange(e) {
        this.setState({ nombre: e.target.value });
    }

    /**
     * Función que almacena el primer apellido introducido por el usuario.
     * @param {*} e 
     */
    onApellido1Change(e) {
        this.setState({ apellido1: e.target.value });
    }

    /**
     * Función que almacena el segundo apellido introducido por el usuario.
     * @param {*} e 
     */
    onApellido2Change(e) {
        this.setState({ apellido2: e.target.value });
    }

    /**
     * Función que almacena el dni introducido por el usuario.
     * @param {*} e 
     */
    onDNIChange(e) {
        this.setState({ dni: e.target.value });
    }

    /**
     * Función que almacena la contraseña introducida por el usuario.
     * @param {*} e 
     */
    onPasswordChange(e) {
        let longitud = e.target.value.length;
        let seguridad = "débil";
        // Si la contraseña introducida tiene más de 6 caracteres
        if (longitud > 6) {
            seguridad = "medio";
        }
        // Si la contraseña introducida tiene más de 11 caracteres
        if (longitud > 11) {
            seguridad = "fuerte";
        }
        this.setState({ password: e.target.value, nivelSeguridad: seguridad });
    }

    /**
     * Función que se llama cuando el usario introduce sus datos y pulsa el botón "Registrarse".
     * @param {*} e 
     */
    registrar(e) {
        e.preventDefault(); // Evitar que se recargue la página al hacer submit. Necesario en React.
        let errorNomAux = false, errorApell1Aux = false, errorDNIAux = false, errorPWAux = false;
        // Si el nombre introducido está vacío
        if (this.state.nombre === "") {
            errorNomAux = true;
        }
        // Si el apellido introducido está vacío
        if (this.state.apellido1 === "") {
            errorApell1Aux = true;
        }
        // Si el dni introducido no tiene 9 caracteres
        if (this.state.dni.length !== 9) {
            errorDNIAux = true;
        }
        // Si la contraseña introducido tiene menos de 5 caracteres
        if (this.state.password.length < 5) {
            errorPWAux = true;
        }
        this.setState({
            isNombreMal: errorNomAux,
            isApellido1Mal: errorApell1Aux,
            isDNIMal: errorDNIAux,
            isPasswordMal: errorPWAux
        })
        // Si no hay ningun error
        if (!errorNomAux && !errorApell1Aux && !errorDNIAux && !errorPWAux) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            const nombre = this.state.nombre;
            const apellido1 = this.state.apellido1;
            const apellido2 = this.state.apellido2;
            const dni = this.state.dni;
            const hash = Sha256(this.state.password);
            // Se informa a Drizzle que se va a llamar al método "nuevoTestamento"
            // Al ser un método que no devuelve nada, no es necesario almacenar la dataKey
            contract.methods["nuevoTestamento"].cacheSend(
                nombre, apellido1, apellido2, dni, hash, // Parámetros
                {
                    from: drizzleState.accounts[0], // Número de cuenta actual
                    gas: 280000
                }
            );
            this.crearTraza("Cuenta de Metamask: " + drizzleState.accounts[0]);
            this.crearTraza("Nuevo contrato añadido: " + nombre + " " + apellido1 + " " + apellido2 + " con DNI " + dni);
        }
    }

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "RegistrarTestamento: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    render() {
        let nombreErr = null, apellido1Err = null, passwordErr = null, dniErr = null;
        if (this.state.isNombreMal) {
            nombreErr = "Introduzca su nombre por favor"
        }
        if (this.state.isApellido1Mal) {
            apellido1Err = "Introduzca su primer apellido por favor"
        }
        if (this.state.isDNIMal) {
            dniErr = "Su DNI debe tener 9 caracteres"
        }
        if (this.state.isPasswordMal) {
            passwordErr = "Su contraseña debe tener 5 caracteres como mínimo"
        }

        let pwdWeak = false, pwdMedium = false, pwdStrong = false;
        // Si el nivel de seguridad de la contraseña es débil
        if (this.state.nivelSeguridad === "débil") {
            pwdWeak = true;
        }
        // Si el nivel de seguridad de la contraseña es medio
        else if (this.state.nivelSeguridad === "medio") {
            pwdWeak = true;
            pwdMedium = true;
        }
        // Si el nivel de seguridad de la contraseña es fuerte
        else if (this.state.nivelSeguridad === "fuerte") {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }

        return (
            <Registro
                registrar={this.registrar}
                onNombreChange={this.onNombreChange}
                onApellido1Change={this.onApellido1Change}
                onApellido2Change={this.onApellido2Change}
                onDNIChange={this.onDNIChange}
                onPasswordChange={this.onPasswordChange}
                nombreErr={nombreErr}
                apellido1Err={apellido1Err}
                dniErr={dniErr}
                passwordErr={passwordErr}
                password={this.state.password}
                pwdWeak={pwdWeak}
                pwdMedium={pwdMedium}
                pwdStrong={pwdStrong}
            />
        );
    }
}
export default RegistrarTestamento;