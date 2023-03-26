import { requestGet, requestPost } from '../helpers/axios.js'
import Cart from '../../../src/db/MongoDb/models/cart.model.js'
import { Connection, Disconnect } from '../../../src/db/Mongo/connection.js'

let token
let cart
let carts

describe('Test Cart', () => {
  beforeAll(async () => {
    await Connection()
    carts = await Cart.find()
    cart = await Cart.findOne({ externalID: 1 })

    const user = {
      username: 'martin@user.com',
      password: 'martinmartin'
    }

    const response = await requestPost('/api/users/login', user)
    token = response.body
  })

  afterAll(async () => {
    await Disconnect()
  })

  describe(('Should GET /carts'), () => {
    it('should return status 200 and list carts', async () => {
      const response = await requestGet('/api/carrito', '', token)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(carts.length).toBe(response.body.length)
    })

    it('should return status 200 and cart selected by id', async () => {
      const id = 1
      const response = await requestGet(`/api/carrito/${id}`, '', token)

      expect(response.status).toBe(200)
      expect(response.error).toBe(false)
      expect(response.body.id).toBe(cart.externalID)
    })

    it('should return status 400 and error message', async () => {
      const id = 55525
      const { response } = await requestGet(`/api/carrito/${id}`, '', token)

      expect(response.status).toBe(400)
      expect(response.data.status).toBe(400)
      expect(response.data.error).toBe(true)
      expect(response.data.body).toEqual('Cart inexistent')
    })

    it('should return status 400 and error message with param is string', async () => {
      const id = 'aasdasdadsad'
      const { response } = await requestGet(`/api/carrito/${id}`, '', token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].value).toMatch(`${id}`)
      expect(response.data.errors[0].msg).toMatch('Invalid id. id is number')
      expect(response.data.errors[0].param).toBe('id')
      expect(response.data.errors[0].location).toBe('params')
    })
  })
})
