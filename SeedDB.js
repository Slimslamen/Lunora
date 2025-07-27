// seed.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// 1️⃣ Configure your client
const client = new DynamoDBClient({ region: "eu-north-1" }); // adjust region
const docClient = DynamoDBDocumentClient.from(client);

// 2️⃣ Load your JSON file
const TABLE_NAME = "PeriodFacts-7ocohz3ifzazzafod6nvdzypai-NONE";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const filePath = join(__dirname, "JSON/period_facts.json");
const items = JSON.parse(readFileSync(filePath, "utf8"));

// 3️⃣ Stamp each item with createdAt/updatedAt timestamps
let time = Date.now();
const seededItems = items.map((item) => {
  const ts = new Date(time).toISOString();
  time += 1000; // increment by 1 second for uniqueness
  return {
    ...item,
    createdAt: ts,
    updatedAt: ts,
  };
});

// 4️⃣ Helper to chunk an array into batches of N
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function seedTable() {
  const batches = chunkArray(seededItems, 25); // DynamoDB batchWrite max 25 items

  for (const [idx, batch] of batches.entries()) {
    const params = {
      RequestItems: {
        [TABLE_NAME]: batch.map((item) => ({
          PutRequest: { Item: item },
        })),
      },
    };

    try {
      const result = await docClient.send(new BatchWriteCommand(params));
      console.log(`Batch ${idx + 1}/${batches.length} written.`);
      // Handle unprocessed items if any:
      if (result.UnprocessedItems && Object.keys(result.UnprocessedItems).length) {
        console.warn("Some items were unprocessed, retrying...");
        // Optionally retry here by re-sending result.UnprocessedItems
      }
    } catch (err) {
      console.error(`Error writing batch ${idx + 1}:`, err);
    }
  }

  console.log("Seeding complete.");
}

seedTable();
