import messageModel from "../models/messageModel.js"

export default class MessagesManager {

    getMessages = (params) =>{
        return messageModel.find(params).lean();        
    }

    createMessages = (message) =>{
        return messageModel.find(message);
    }
}