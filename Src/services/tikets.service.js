
export default class TiketServices{
    constructor(dao){
        this.dao= dao
    }

    getTiket=(params,data)=>{
        return this.dao.getTiket(params,data)
    }


    createTiket=(tiket)=>{
        return this.dao.createTiket(tiket)
    }

    deleteTiket=(tid)=>{
        return this.dao.deleteTiket(tid)
    }

   

}