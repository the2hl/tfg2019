/**
 * @fileoverview Componente contenedor que gestiona las pantallas que ve un usuario de la app.
 *
 * @author Hans Sebastian Huaita Loyola
 */

/* IMPORTS */
import React from 'react';
import Ipfs from '../ipfs.js';
import { Datos } from '../components/Datos.jsx'; // Componente visual hijo
import { Editar } from '../components/Editar.jsx'; // Componente visual hijo
import { Fichero } from '../components/Fichero.jsx'; // Componente visual hijo

class MainUsuario extends React.Component {

    constructor(props) {
        super(props);

        /* Estado del componente */
        this.state = {
            /**
             * Propiedad que almacena la clave necesaria para llamar al método "isRegistrado" del contrato Ethereum usando Drizzle.
             *  @type {string}
             */
            dataKey: null,
            /**
             * Propiedad que indica si está abierta la pestaña de Datos.
             *  @type {boolean}
             */
            isDatosAbierto: true,
            /**
             * Propiedad que indica si está abierta la pestaña de Editar.
             *  @type {boolean}
             */
            isEditarAbierto: false,
            /**
             * Propiedad que indica si está abierta la pestaña de Testamento.
             *  @type {boolean}
             */
            isTestamentoAbierto: false,
            /**
             * Propiedad que almacena el nuevo nombre introducido por el usuario.
             *  @type {string}
             */
            nuevoNombre: "",
            /**
             * Propiedad que almacena el nuevo priper apellido introducido por el usuario.
             *  @type {string}
             */
            nuevoAp1: "",
            /**
             * Propiedad que almacena el nuevo segundo apellido introducido por el usuario.
             *  @type {string}
             */
            nuevoAp2: "",
            /**
             * Propiedad que almacena el nuevo dni introducido por el usuario.
             *  @type {string}
             */
            nuevoDNI: "",
            /**
             * Propiedad que almacena el mensaje de error en relación al dni introducido por el usuario.
             *  @type {string}
             */
            errorDNI: "",
            /**
             * Propiedad que almacena el buffer asociado al fichero subido por el usuario.
             *  @type {*}
             */
            buffer: null
        };

        // Binding de las funciones auxiliares
        this.mostrarDatos = this.mostrarDatos.bind(this);
        this.mostrarEditar = this.mostrarEditar.bind(this);
        this.mostrarTestamento = this.mostrarTestamento.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onAp1Change = this.onAp1Change.bind(this);
        this.onAp2Change = this.onAp2Change.bind(this);
        this.onDNIChange = this.onDNIChange.bind(this);
        this.cambiarNombre = this.cambiarNombre.bind(this);
        this.cambiarApellido1 = this.cambiarApellido1.bind(this);
        this.cambiarApellido2 = this.cambiarApellido2.bind(this);
        this.cambiarDNI = this.cambiarDNI.bind(this);
        this.enviarFichero = this.enviarFichero.bind(this);
        this.capturarFichero = this.capturarFichero.bind(this);
        this.crearTraza = this.crearTraza.bind(this);
    }

