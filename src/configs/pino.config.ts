import pino from 'pino';
import { Params } from 'nestjs-pino';
import { NodeEnv } from '../lib/enums/appconfig';
import pretty from 'pino-pretty';

export default function getPinoConfig(): Params {
  const nodeEnv = process.env.NODE_ENV;
  let pinoHttp;
  if (!nodeEnv || nodeEnv === NodeEnv.DEV) {
    pinoHttp = pretty({
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:standard',
    });
  } else if (nodeEnv === NodeEnv.PROD) {
    pinoHttp = {
      stream: pino.destination({
        dest: './logs/main.log', // omit for stdout
        sync: false,
        mkdir: true,
      }),
    };
  }
  return {
    pinoHttp,
  };
}
