import { requestPost } from '../helpers/axios.js'

describe('Should POST /users/login', () => {
  it('Return status 200 and token JWT', async () => {
    const user = {
      username: 'admin@admin.com',
      password: 'adminadmin'
    }

    const response = await requestPost('/api/users/login', user)

    expect(response.error).toBe(false)
    expect(response.status).toBe(200)
  })

  it('Return status 400 and Error message Login', async () => {
    const user = {
      username: 'admin@admin.com',
      password: 'adminadmin111'
    }

    const { response } = await requestPost('/api/users/login', user)

    expect(response.data.error).toBe(true)
    expect(response.data.status).toBe(400)
    expect(response.data.body).toMatch('User or Password')
  })

  it('Return status 400 BadRequest', async () => {
    const user = {
      username: 'admin@admin.com'
    }

    const { response } = await requestPost('/api/users/login', user)
    expect(response.status).toBe(400)
  })

  it('Return status 400 BadRequest', async () => {
    const user = {
      password: 'adminadmin'
    }

    const { response } = await requestPost('/api/users/login', user)
    expect(response.status).toBe(400)
  })
})
