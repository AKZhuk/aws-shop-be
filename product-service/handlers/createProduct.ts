import { APIGatewayEvent } from 'aws-lambda';
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { headers } from '../constants';
import HttpStatusCode from '../types/HttpStatusCode';

export const createProduct = async (event: APIGatewayEvent) => {
  const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
  const ddb = new AWS.DynamoDB.DocumentClient();
  const id = uuidv4();

  try {
    const newProduct = {
      id,
      title: event.body.title,
      description: event.body.description,
      price: event.body.price
    };

    const productStock = {
      product_id: id,
      count: event.body.count
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
    return {
      statusCode: HttpStatusCode.CREATED,
      headers,
      body: `Product with id ${id} successfully created`,
    };
  } catch (error) {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST,
      headers,
      body: JSON.stringify(error),
    };
  }
};
