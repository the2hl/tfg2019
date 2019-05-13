pragma solidity ^0.5.0;

contract TFG {

  struct Contrato{
    //uint id; // Identificador del contrato
    address direccion;
    string nombre; // Nombre del propietario del contrato
    string apellido1; // Primer apellido del propietario del contrato
    string apellido2; // Segundo apellido del propietario del contrato
    string dni; // DNI del propietario del contrato
    string passwordHash; // Hash de la contraseña del propietario del contrato
    string ipfsHash; // Hash IPFS del contrato
  }

  //uint public identificador = 1;

  uint public nContratos;

  address[] public contratosDirs;

  mapping (address => Contrato) public contratos;

  address public creador;

  /***** EVENTOS *****/

  event ContratoCreado(
    address direccion,
    string nombre,
    string apellido1,
    string apellido2,
    string dni,
    string passwordHash
  );

  event DireccionCreador(address creador);

  event NombreCambiado(address direccion, string nombre);

  event Apellido1Cambiado(address direccion, string apellido1);

  event Apellido2Cambiado(address direccion, string apellido2);

  event DNICambiado(address direccion, string dni);

  event IPFSHashCambiado(address direccion, string ipfsHash);

  event ContratoYaExistente(uint posicion);

  /***** FUNCIONES *****/

  constructor() public{
    creador = msg.sender;
    emit DireccionCreador(creador);
  }

  function nuevoContrato(string memory _nombre, string memory _apell1, string memory _apell2, string memory _dni, string memory _pwHash) public {
    for(uint i = 0; i<nContratos;i++){
      address aux = contratosDirs[i];
      if(aux == msg.sender){
        emit ContratoYaExistente(i);
        return;
      }
    }
    emit ContratoCreado(msg.sender,_nombre, _apell1, _apell2, _dni, _pwHash);
    contratos[msg.sender] = Contrato(msg.sender, _nombre, _apell1, _apell2, _dni, _pwHash, "");
    contratosDirs.push(msg.sender);
    //identificador++;
    nContratos++;
  }
  // Es view porque toma datos del estado del contrato. Al ser view, no se pueden emitir eventos
  function isRegistrado() public view returns (bool){
    for(uint i = 0; i<nContratos;i++){
      if(msg.sender == contratosDirs[i]){
        return true;
      }
    }
    return false;
  }

  /*
  Es view porque toma datos del estado del contrato. Al ser view, no se pueden emitir eventos
  Si el DNI y el hash son erróneos, se devuelve -3
  Si el DNI es incorrecto pero el hash es correcto, se devuelve -2
  Si el DNI es correcto pero el hash es incorrecto, se devuelve -1
  Si el DNI y el hash son correctos, se devuelve la posición del contrato
  */
  function buscarContrato(string memory _dni) public view returns (address){
    for(uint i = 0; i<nContratos; i++){
      address aux = contratosDirs[i];
      if ( compararStrings(contratos[aux].dni, _dni)){
        return aux;
      }
    }
    return address(0);
  }

  // Es view porque toma datos del estado del contrato. Al ser view, no se pueden emitir eventos
  function autenticar(string memory _pwHash) public view returns (bool){
    for(uint i = 0; i<nContratos; i++){
      if (msg.sender == contratosDirs[i]){
        return compararStrings(contratos[msg.sender].passwordHash, _pwHash);
      }
    }
  }

  function cambiarNombre(string memory _nuevo) public{
    emit NombreCambiado(msg.sender, _nuevo);
    contratos[msg.sender].nombre = _nuevo;
  }

  function cambiarApellido1(string memory _nuevo) public{
    emit Apellido1Cambiado(msg.sender, _nuevo);
    contratos[msg.sender].apellido1 = _nuevo;
  }

  function cambiarApellido2(string memory _nuevo) public{
    emit Apellido2Cambiado(msg.sender, _nuevo);
    contratos[msg.sender].apellido2 = _nuevo;
  }

  function cambiarDNI(string memory _nuevo) public{
    emit DNICambiado(msg.sender, _nuevo);
    contratos[msg.sender].dni = _nuevo;
  }

  function cambiarIPFSHash(string memory _nuevo) public{
    emit IPFSHashCambiado(msg.sender, _nuevo);
    contratos[msg.sender].ipfsHash = _nuevo;
  }

  // Es puro porque no toma datos del estado del contrato
  function compararStrings(string memory _s1, string memory _s2) public pure returns (bool){
    return keccak256(abi.encodePacked(_s1)) == keccak256(abi.encodePacked(_s2));
  }

}