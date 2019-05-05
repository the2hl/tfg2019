import React from 'react';
import Ipfs from '../ipfs.js';
import { Datos } from '../components/Datos.jsx';
import { Editar } from '../components/Editar.jsx';
import { Fichero } from '../components/Fichero.jsx';
class PantallaPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataKey: null,
            isDatosOpen: true,
            isEditarOpen: false,
            isFicheroOpen: false,
            nuevoNombre: "",
            nuevoAp1: "",
            nuevoAp2: "",
            nuevoDNI: "",
            stackIdNombre: null,
            stackIdAp1: null,
            stackIdAp2: null,
            stackIdDNI: null,
            stackIdIPFS: null,
            errorDNI: "",
            buffer: null
        };
        // Funciones auxiliares
        this.logOut = this.logOut.bind(this);
        this.showDatosBox = this.showDatosBox.bind(this);
        this.showEditarBox = this.showEditarBox.bind(this);
        this.showFicheroBox = this.showFicheroBox.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onAp1Change = this.onAp1Change.bind(this);
        this.onAp2Change = this.onAp2Change.bind(this);
        this.onDNIChange = this.onDNIChange.bind(this);
        this.cambiarNombre = this.cambiarNombre.bind(this);
        this.cambiarApellido1 = this.cambiarApellido1.bind(this);
        this.cambiarApellido2 = this.cambiarApellido2.bind(this);
        this.cambiarDNI = this.cambiarDNI.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.capturarFichero = this.capturarFichero.bind(this);
    }

    logOut() {
        console.log("Usuario desconectado");
        this.props.action();
    }

    showDatosBox() {
        this.setState({ isDatosOpen: true, isEditarOpen: false, isFicheroOpen: false });
    }
    showEditarBox() {
        this.setState({ isEditarOpen: true, isDatosOpen: false, isFicheroOpen: false });
    }
    showFicheroBox() {
        this.setState({ isFicheroOpen: true, isDatosOpen: false, isEditarOpen: false });
    }

    onNombreChange(e) {
        this.setState({ nuevoNombre: e.target.value });
    }

    onAp1Change(e) {
        this.setState({ nuevoAp1: e.target.value });
    }

    onAp2Change(e) {
        this.setState({ nuevoAp2: e.target.value });
    }

    onDNIChange(e) {
        this.setState({ nuevoDNI: e.target.value });
    }

    cambiarNombre() {
        const nuevo = this.state.nuevoNombre;
        if (nuevo.length > 1) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "nuevoContrato" con los parámetros "nombre, apellido1, ..."
            const stackIdAux = contract.methods["cambiarNombre"].cacheSend(
                this.props.indice, nuevo,
                { from: drizzleState.accounts[0] } // Número de cuenta actual
            );
            console.log("Nombre cambiado a: " + nuevo);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackIdNombre: stackIdAux });
        }

    }

    cambiarApellido1() {
        const nuevo = this.state.nuevoAp1;
        if (nuevo.length > 1) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "nuevoContrato" con los parámetros "nombre, apellido1, ..."
            const stackIdAux = contract.methods["cambiarApellido1"].cacheSend(
                this.props.indice, nuevo,
                { from: drizzleState.accounts[0] } // Número de cuenta actual
            );
            console.log("Primer apellido cambiado a: " + nuevo);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackIdAp1: stackIdAux });
        }
    }

    cambiarApellido2() {
        const nuevo = this.state.nuevoAp2;
        if (nuevo.length > 1) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "nuevoContrato" con los parámetros "nombre, apellido1, ..."
            const stackIdAux = contract.methods["cambiarApellido2"].cacheSend(
                this.props.indice, nuevo,
                {
                    from: drizzleState.accounts[0], // Número de cuenta actual
                }
            );
            console.log("Segundo apellido cambiado a: " + nuevo);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackIdAp2: stackIdAux });
        }
    }

    cambiarDNI() {
        const nuevo = this.state.nuevoDNI;
        if (nuevo.length === 9) {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            // Se informa a Drizzle que se va a llamar al método "nuevoContrato" con los parámetros "nombre, apellido1, ..."
            const stackIdAux = contract.methods["cambiarDNI"].cacheSend(
                this.props.indice, nuevo,
                {
                    from: drizzleState.accounts[0], // Número de cuenta actual
                }
            );
            console.log("DNI cambiado a: " + nuevo);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackIdDNI: stackIdAux });
        } else {
            this.setState({ errorDNI: "Su DNI debe tener 9 caracteres" });
        }
    }

    capturarFichero(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        Ipfs.add(this.state.buffer, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.TFG;
            const ipfsHash = result[0].hash
            // Se informa a Drizzle que se va a llamar al método "cambiarIPFSHash" con los parámetros "this.props.indice, hash"
            const stackIdAux = contract.methods["cambiarIPFSHash"].cacheSend(
                this.props.indice, ipfsHash,
                {
                    from: drizzleState.accounts[0], // Número de cuenta actual
                }
            );
            console.log("Hash IPFS: " + ipfsHash);
            // Se guarda el "stackId" para usarlo después
            this.setState({ stackIdIPFS: stackIdAux });
        })
    }

    componentDidMount() {
        const { drizzle, indice } = this.props;
        const contract = drizzle.contracts.TFG;
        let dataKeyAux = contract.methods["contratos"].cacheCall(indice);
        this.setState({ dataKey: dataKeyAux });
    }

    render() {
        const { TFG } = this.props.drizzleState.contracts;
        if (TFG.contratos[this.state.dataKey]) {
            let contrato = TFG.contratos[this.state.dataKey].value;
            let nombre = contrato.nombre;
            let apellido1 = contrato.apellido1;
            let apellido2 = contrato.apellido2;
            let dni = contrato.dni;
            let ipfsHash = contrato.ipfsHash;
            let htmlFile;
            if (ipfsHash !== "") {
                htmlFile = (
                    <iframe src={`https://ipfs.io/ipfs/${ipfsHash}`} title="IPFS File" width="650" height="650">
                        Este navegador no soporta visualizar PDFs. Por favor, descargue el PDF para poder verlo.
                    </iframe>
                );
            }
            let htmlCode = "";
            if (this.state.isDatosOpen) {
                htmlCode = (
                    <Datos nombre={nombre} apellido1={apellido1} apellido2={apellido2} dni={dni} />
                );
            } else if (this.state.isEditarOpen) {
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
                    <Fichero htmlFile={htmlFile} onSubmit={this.onSubmit} capturarFichero={this.capturarFichero} />
                );
            }

            return (
                <div>
                    <div className="box-controller" role="navigation">
                        <div
                            className={"controller " + (this.state.isDatosOpen ? "selected-controller" : "")}
                            onClick={this.showDatosBox}>
                            Mis datos
                        </div>
                        <div
                            className={"controller " + (this.state.isEditarOpen ? "selected-controller" : "")}
                            onClick={this.showEditarBox}>
                            Editar datos
                        </div>
                        <div
                            className={"controller " + (this.state.isFicheroOpen ? "selected-controller" : "")}
                            onClick={this.showFicheroBox}>
                            Documento
                        </div>
                        <div className="controller" onClick={this.logOut}>
                            Cerrar Sesión
                        </div>
                    </div>
                    <div className="box-container" role="contentinfo">
                        {htmlCode}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default PantallaPrincipal;