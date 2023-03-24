export const createSaleDto = (sale) => {
  const formattedSale = {
    idSale: sale._id.toString(),
    idUser: sale.idUser.toString()
  }

  return formattedSale
}

export const sendMailSaleDto = (products) => {
  const formattedSaleEmail = products.map(product => ({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image
  })
  )

  return formattedSaleEmail
}

export const transformStringSalesDto = (products) => {
  const changeFormatProducts = products.map(product => (JSON.stringify(product)))

  return changeFormatProducts
}
