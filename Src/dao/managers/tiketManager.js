import tiketModel from '../models/tiketModel.js'
export default class TiketManager{


    getTiket=(params,data)=>{
        return tiketModel.findOne({[params]: data})
    }

    createTiket=(tiket)=>{
        return tiketModel.create(tiket)
    }
    deleteTiket=(tid)=>{
        return tiketModel.findByIdAndDelete(tid)
    }
   
}