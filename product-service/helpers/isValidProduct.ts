import Ajv from 'ajv';

export const isValidProduct = (data: Object) => {
  const schema = {
    "additionalProperties": false,
    "properties": {
      "count": {
        "type": "number"
      },
      "description": {
        "type": "string"
      },
      "price": {
        "type": "number"
      },
      "title": {
        "type": "string"
      }
    },
    "required": [
      "count",
      "description",
      "price",
      "title"
    ],
    "type": "object"
  }
  const ajv = new Ajv();
  const isValidData = ajv.compile(schema);
  return isValidData(data)
}