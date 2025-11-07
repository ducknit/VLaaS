import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initialize AWS DynamoDB client
 */
export const connectDB = async () => {
  try {
    const REGION = process.env.AWS_REGION || "us-east-1";

    const client = new DynamoDBClient({
      region: REGION,
      credentials: fromEnv(), // reads AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from env
    });

    const ddbDocClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
      unmarshallOptions: {
        wrapNumbers: false,
      },
    });

    console.log("✅ Connected to DynamoDB");
    return ddbDocClient;
  } catch (err) {
    console.error("❌ DynamoDB Connection Error:", err);
    throw err;
  }
};
