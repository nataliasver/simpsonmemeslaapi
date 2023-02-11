# REST API - Simpson Memes LA 

### GET `/memes`
Devuelve un array de json con todos los memes

### GET `/id?value=meme_id`

Se pasa por query string un meme_id o un meme_id parcial (busca por regex)\
Ejemplo: se pasa el qs: 12, buscara todos los meme_id que contengan el numero 12

### GET `/title?value=title`

Se pasa por query string un title o un title parcial (busca por regex)

### GET `/season?value=season`

Se pasa por query string uns temporada o una temporada parcial (busca por regex)

### GET `/episode?value=episode`

Se pasa por query string un episodio o un title parcial (busca por regex)

### GET `/character?value=character`

Se pasa por query string un nombre de un personaje o un nombre parcial (busca por regex)
Ejemplo: se pasa Ned `/character?value=Ned` 
buscara todos en todos los memes que
tengan el personaje Ned, el cual podria estar ingresado como Ned Flanders en la base

### DELETE `/id?value=meme_id`

Se pasa por query string un ID de un meme(meme_id en el schema) para eliminarlo de la base

### POST `/upload/meme`
*Se requiere 'Bearer token'* (*required*)\
Se agrega File como FILE en el request. (*required*) \
Se envia por Body(FormData) lo siguiente (*required*)

```fromData
{
  "title": String, *required*
  "season": Number, *required*
  "episode": Number, *required*
  "description": String, *required*
  "characters": String (Valores separados por coma) *required*
}
```
Ejemplo de formData por postman
![image](https://user-images.githubusercontent.com/8728259/178849943-16815eca-a44a-43aa-9806-afbc6311ce8b.png)


### PUT `/update/meme`
*Se requiere 'Bearer token'* (*required*)\
Se agrega File como FILE en el request. (*not neccesary required*) \
Se envia por Body(FormData) lo siguiente (*required*)

```fromData
{
  "meme_id": String *required*
  "title": String, *required*
  "season": Number, *required*
  "episode": Number, *required*
  "description": String, *required*
  "characters": String, (Valores separados por coma) *required*
  "meme_img_url": String (se requiere si no se envia el file)        
}
```

##Run en Modo Local
### `npm install`
Instalar los paquetes de npm


### `npm server`
Corre el server de la api. \
Para hacer los request desde React,
esta configurado un proxy en el package.json, con lo cual se pueden hacer directos. \
Ejemplo: axios.get('/api/memes/memes')\
ira a buscar la info al server en el puerto 4000 sin necesidad de escribirlo explicitamente
[http://localhost:4000](http://localhost:4000)

### `npm start`
Corre el server de React - UI \
[http://localhost:3000](http://localhost:3000) para verlo en el navegador





