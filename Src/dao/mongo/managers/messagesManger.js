import messageModel from "../models/messages.js";

export default class MessagesManager {

    getMessages = (params) =>{
        return messageModel.find(params).lean();        
    }

    createMessages = (message) =>{
        return messageModel.find(message);
    }
}