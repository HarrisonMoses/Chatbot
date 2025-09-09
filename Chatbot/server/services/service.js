import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);
const conversation = new Map();

const bot = async (msg, conversationId) => {
    try {
    const response = await client.chatCompletion({
      provider: "together",
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "user", content: msg }
      ],
      temperature: 0.2,
      max_tokens: 100,
      previous_response_id: conversation.get(conversationId),
    });

      conversation.set(conversationId, response.id);

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Internal server error");
  }
};
export  default bot;