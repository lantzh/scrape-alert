import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});
const dynamoDb = DynamoDBDocumentClient.from(client);

const saveUserData = async (userId, dataType, url, keywords, phone) => {
  const params = {
    TableName: "UserData",
    Item: {
      userId,
      dataType,
      url,
      keywords,
      phone,
      timestamp: new Date().toISOString(),
    },
  };

  const command = new PutCommand(params);
  try {
    await dynamoDb.send(command);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Export the function for use in other parts of the app
export { saveUserData };
