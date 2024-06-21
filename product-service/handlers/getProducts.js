const {products} = require('../data');

module.exports.getProducts = async (event) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
