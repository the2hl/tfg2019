
# Trabajo Fin de Grado: Servicio de gestión de herencias basado en la cadena de bloques Ethereum y el sistema de ficheros IPFS

  

## Descripción

Desarrollo de un servicio de gestión de testamentos usando “contratos inteligentes” Ethereum para las transacciones propias del servicio, utilizando el sistema de ficheros IPFS para el almacenamiento de los ficheros involucrados en la documentación del servicio y desarrollando una aplicación web para el acceso al servicio.

  

## Instalación

1) Descargar en local el proyecto :

>git clone [https://github.com/the2hl/tfg2019](https://github.com/the2hl/tfg2019)

2) Moverse a la carpeta "client" del proyecto:

>cd ./client

3) Crear una red personal de blockchain para desarrollo con [Ganache CLI ](https://github.com/trufflesuite/ganache-cli):

>npm run ganache

4) Desplegar el contrato Ethereum en la red de blockchain:

>npm run migrate

5) Instalar en Google Chrome la extensión de [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) e iniciar sesión.

6) Importar en Metamask una cuenta con el rol de *usuario* (que podrá ver los datos de los usuarios) con la clave privada:

>0xdd3915600f72a2f0753143cd824bfafafc650674316925fbb4bc29025561e1ad

7) Importar una cuenta con el rol de *usuario* (que subirá su testamento a la aplicación) con la clave privada:

>0xa137d013dc9b20a89e80cdc980aeb64cec0f91aac78eb9e30787f0e724b31425

8) Finalmente, iniciar la aplicación:

>npm start

## Probar el contrato Ethereum
El fichero *TestContrato* en la carpeta *test* del proyecto, tiene una serie de pruebas del contrato Ethereum de la aplicación. Para ejecutarlo:
>npm run test-contract 

## Autor

  

Hans Sebastian Huaita Loyola

  

Alumno de la ETSIT - UPM (especialidad en Telemática)

  

Email: hans.huaita.loyola@gmail.com