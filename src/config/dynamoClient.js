import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

/**
 * ✅ Create the low-level DynamoDB client
 */
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-south-1", // default region, adjust if needed
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * ✅ Create a higher-level DocumentClient
 * It automatically converts JS objects <-> DynamoDB items
 */
const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

export default ddb;
