import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import ddb from "../config/dynamoClient.js"; // ✅ fixed import path
import dotenv from "dotenv";

dotenv.config();

const USERS_TABLE = process.env.DYNAMO_TABLE_USERS || "VLAAS_Users";

/**
 * ✅ Get a user by their ID (primary key)
 */
export const getUserById = async (id) => {
  try {
    const res = await ddb.send(
      new GetCommand({
        TableName: USERS_TABLE,
        Key: { id },
      })
    );
    return res.Item || null;
  } catch (err) {
    console.error("❌ Error in getUserById:", err);
    throw err;
  }
};

/**
 * ✅ Get a user by email (non-key attribute, so use scan)
 */
export const getUserByEmail = async (email) => {
  try {
    const result = await ddb.send(
      new ScanCommand({
        TableName: USERS_TABLE,
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
    );
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  } catch (err) {
    console.error("❌ Error in getUserByEmail:", err);
    throw err;
  }
};

/**
 * ✅ Create or update a user in DynamoDB
 */
export const createOrUpdateUser = async (user) => {
  try {
    const now = new Date().toISOString();

    const item = {
      id: user.id || crypto.randomUUID(), // ensure a primary key exists
      email: user.email,
      name: user.name,
      googleId: user.googleId,
      role: user.role || "student",
      provider: user.provider || "google",
      updatedAt: now,
      createdAt: user.createdAt || now,
    };

    await ddb.send(
      new PutCommand({
        TableName: USERS_TABLE,
        Item: item,
      })
    );

    return item;
  } catch (err) {
    console.error("❌ Error in createOrUpdateUser:", err);
    throw err;
  }
};

/**
 * ✅ Default export (so that `import User from ...` doesn't break)
 */
const UserModel = {
  getUserById,
  getUserByEmail,
  createOrUpdateUser,
};

export default UserModel;
