import { type Request, type Response, type NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodTypeAny) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          // Use .issues instead of .errors to satisfy the TS compiler
          errors: error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      
      return res.status(500).json({ 
        status: 'error', 
        message: 'Internal Server Error' 
      });
    }
};