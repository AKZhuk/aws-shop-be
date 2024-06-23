import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import HttpStatusCode from "../types/HttpStatusCode";
import { headers } from "../constants";

const ddb = new DynamoDB.DocumentClient();

export const getProductById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('event', event);
  const { id } = event.pathParameters;

  const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
  try {
    const [productResult, stockResult] = await Promise.all([
      ddb.get({
        TableName: PRODUCTS_TABLE!, Key: {
          id
        },
      }).promise(),
      ddb.get({
        TableName: STOCKS_TABLE!, Key: {
          product_id: id
        },
      }).promise()
    ]);

    if (!productResult.Item || !stockResult.Item) {
      return {
        headers,
        statusCode: HttpStatusCode.NOT_FOUND,
        body: 'Product not found',
      };
    }
    const product = {
      ...productResult.Item,
      count: stockResult.Item.count
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      headers,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(error)
    };
  }
};
