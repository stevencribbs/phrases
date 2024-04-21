import { Request, Response } from 'express';

export interface PhrasesContext {
  req: Request;
  res: Response;
}
