import { Connection, Disconnect } from '../../../src/db/MongoDb/connection.js'
import Product from '../../../src/db/MongoDb/models/product.model.js'
import { requestGet, requestPost } from '../helpers/axios.js'

let products
let token
let product

describe('Test /productos', () => {
  beforeAll(async () => {
    await Connection()
    products = await Product.find()

    product = {
      name: 'Regla TESTING',
      description: 'Escuadra universitaria TESTING',
      code: 'TEST1236',
      image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
      price: 144.00,
      stock: 15
    }

    const user = {
      username: 'admin@admin.com',
      password: 'adminadmin'
    }

    const response = await requestPost('/api/users/login', user)
    token = response.body
  })

  afterAll(async () => {
    await Disconnect()
  })

  describe('GET /api/products', () => {
    test('Return status 200 and list products', async () => {
      const response = await requestGet('/api/productos')

      expect(response.error).toEqual(false)
      expect(response.status).toBe(200)
      expect(products.length).toBe(response.body.length)
      expect(response).toBeTruthy()
      expect(Array.isArray(response.body)).toBe(true)
    })

    test('Return status 200 product by id selected', async () => {
      const id = 5

      const productById = await Product.findOne({ externalID: id })
      const response = await requestGet(`/api/productos/${id}`)

      expect(response.error).toEqual(false)
      expect(response.status).toBe(200)
      expect(response).toBeTruthy()
      expect(productById.externalID).toBe(response.body.id)
      expect(productById.name).toEqual(response.body.name)
    })

    test('Return status 400 in select product by id inexistent', async () => {
      const id = 500
      const { response } = await requestGet(`/api/productos/${id}`)

      expect(response.data.error).toEqual(true)
      expect(response.data.status).toBe(400)
      expect(response).toBeTruthy()
      expect(response.data.body).toMatch('Product not found')
    })

    test('Return status 400 Error in select product by id (string)', async () => {
      const id = '5aa'
      const { response } = await requestGet(`/api/productos/${id}`)

      expect(Array.isArray(response.data.errors)).toEqual(true)
      expect(response.status).toBe(400)
      expect(response).toBeTruthy()
      expect(response.data.errors[0].value).toMatch(`${id}`)
      expect(response.data.errors[0].msg).toMatch('Id not is valid')
      expect(response.data.errors[0].location).toMatch('params')
    })
  })

  describe('POST /api/productos', () => {
    it('should return 200 and product created', async () => {
      const response = await requestPost('/api/productos', product, token)

      const ProductCreated = await Product.findOne({ externalID: response.body.id })

      expect(response.status).toBe(201)
      expect(ProductCreated.externalID).toEqual(response.body.id)
      expect(response.body.name).toEqual(product.name)
      expect(response.body.code).toEqual(product.code)
    })

    it('should return 400 when params name not sendend', async () => {
      const productNotName = {
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 144.00,
        stock: 15
      }

      const { response } = await requestPost('/api/productos', productNotName, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Name is required')
      expect(response.data.errors[0].param).toMatch('name')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when params Description not sendend', async () => {
      const product = {
        name: 'Regla TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 144.00,
        stock: 15
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Description is required')
      expect(response.data.errors[0].param).toMatch('description')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when params Code not sendend', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 144.00,
        stock: 15
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Code is required')
      expect(response.data.errors[0].param).toMatch('code')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when params Image not sendend', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        price: 144.00,
        stock: 15
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Image is required')
      expect(response.data.errors[0].param).toMatch('image')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when params Price not sendend', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        stock: 15
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Price is required')
      expect(response.data.errors[0].param).toMatch('price')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when params Price not sendend', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 144.00
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Stock is required')
      expect(response.data.errors[0].param).toMatch('stock')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when param Price is string', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 'testing',
        stock: 55
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].value).toMatch(product.price)
      expect(response.data.errors[0].msg).toMatch('Price value numeric between 10 and 150000')
      expect(response.data.errors[0].param).toMatch('price')
      expect(response.data.errors[0].location).toMatch('body')
    })

    it('should return 400 when param stock is string', async () => {
      const product = {
        name: 'Regla TESTING',
        description: 'Escuadra universitaria TESTING',
        code: 'TEST1236',
        image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
        price: 150,
        stock: 'asdasda'
      }

      const { response } = await requestPost('/api/productos', product, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].value).toMatch(product.stock)
      expect(response.data.errors[0].msg).toMatch('Stock value numeric between 10 and 10000')
      expect(response.data.errors[0].param).toMatch('stock')
      expect(response.data.errors[0].location).toMatch('body')
    })
  })
})
