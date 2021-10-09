# Backend Challenge

A continuación se describe el paso a paso para la ejecucuón del proyeto.

El proyecto se encuentra alojado en Google Cloud Run.

Instalación y configuración
------------

Instalar dependencias:

```
npm install 
```

### Variables de entorno

Se deben configurar la siguiente variable de entorno para la conexión a la base de datos

> Se debe usar MongoDb.
```
export MONGO_URI=mongodb+srv://user:<password>@cluster0.5coc1.mongodb.net/mutants?retryWrites=true&w=majority
```

Alternativa para correrlo solo con docker:

Instalar Docker y Docker Compose
------------

Ejecutar docker-compose

```
docker-compose up
```

### Correr tests y levantar el servidor

Se pueden ejecutar los tests y levantar el api con los siguientes comandos:

Comando para levantar el servidor manualmente:

```
npm run start
```

Correr el test:
```
npm run test
```

### Endpoints cuando se levanta el ambiente localmente

Para acceder a la consulta de mutantes se tiene el endpoint **http://localhost:3000/mutants/** y para obtener los datos de estadistiscas se tiene el endpoint **http://localhost:3000/stats**.


### Endpoints de ambiente en pdn

Para acceder a la consulta de mutantes se tiene el endpoint **https://challenge-2wva2jw3mq-uc.a.run.app/mutants/** y para obtener los datos de estadistiscas se tiene el endpoint **https://challenge-2wva2jw3mq-uc.a.run.app/stats**.


Ejemplos de como interactuar con el API:

```
curl --location --request POST 'https://challenge-2wva2jw3mq-uc.a.run.app/mutants' \
--header 'Content-Type: application/json' \
--data-raw '{"dna":["ATCCTA","CAGTGC","TTATGT","AGATGG","CCAATA","TCGCTG"] }'
```

```
curl --location --request GET 'https://challenge-2wva2jw3mq-uc.a.run.app/stats'

Respuesta:
{
    "count_mutant_dna": 7,
    "count_human_dna": 1,
    "ratio": "1:7"
}
```