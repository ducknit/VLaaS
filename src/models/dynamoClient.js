import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

dotenv.config();

// DynamoDB client configuration
const REGION = process.env.AWS_REGION || "ap-south-1";

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: fromEnv(), // Loads from environment variables
});

const marshallOptions = {
  convertEmptyValues: true, // Automatically convert empty strings, sets, and lists to null
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

export default ddbDocClient;
