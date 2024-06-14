const {products} = require('../data');

exports.getProducts = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({data: products}),
  };
};
