# Online Banking

Solución-implementación front-end de un online banking hecho con React (hooks) y Firebase, tomando el ejemplo de las vistas y componentes que tiene un reconocido banco argentino de su web app.

## Live demo:

> https://santanderonlinebanking.netlify.app/

![desktop_version](https://github.com/ivancanga/onlinebanking/blob/master/src/assets/desktop-version.png)

## Features:

- Sistema de registro con DNI y creación de caja de ahorro en $ y u$s, estos impactan generando un registro en cloud firestore, con un saldo inicial para hacer pruebas.

- Sistema de logeo a través de DNI con autenticación por Firebase.

- Implementación de una solución* para transferencias entre cuentas $ - u$s, verificando: datos del formulario correctos, transferencias denegadas al DNI origen, verificación de fondos suficientes, verificación de la existencia de cuenta destino, update del balance una vez finalizada con éxito la "transacción".

## A futuro:

- Context API.

- Consultas a API externa para obtener el valor del dólar al momento.

- Compra de moneda extranjera (u$s).

Como una aclaración importante, que mi idea es generar una solución por frontend (soy frontender) y copiar las vistas que tiene este banco. Entiendo que para este tipo de webapps, con las transacciones y operaciones que se realizan debe haber un backend y microservicios que validen toda la información.
