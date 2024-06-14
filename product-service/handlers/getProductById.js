const {products} = require('../data');

module.exports.getProductById = async (event) => {
  const {id} = event.pathParameters;
  const product = products.find((product) => product.id === id);
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  if (!product) {
    return {
      headers,
      statusCode: 404,
      body: 'Product not found',
    };
  }

  const response = {
    headers,
    statusCode: 200,
    body: JSON.stringify(product),
  };
  return response;
};
