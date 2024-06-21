const {getProductById} = require('../handlers/getProductById');

describe('GetProductById', () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  test('should return product if it exist', async () => {
    const id = '7567ec4b-b10c-48c5-9445-fc73c48a80a2';
    const event = {
      pathParameters: {
        id,
      },
    };
    const response = await getProductById(event);
    expect(response).toEqual({
      body: '{"description":"Short Product Descriptio1","id":"7567ec4b-b10c-48c5-9445-fc73c48a80a2","price":23,"title":"Product2"}',
      headers,
      statusCode: 200,
    });
  });

  test('should return product not found message if product does not exist', async () => {
    const id = 'wrong id';
    const event = {
      pathParameters: {
        id,
      },
    };
    const response = await getProductById(event);
    expect(response).toEqual({
      headers,
      body: 'Product not found',
      statusCode: 404,
    });
  });
});
