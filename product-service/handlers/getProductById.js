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
    statusCode: 200,
    body: JSON.stringify({data: product}),
  };
  return response;
};
