import ticketModel from "../models/ticketModel.js"
export default class TiketManager{

    getTiket=(tid)=>{
        return ticketModel.findById(tid)
    }
    createTiket=(tiket)=>{
        return ticketModel.create(tiket)
    }
    deleteTiket=(tid)=>{
        return ticketModel.findByIdAndDelete(tid)
    }

}