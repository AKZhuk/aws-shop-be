const {products} = require('../data');
const {getProducts} = require('../handlers/getProducts');

describe('GetProducts', () => {
  test('should return products', async () => {
    const id = '7567ec4b-b10c-48c5-9445-fc73c48a80a2';
    const event = {
      pathParameters: {
        id,
      },
    };
    const {body, ...restResponse} = await getProducts(event);
    expect(restResponse).toEqual({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
    });
    expect(body).toEqual(JSON.stringify(products));
  });
});
