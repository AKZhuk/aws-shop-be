import { DynamoDB } from 'aws-sdk';
import HttpStatusCode from '../types/HttpStatusCode';
import { headers } from '../constants';

const ddb = new DynamoDB.DocumentClient();

export const getProducts = async (event: any) => {

  const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;
  console.log('event', event);

  try {
  const [productsResult, stocksResult] = await Promise.all([
    ddb.scan({ TableName: PRODUCTS_TABLE! }).promise(),
    ddb.scan({ TableName: STOCKS_TABLE! }).promise(),
  ]);
  const products = productsResult.Items?.map(item => {
    return {
      ...item,
      count: stocksResult.Items?.find(el => el.product_id === item.id)?.count
    }
  })

  return {
    headers,
    statusCode: HttpStatusCode.OK,
    body: JSON.stringify(products),
  };
  } catch (error) {
    return {
      headers,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(error)
    };
  }
};
