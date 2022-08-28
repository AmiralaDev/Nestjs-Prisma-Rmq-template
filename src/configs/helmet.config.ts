import { HelmetOptions } from 'helmet';

export default function getHelmetConfig(): HelmetOptions {
  return {
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true,
  };
}
