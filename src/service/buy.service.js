import { save, getById, list } from '../business/buy.service.js'

class BuyService {
  list = async () => {
    return await list()
  }

  getById = async (id) => {
    return await getById(id)
  }

  save = async (idCart, req) => {
    return await save(idCart, req)
  }
}

export default BuyService
