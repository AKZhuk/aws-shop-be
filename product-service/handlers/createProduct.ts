import { APIGatewayEvent } from 'aws-lambda';
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { headers } from '../constants';
import HttpStatusCode from '../types/HttpStatusCode';
import { isValidProduct } from '../helpers/isValidProduct';

export const createProduct = async (event: APIGatewayEvent) => {
  const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
  const ddb = new AWS.DynamoDB.DocumentClient();
  const data = JSON.parse(event.body!)
  console.log('data', data);




  if (!isValidProduct(data)) {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST,
      headers,
      body: 'Invalid payload data',
    };
  }

  const id = uuidv4();
  const { title, description, price, count } = data
  try {
    const newProduct = {
      id,
      title,
      description,
      price
    };

    const productStock = {
      product_id: id,
      count
    }
    const [productsResult, stocksResult] = await Promise.all([
      ddb
        .put({
          TableName: PRODUCTS_TABLE!,
          Item: newProduct,
        })
        .promise(),
      ddb
        .put({
          TableName: STOCKS_TABLE!,
          Item: productStock,
        })
        .promise(),
    ]);
    console.log('productsResult, stocksResult', productsResult, stocksResult);

    return {
      statusCode: HttpStatusCode.CREATED,
      headers,
      body: `Product with id ${id} successfully created`,
    };
  } catch (error) {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      headers,
      body: JSON.stringify(error),
    };
  }
};
