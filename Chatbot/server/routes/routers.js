import express from "express";
import chatController from "../controllers/chatController.js";

const route = express.Router();

route.post("/api/message", chatController.sendMessage);

export default route;
