
import {plainToClass} from 'class-transformer';
import {validate,ValidationError} from 'class-validator';    
import {RequestHandler} from 'express';
import HttpException from '../Exceptions/HttpException';


function validationMiddleware<T>(type: any, skipMissingProperties = false):RequestHandler {
    return (req, res, next) => {
      validate(plainToClass(type, req.body), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: any) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message));
          } else {
            next();
          }
        });
    };
  }


export default validationMiddleware;