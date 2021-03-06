  import {cleanEnv,port,str} from 'envalid'

  const ValidateEnv = ()=>{
        cleanEnv(process.env,{
            Secret:str(),
            PORT:port(),
            MONGO_USER:str(),
            MONGO_PASSWORD:str(),
            MONGO_PATH:str()
        });
  }

  export default ValidateEnv;