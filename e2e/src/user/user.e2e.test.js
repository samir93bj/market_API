import { requestGet, requestPost } from '../helpers/axios.js'
import User from '../../../src/db/MongoDb/models/user.model.js'
import { Connection, Disconnect } from '../../../src/db/MongoDb/connection.js'

let token
let users
let userSearch
let userCreate

/*
  TODO: ADD TEST CREATE USER
*/

describe('Test Users /users', () => {
  beforeEach(async () => {
    await Connection()
    users = await User.find()
    userSearch = await User.findById('63d43a4f6b49a8f900357e1a')

    const user = {
      username: 'admin@admin.com',
      password: 'adminadmin'
    }

    userCreate = {
      name: 'Florencia',
      direction: 'San Miguel de Tucuman - Tucuman',
      edad: 30,
      phone: '3814998552',
      username: 'florenciaTest@userTest.com',
      password: 'florenciaflorenciaTest'
    }

    const response = await requestPost('/api/users/login', user)
    token = response.body
  })

  afterAll(async () => {
    const userCreted = await User.findOne({ username: 'florenciaTest@userTest.com' })
    await User.findByIdAndDelete(userCreted.id)
    await Disconnect()
  })

  describe(('Test GET /users'), () => {
    it('return status 200 and list users', async () => {
      const response = await requestGet('/api/users', '', token)

      expect(response.status).toBe(200)
      expect(response.error).toBe(false)
      expect(Array.isArray(response.body)).toBe(true)
      expect(users.length).toBe(response.body.length)
    })

    it('return status 401 with token not provided', async () => {
      const { response } = await requestGet('/api/users', '')

      expect(response.status).toBe(401)
      expect(response.data.error).toBe(true)
      expect(response.data.message).toMatch('Token is required and must be valid')
    })

    it('return status 400 when id user is not is valid', async () => {
      const id = 5
      const { response } = await requestGet(`/api/users/${id}`, '', token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].value).toMatch(`${id}`)
      expect(response.data.errors[0].msg).toMatch('Id not is valid')
      expect(response.data.errors[0].location).toMatch('params')
    })

    it('return status 200 when id user exists', async () => {
      const id = '63d43a4f6b49a8f900357e1a'
      const response = await requestGet(`/api/users/${id}`, '', token)

      expect(response.status).toBe(200)
      expect(response.error).toBe(false)
      expect(userSearch.name).toBe(response.body.name)
    })
  })

  describe(('Test POST /users'), () => {
    it('return status 200 and Token when created success', async () => {
      const response = await requestPost('/api/users', userCreate, token)

      expect(response.error).toBe(false)
      expect(response.status).toBe(200)
      expect(typeof (response.body)).toBe('string')
    })

    it('return status 400 and when username already exist', async () => {
      const { response } = await requestPost('/api/users', userCreate, token)

      expect(response.status).toBe(400)
      expect(response.data.status).toBe(400)
      expect(response.data.error).toBe(true)
      expect(response.data.body).toMatch('User already exist')
    })

    it('return status 400 and when param not added', async () => {
      const user = {}

      const { response } = await requestPost('/api/users', user, token)

      expect(response.status).toBe(400)
      expect(response.data.errors[0].msg).toMatch('Name')
      expect(response.data.errors[0].param).toMatch('name')
      expect(response.data.errors[0].location).toMatch('body')
      expect(response.data.errors[1].msg).toMatch('Direction is required')
      expect(response.data.errors[1].param).toMatch('direction')
      expect(response.data.errors[1].location).toMatch('body')
      expect(response.data.errors[2].msg).toMatch('Edad is required')
      expect(response.data.errors[2].param).toMatch('edad')
      expect(response.data.errors[2].location).toMatch('body')
      expect(response.data.errors[3].msg).toMatch('Phone is required')
      expect(response.data.errors[3].param).toMatch('phone')
      expect(response.data.errors[3].location).toMatch('body')
      expect(response.data.errors[4].msg).toMatch('Username is required')
      expect(response.data.errors[4].param).toMatch('username')
      expect(response.data.errors[4].location).toMatch('body')
      expect(response.data.errors[5].msg).toMatch('Password is required')
      expect(response.data.errors[5].param).toMatch('password')
      expect(response.data.errors[5].location).toMatch('body')
    })
  })
})
