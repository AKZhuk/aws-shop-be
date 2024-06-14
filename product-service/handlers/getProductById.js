const {products} = require('../data');

exports.getProductById = async (event) => {
  const {id} = event.pathParameters;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return {
      statusCode: 404,
      body: 'Product not found',
    };
  }

  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(product),
  };
  return response;
};
