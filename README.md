
# Trabajo Fin de Grado: Servicio de gestión de herencias basado en la cadena de bloques Ethereum y el sistema de ficheros IPFS

## Descripción

Desarrollo de un servicio de gestión de testamentos usando “contratos inteligentes” Ethereum para las transacciones propias del servicio, utilizando el sistema de ficheros IPFS para el almacenamiento de los ficheros involucrados en la documentación del servicio y desarrollando una aplicación web para el acceso al servicio.

## Instalación

1) Descargar en local el proyecto :

>git clone [https://github.com/the2hl/tfg2019](https://github.com/the2hl/tfg2019)
>git clone -b metamask --single-branch [https://github.com/the2hl/tfg2019](https://github.com/the2hl/tfg2019)

2) Moverse a la carpeta "client" del proyecto:

>cd tfg2019/client/

3) Instalar los paquetes:
>sudo npm install

4) Crear una red personal de blockchain para desarrollo con [Ganache CLI ](https://github.com/trufflesuite/ganache-cli) (dejar ejecutándose en otro terminal):

>npm run ganache

5) Desplegar el contrato Ethereum en la red de blockchain:

>npm run migrate

6) Instalar en Google Chrome la extensión de [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) e iniciar sesión.

7) Importar en Metamask una cuenta con el rol de *usuario* (que podrá ver los datos de los usuarios) con la clave privada:

>0xdd3915600f72a2f0753143cd824bfafafc650674316925fbb4bc29025561e1ad

8) Importar una cuenta con el rol de *usuario* (que subirá su testamento a la aplicación) con la clave privada:

>0xa137d013dc9b20a89e80cdc980aeb64cec0f91aac78eb9e30787f0e724b31425

9) Iniciar la aplicación:

>npm start

10) Cambiar de cuenta de Metamask para probar los dos tipos de roles: superusuario y usuario.

## Probar el contrato Ethereum

El fichero *TestContrato* en la carpeta *test* del proyecto, tiene una serie de pruebas del contrato Ethereum de la aplicación. Para ejecutarlo:
>npm run test-contract 

## Autor

Hans Sebastian Huaita Loyola
  
Alumno de la ETSIT - UPM (especialidad en Telemática)

Email: hans.huaita.loyola@gmail.com