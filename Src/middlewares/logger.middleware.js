import LoggerServices from '../services/logger.service.js'
import config from '../config.js'

const logger=new LoggerServices(config.mode.mode)

const attachLogger=(req,res,next)=>{
 req.logger=logger.logger
    next()
}
export default attachLogger