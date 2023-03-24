# MARKETAPI

This is the back-end of the system [ARKETAPI].
## URL PRODUCTION
https://marketapi-production.up.railway.app/


## Contents

Back-End 
the project is developer in:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)

  **THIS IS A NON-VISUAL SERVER**

## Required programs

In order to use the project on localhost you need to clone it and have some necessary programs:

- [Nodejs](https://nodejs.org/es/download/) v14.15.4 o Higher.
- Development IDE of your convenience Ex. [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) for API tests. (Optional)
- [Git](https://git-scm.com/downloads) to be able to manage the versions.

## How to clone

Comando para clonar:

```bash
cd existing_folder
git clone [LINK REPOSITORY]

```

## installation

Once the project has been cloned, it is necessary to install all the dependencies with the command:

```bash
npm install
```

### Run in LocalHost:

- Change the keys to test mode (Admin = true or false) in the file [config.js](/config/config.js)

Execute the command 

```bash
npm run dev
```

This in turn will run nodemon app.js, which will start the server

### Configs for environment:
Search file in:
```bash
./config/config.js
```
In value:
```bash
dataBase: 'localStorage'
```
or
```bash
dataBase: 'mongoDB'
```
### Run en Producción:

Execute the command

```bash
npm start
```

This in turn will run node app.js, which will start the server

# ENDPOINTS

Endpoint list for the services provided


## PRODUCTS

#### GET `api/productos`

#### GET `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  id of the searched product

#### POST `api/productos`
**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `name`        | required | string  |  name the product
| `description` | required | string  |  description the product
| `code`        | required | string  |  code the product
| `image`       | required | string  |  image the product
| `price`       | required | number  |  price the product
| `stock`       | required | number  |  stock the product

#### UP `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  id of the updated product
|     `{data}`  | optional |         |  data for update product

#### DELETE `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  id of the product delete

 <br/>

## CARTS


#### GET `api/carrito`

#### GET `api/carrito/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  id of the cart search

#### POST `api/carrito/{id}`


#### DELETE `api/carrito/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  id of the cart delete


#### POST `api/carrito/{id}/productos`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  ID of the cart to add product
|**body** `id`  | required | number  |  ID of the product


#### DELETE `api/carrito/{id}/productos/{id_product}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  ID of the cart to add product
| `id_product`  | required | number  |  ID of the product


## BUY

#### POST `api/buy`
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  ID of the cart

## LOGIN

#### POST 
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|   `username`  | required | number  | Username to login
|   `password`  | required | number  | Password to login


