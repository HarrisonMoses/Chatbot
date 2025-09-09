import  z  from "zod";
import bot from "../services/service.js";


const messageSchema = z.object({
  msg: z.string().trim().min(1, { message: "Message is required" }),
  conversationId: z.string({ message: "Invalid conversation ID" }).trim().min(1, { message: "Conversation ID is required" }),
});

const chatController = {
  async sendMessage(req, res) {
    const validation = messageSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ error: validation.error.issues.map((e) => e.message).join(", ") });
    }

    const { msg, conversationId } = validation.data;

    const response = await bot(msg, conversationId);
    res.json({ response: response });

  },
};

export default chatController;
