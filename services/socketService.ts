import {constants} from "../constants"

async function saveToDb(mongoCli:any,data:Array<String>) {
    try {
        await mongoCli.connect();
        let Db=await mongoCli.db("backend_tasks")
        let objData={arrDatas:data}
        let result=await Db.collection('BACKEND_TASK_'+constants.NAME).insertOne(objData)
        console.log(result);
    } catch (error) {
        console.log(error);
    }finally{
        await mongoCli.close();
    }
}
export async function addTolist(data:any,mongoCli:any,redisCli:any) {
    try {
        await redisCli.connect()
        
        let arrData:any=[data]
        let arrRedisData:any=[]
        let strExistingData=await redisCli.get('BACKEND_TASK_'+constants.NAME)
        if (strExistingData) {            
            arrRedisData=JSON.parse(strExistingData);
        }
        arrRedisData=[...arrRedisData,...arrData]
        console.log(arrRedisData.length);
        
        if (arrRedisData.length<10) {
            await redisCli.set('BACKEND_TASK_'+constants.NAME,JSON.stringify(arrRedisData));
        }else{
            await redisCli.del('BACKEND_TASK_'+constants.NAME);
            saveToDb(mongoCli,arrRedisData)
            console.log("============================================================== LIMTED REACHED==============================================================");
        }
    } catch (error) {
        console.log(error);
        
    }finally{
        await redisCli.disconnect()
        console.log("_________ redis closed _____________");
    }
}