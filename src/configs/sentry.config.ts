import * as Sentry from '@sentry/node';

export default function getSentryConfig(): Sentry.NodeOptions {
  return {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    // debug: true,
  };
}
