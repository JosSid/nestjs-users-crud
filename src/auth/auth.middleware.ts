import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('headerapikey', (value) => {
      if (value) {
        next();
      } else {
        throw new UnauthorizedException();
      }
    })(req, res, next);
  }
}
