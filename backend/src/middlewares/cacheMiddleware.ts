import { Request, Response, NextFunction } from 'express';

interface Cache {
  [key: string]: any;
}

export function createCacheMiddleware() {
  const cache: Cache = {};

  // Middleware function
  const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const key = req.originalUrl;
    if (cache[key]) {
      console.log('Serving from cache:', key);
      res.json(cache[key]);
      return;
    }

    const originalJson = res.json.bind(res);
    res.json = (data: any) => {
      cache[key] = data;
      return originalJson(data);
    };

    next();
  };

  // Periodic cache clearing
  setInterval(() => {
    for (const key in cache) {
      delete cache[key];
    }
    console.log('Cache cleared');
  }, 5*60*1000);

  return cacheMiddleware;
}
