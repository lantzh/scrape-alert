import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const dynamoDb = DynamoDBDocumentClient.from(client);

const fetchUserData = async (userId) => {
  const params = {
    TableName: "UserData",
    Key: {
      userId,
      dataType: "USER_DATA",
    },
    ProjectionExpression: "#u, keywords",
    ExpressionAttributeNames: {
      "#u": "url",
    },
  };

  try {
    const { Item } = await dynamoDb.send(new GetCommand(params));
    return Item ? { url: Item.url, keywords: Item.keywords } : null;
  } catch (error) {
    console.error("Error fetching url:", error);
    throw error;
  }
};

export { fetchUserData };
