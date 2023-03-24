import axios from 'axios'

const baseUrl = 'http://localhost:8080'

export async function requestGet (path, params = '', token = '') {
  try {
    const config = { headers: { Authorization: `${token}` } }
    const { data } = await axios.get(`${baseUrl}${path}`, config)

    return data
  } catch (err) {
    return err
  }
}

export async function requestPost (path, body = '', token = '') {
  try {
    const url = `${baseUrl}${path}`
    const dataBody = body

    const config = { headers: { Authorization: `${token}` } }
    const { data } = await axios.post(url, dataBody, config)

    return data
  } catch (err) {
    return err
  }
}
