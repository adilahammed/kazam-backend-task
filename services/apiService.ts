import {constants} from "../constants"
export  async function fetchData(req:any,res:any,mongoCli:any,redisCli:any) {
    
        try {
            await mongoCli.connect();
            let Db=await mongoCli.db("backend_tasks")
           let result=await Db.collection('BACKEND_TASK_'+constants.NAME).find({}, { projection: { _id: 0, arrDatas: 1 }}).toArray()           
           return result
          }catch(err){
            console.log(err);
          } finally {
            // Ensures that the client will close when you finish/error
            await mongoCli.close();
          }
}