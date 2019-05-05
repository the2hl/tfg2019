const TFG = artifacts.require("./TFG.sol");
const Sha256 = require("/home/hhl/tfg/client/node_modules/js-sha256");

contract("TFG", accounts => {
  it("Añadir contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("the2hl");
    // Añadir un nuevo contrato
    await TFGStore.nuevoContrato("Hans", "Huaita", "Loyola", "03235558X", hash);
    const TFGStored = await TFGStore.contratos.call(1);
    const nombre = TFGStored.nombre;
    const apellido1 = TFGStored.apellido1;
    const apellido2 = TFGStored.apellido2;
    const dni = TFGStored.dni;
    const passwordHash = TFGStored.passwordHash;
    const nContratos = await TFGStore.nContratos.call();
    // Comparaciones
    assert.equal(nContratos, 1, "El contrato 1 no fue añadido");
    assert.equal(nombre, "Hans", "El nombre es erróneo");
    assert.equal(apellido1, "Huaita", "El primer apellido es erróneo");
    assert.equal(apellido2, "Loyola", "El segundo apellido es erróneo");
    assert.equal(dni, "03235558X", "El DNI es erróneo");
    assert.equal(passwordHash, hash, "La contraseña es errónea");
  });
  it("Añadir contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("prueba");
    // Añadir un nuevo contrato
    await TFGStore.nuevoContrato("Diego Arturo", "Huaita", "Loyola", "00000001A", hash);
    const TFGStored = await TFGStore.contratos.call(2);
    const nombre = TFGStored.nombre;
    const nContratos = await TFGStore.nContratos.call();
    // Comparaciones
    assert.equal(nContratos, 2, "El contrato 2 no fue añadido");
    assert.equal(nombre, "Diego Arturo", "El nombre es erróneo");
  });
  it("Buscar contrato 1 con hash erróneo", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("1234567");
    // Buscara un contrato
    const resultado = await TFGStore.buscarContrato("03235558X", hash);
    // Comparaciones
    assert.equal(resultado, -1, "No se detectó que el hash es erróneo");
  });
  it("Buscar contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const hash = Sha256("prueba");
    // Buscara un contrato
    const resultado = await TFGStore.buscarContrato("00000001A", hash);
    // Comparaciones
    assert.equal(resultado, 2, "El contrato no se encontró");
  });
  it("Cambiar el nombre del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Juan";
    // Cambiar de nombre al propietario de un contrato
    await TFGStore.cambiarNombre(1, nuevo);
    const TFGStored = await TFGStore.contratos.call(1);
    const nombre = TFGStored.nombre;
    // Comparaciones
    assert.equal(nombre, nuevo, "El nombre no se ha cambiado");
  });
  it("Cambiar el primer apellido del propietario del contrato 1", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Nieve";
    // Cambiar de primer apellido al propietario de un contrato
    await TFGStore.cambiarApellido1(1, nuevo);
    const TFGStored = await TFGStore.contratos.call(1);
    const apellido1 = TFGStored.apellido1;
    // Comparaciones
    assert.equal(apellido1, nuevo, "El primer apellido no se ha cambiado");
  });
  it("Cambiar el segundo apellido del propietario del contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "Smith";
    // Cambiar de segundo apellido al propietario de un contrato
    await TFGStore.cambiarApellido2(2, nuevo);
    const TFGStored = await TFGStore.contratos.call(2);
    const apellido2 = TFGStored.apellido2;
    // Comparaciones
    assert.equal(apellido2, nuevo, "El segundo apellido no se ha cambiado");
  });
  it("Cambiar el DNI del propietario del contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "1234578Z";
    // Cambiar de DNI al propietario de un contrato
    await TFGStore.cambiarDNI(2, nuevo);
    const TFGStored = await TFGStore.contratos.call(2);
    const dni = TFGStored.dni;
    // Comparaciones
    assert.equal(dni, nuevo, "El DNI no se ha cambiado");
  });
  it("Cambiar el hash IPFS del contrato 2", async () => {
    const TFGStore = await TFG.deployed();
    const nuevo = "1a2b3c4d5e6f7g8h9i";
    // Cambiar de DNI al propietario de un contrato
    await TFGStore.cambiarIPFSHash(2, nuevo);
    const TFGStored = await TFGStore.contratos.call(2);
    const ipfsHash = TFGStored.ipfsHash;
    // Comparaciones
    assert.equal(ipfsHash, nuevo, "El DNI no se ha cambiado");
  });
});