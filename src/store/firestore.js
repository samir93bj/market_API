import admin from 'firebase-admin'
import connectionData from '../db/db.config.js'
import error from '../utils/error.js'

const serviceAccount = connectionData.connection_firebase.data

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://marketapi-f8278.firebaseio.com'
})

class Store {
  constructor (collection = 'Productos') {
    this.db = admin.firestore()
    this.collection = collection
  }

  async save (newItem) {
    try {
      const collection = this.db.collection(this.collection)
      const doc = collection.doc()
      const itemSave = await doc.create(newItem)

      return itemSave
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }
}

export default Store
