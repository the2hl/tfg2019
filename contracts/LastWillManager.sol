pragma solidity ^0.5.0;

/*
Contrato Ethereum usado en la app LastWillManager.
Author: Hans Sebastian Huaita Loyola.
*/
contract LastWillManager {

  // Estructura que representa a un testamento registrado en la app
  struct Testamento{
    address direccion;
    string nombre; // Nombre del propietario del testamento
    string apellido1; // Primer apellido del propietario del testamento
    string apellido2; // Segundo apellido del propietario del testamento
    string dni; // DNI del propietario del testamento
    string passwordHash; // Hash de la contraseña del propietario del testamento
    string ipfsHash; // Hash IPFS del testamento
  }

  uint public nTestamentos; // Contador de los testamentos registrados en la app

  address[] public testamentosDirs; // Array con las direcciones de los testamentos

  // Diccionario de testamentos con clave la dirección del testamento y el valor la estructura asociada
  mapping (address => Testamento) public testamentos;

  address public superusuario;

  // EVENTOS

  // Evento que se emite cuando se registra un testamento nuevo en la app.
  event TestamentoCreado(
    address direccion,
    string nombre,
    string apellido1,
    string apellido2,
    string dni,
    string passwordHash
  );

  // Evento que se emite cuando se conoce la dirección del superusuario.
  event DireccionSuperusuario(address superusuario);

  // Evento que se emite cuando se cambia el nombre del usuario actual de la app.
  event NombreCambiado(address direccion, string nombre);

  // Evento que se emite cuando se cambia el primer apellido del usuario actual de la app.
  event Apellido1Cambiado(address direccion, string apellido1);

  // Evento que se emite cuando se cambia el segundo apellido del usuario actual de la app.
  event Apellido2Cambiado(address direccion, string apellido2);

  // Evento que se emite cuando se cambia el dni del usuario actual de la app.
  event DNICambiado(address direccion, string dni);

  // Evento que se emite cuando se cambia el hash IPFS del fichero usuario actual de la app.
  event IPFSHashCambiado(address direccion, string ipfsHash);

  // Evento que se emite cuando se intenta registrar un testamento que ya está registrado en la app.
  event TestamentoYaExistente(uint posicion);

  /***** FUNCIONES *****/

  constructor() public{
    superusuario = msg.sender; // El usuario que despliega el contrato Ethereum es el superusuario
    emit DireccionSuperusuario(superusuario);
  }

  // Función para registrar un nuevo testamento en la app.
  function nuevoTestamento(string memory _nom, string memory _apell1, string memory _apell2, string memory _dni, string memory _pwHash) public {
    for(uint i = 0; i<nTestamentos;i++){
      address aux = testamentosDirs[i];
      if(aux == msg.sender){
        emit TestamentoYaExistente(i);
        return;
      }
    }
    emit TestamentoCreado(msg.sender,_nom, _apell1, _apell2, _dni, _pwHash);
    testamentos[msg.sender] = Testamento(msg.sender, _nom, _apell1, _apell2, _dni, _pwHash, "");
    testamentosDirs.push(msg.sender);
    nTestamentos++;
  }

  /*
  Es una función view porque toma datos del estado del testamento. Al ser view, no se pueden emitir eventos
  Si el usuario actual está registrado en la app, se devuelve true.
  Si no lo está, se devuelve false.
  */
  function isRegistrado() public view returns (bool){
    for(uint i = 0; i<nTestamentos;i++){
      if(msg.sender == testamentosDirs[i]){
        return true;
      }
    }
    return false;
  }

  /*
  Es una función view porque toma datos del estado del testamento. Al ser view, no se pueden emitir eventos.
  Si el testamento existe, se devuelve su dirección.
  Si no existe, se devuelve una dirección nula.
  */
  function buscarTestamento(string memory _dni) public view returns (address){
    for(uint i = 0; i<nTestamentos; i++){
      address aux = testamentosDirs[i];
      if ( compararStrings(testamentos[aux].dni, _dni)){
        return aux;
      }
    }
    return address(0);
  }

  /*
  Es una función view porque toma datos del estado del testamento. Al ser view, no se pueden emitir eventos.
  Si el hash introducido coincide con el hash del password de algún usuario con un testamento registrado en la app, se devuelve true.
  Si no coincide con ninguno, se devuelve false.
  */
  function autenticar(string memory _pwHash) public view returns (bool){
    for(uint i = 0; i<nTestamentos; i++){
      if (msg.sender == testamentosDirs[i]){
        return compararStrings(testamentos[msg.sender].passwordHash, _pwHash);
      }
    }
  }

  // Función para cambiar el nombre del usuario actual de la app.
  function cambiarNombre(string memory _nuevo) public{
    emit NombreCambiado(msg.sender, _nuevo);
    testamentos[msg.sender].nombre = _nuevo;
  }

  // Función para cambiar el primer apellido del usuario actual de la app.
  function cambiarApellido1(string memory _nuevo) public{
    emit Apellido1Cambiado(msg.sender, _nuevo);
    testamentos[msg.sender].apellido1 = _nuevo;
  }

  // Función para cambiar el segundo apellido del usuario actual de la app.
  function cambiarApellido2(string memory _nuevo) public{
    emit Apellido2Cambiado(msg.sender, _nuevo);
    testamentos[msg.sender].apellido2 = _nuevo;
  }

  // Función para cambiar el dni del usuario actual de la app.
  function cambiarDNI(string memory _nuevo) public{
    emit DNICambiado(msg.sender, _nuevo);
    testamentos[msg.sender].dni = _nuevo;
  }

  // Función para cambiar el hash IPFS del fichero subido por el usuario actual de la app.
  function cambiarIPFSHash(string memory _nuevo) public{
    emit IPFSHashCambiado(msg.sender, _nuevo);
    testamentos[msg.sender].ipfsHash = _nuevo;
  }

  /*
  Es una función pura porque no toma datos del estado del testamento.
  Compara dos strings: devuelve true si son iguales y false si no lo son.
  */
  function compararStrings(string memory _s1, string memory _s2) public pure returns (bool){
    return keccak256(abi.encodePacked(_s1)) == keccak256(abi.encodePacked(_s2));
  }

}