    /* FUNCIONES PROPIAS DE LOS COMPONENTES REACT */

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LastWillManager;
        // Se informa a Drizzle de que se va a llamar al método "testamentos"
        let dataKeyAux = contract.methods["testamentos"].cacheCall(drizzleState.accounts[0]);
        // Se guarda la "dataKey" para usarla después
        this.setState({ dataKey: dataKeyAux });
    }

    /* FUNCIONES AUXILIARES */

    /**
     * Función que muestra la pestaña "Datos".
     */
    mostrarDatos() {
        this.setState({ isDatosAbierto: true, isEditarAbierto: false, isTestamentoAbierto: false });
    }

    /**
     * Función que muestra la pestaña "Editar".
     */
    mostrarEditar() {
        this.setState({ isEditarAbierto: true, isDatosAbierto: false, isTestamentoAbierto: false });
    }

    /**
     * Función que muestra la pestaña "Testamento".
     */
    mostrarTestamento() {
        this.setState({ isTestamentoAbierto: true, isDatosAbierto: false, isEditarAbierto: false });
    }

    /**
     * Función que almacena el nombre introducido por el usuario.
     * @param {*} e 
     */
    onNombreChange(e) {
        this.setState({ nuevoNombre: e.target.value });
    }

    /**
     * Función que almacena el primer apellido introducido por el usuario.
     * @param {*} e 
     */
    onAp1Change(e) {
        this.setState({ nuevoAp1: e.target.value });
    }

    /**
     * Función que almacena el segundo apellido introducido por el usuario.
     * @param {*} e 
     */
    onAp2Change(e) {
        this.setState({ nuevoAp2: e.target.value });
    }

    /**
     * Función que almacena el dni introducido por el usuario.
     * @param {*} e 
     */
    onDNIChange(e) {
        this.setState({ nuevoDNI: e.target.value });
    }

    /**
     * Función que se llama cuando el usario introduce el nuevo nombre y pulsa el botón "Cambiar".
     */
    cambiarNombre() {
        const nuevo = this.state.nuevoNombre;
        // Si el nuevo nombre tiene más de 1 caracter
        if (nuevo.length > 1) {
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            // Se informa a Drizzle que se va a llamar al método "cambiarNombre"
            // Al ser un método que no devuelve nada, no es necesario almacenar la dataKey
            contract.methods["cambiarNombre"].cacheSend(nuevo);
            this.crearTraza("Nombre cambiado a: " + nuevo);
        }

    }

    /**
     * Función que se llama cuando el usario introduce el nuevo primer apellido y pulsa el botón "Cambiar".
     */
    cambiarApellido1() {
        const nuevo = this.state.nuevoAp1;
        // Si el nuevo primer apellido tiene más de 1 caracter
        if (nuevo.length > 1) {
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            // Se informa a Drizzle que se va a llamar al método "cambiarApellido1"
            // Al ser un método que no devuelve nada, no es necesario almacenar la dataKey
            contract.methods["cambiarApellido1"].cacheSend(nuevo);
            this.crearTraza("Primer apellido cambiado a: " + nuevo);
        }
    }

    /**
     * Función que se llama cuando el usario introduce el nuevo segundo apellido y pulsa el botón "Cambiar".
     */
    cambiarApellido2() {
        const nuevo = this.state.nuevoAp2;
        // Si el nuevo segundo apellido tiene más de 1 caracter
        if (nuevo.length > 1) {
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            // Se informa a Drizzle que se va a llamar al método "cambiarApellido2"
            // Al ser un método que no devuelve nada, no es necesario almacenar la dataKey
            contract.methods["cambiarApellido2"].cacheSend(nuevo);
            this.crearTraza("Segundo apellido cambiado a: " + nuevo);
        }
    }

    /**
     * Función que se llama cuando el usario introduce el nuevo dni y pulsa el botón "Cambiar".
     */
    cambiarDNI() {
        const nuevo = this.state.nuevoDNI;
        // Si el nuevo dni tiene más de 1 caracter
        if (nuevo.length === 9) {
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            // Se informa a Drizzle que se va a llamar al método "cambiarDNI"
            // Al ser un método que no devuelve nada, no es necesario almacenar la dataKey
            contract.methods["cambiarDNI"].cacheSend(nuevo);
            this.crearTraza("DNI cambiado a: " + nuevo);
        } else {
            this.setState({ errorDNI: "Su DNI debe tener 9 caracteres" });
        }
    }

    /**
     * Función que se llama cuando el usuario selecciona el fichero con su testamento.
     * @param {*} event 
     */
    capturarFichero(event) {
        event.preventDefault(); // Evita que se recargue la página al hacer submit. Necesario en React.
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file, (error) => {
            if (error) {
                console.error(error);
                return;
            }
        });
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
        }
    }

    /**
     * Función que se llama cuando el usuario pulsa el botón "Enviar" en la pantalla "Testamento".
     * @param {*} event 
     */
    enviarFichero(event) {
        event.preventDefault(); // Evita que se recargue la página al hacer submit. Necesario en React.
        Ipfs.add(this.state.buffer, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            const { drizzle } = this.props;
            const contract = drizzle.contracts.LastWillManager;
            const ipfsHash = result[0].hash
            // Se informa a Drizzle que se va a llamar al método "cambiarIPFSHash"
            contract.methods["cambiarIPFSHash"].cacheSend(ipfsHash);
            this.crearTraza("Hash IPFS: " + ipfsHash);
        })
    }

    /**
     * Función que muestra por consola una traza. Aparece el nombre de la clase en rojo.
     * @param {string} mensaje Traza que se muestra en azul.
     */
    crearTraza(mensaje) {
        const debugTag = "MainUsuario: ";
        console.log("%c" + debugTag + "%c" + mensaje, "color: red", "color: blue");
    }

    render() {
        const { LastWillManager } = this.props.drizzleState.contracts;
        if (LastWillManager.testamentos[this.state.dataKey]) {
            // Se obtiene el resultado de llamar al método "testamentos" usando la "dataKeyReg" guardada
            let contrato = LastWillManager.testamentos[this.state.dataKey].value;
            let nombre = contrato.nombre;
            let apellido1 = contrato.apellido1;
            let apellido2 = contrato.apellido2;
            let dni = contrato.dni;
            let ipfsHash = contrato.ipfsHash;
            let htmlFile;
            if (ipfsHash !== "") {
                htmlFile = (
                    <iframe src={`https://ipfs.io/ipfs/${ipfsHash}`} title="IPFS File" width="500" height="450">
                        Este navegador no soporta visualizar PDFs. Por favor, descargue el PDF para poder verlo.
                    </iframe>
                );
            }
            let htmlCode = "";
            if (this.state.isDatosAbierto) {
                htmlCode = (
                    <Datos cabecera="Mis datos" nombre={nombre} apellido1={apellido1} apellido2={apellido2} dni={dni} />
                );
            } else if (this.state.isEditarAbierto) {
                htmlCode = (
                    <Editar
                        nombre={nombre} apellido1={apellido1} apellido2={apellido2} dni={dni}
                        onNombreChange={this.onNombreChange} cambiarNombre={this.cambiarNombre}
                        onAp1Change={this.onAp1Change} cambiarApellido1={this.cambiarApellido1}
                        onAp2Change={this.onAp2Change} cambiarApellido2={this.cambiarApellido2}
                        onDNIChange={this.onDNIChange} cambiarDNI={this.cambiarDNI}
                        errorDNI={this.state.errorDNI}
                    />
                );
            } else {
                htmlCode = (
                    <Fichero htmlFile={htmlFile} enviarFichero={this.enviarFichero} capturarFichero={this.capturarFichero} />
                );
            }

            return (
                <div>
                    <div className="box-controller" role="navigation">
                        <div
                            className={"controller " + (this.state.isDatosAbierto ? "selected-controller" : "")}
                            onClick={this.mostrarDatos}>
                            Datos
                        </div>
                        <div
                            className={"controller " + (this.state.isEditarAbierto ? "selected-controller" : "")}
                            onClick={this.mostrarEditar}>
                            Editar
                        </div>
                        <div
                            className={"controller " + (this.state.isTestamentoAbierto ? "selected-controller" : "")}
                            onClick={this.mostrarTestamento}>
                            Testamento
                        </div>
                        <div
                            className={"controller "}
                            onClick={this.props.action}>
                            Logout
                        </div>
                    </div>
                    <div className="box-container" role="contentinfo">
                        {htmlCode}
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}
export default MainUsuario;