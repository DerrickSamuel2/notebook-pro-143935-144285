'use strict';

/**
 * Development-only proxy/middleware configuration for Create React App.
 *
 * CRA will load this file automatically in development. We use it to provide a
 * deterministic healthcheck endpoint so container preview/readiness probes can
 * reliably determine when the dev server is ready.
 *
 * Note: This does not affect production builds.
 */
module.exports = function setupProxy(app) {
  const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz';

  // Provide a minimal health endpoint expected by the container environment.
  app.get(healthPath, (_req, res) => {
    res.status(200).type('text/plain').send('ok');
  });

  // Also provide a conventional fallback endpoint.
  app.get('/health', (_req, res) => {
    res.status(200).type('text/plain').send('ok');
  });
};
