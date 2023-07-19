import TiketManager from '../dao/managers/tiketManager.js'


export default class TiketServices{
    constructor(dao){
        this.dao= dao
    }

    getTiket=(tid)=>{
        return this.dao.getTiket(tid)
    }

    createTiket=(tiket)=>{
        return this.dao.createTiket(tiket)
    }

    deleteTiket=(tid)=>{
        return this.dao.deleteTiket(tid)
    }


}