# Derco
En esta aplicacion esta la funcion lamda para ser subida directamente a aws, esto incluye subir una libreria externa como axios.
Este depliegue se hace a traves de travis y se usa 2 branch y 2 funciones lamdas distintas definidas en el archivo .travis

Esta funcion lamda ejerce la funcion de backend consultando por los datos que en este caso es otra api(algo innecesario pero se hizo como ejercicio), 

Las configuraciones mas complicadas estan en aws que fueron las creaciones de roles y etc. Y tambien la apigateway para responder por la API
