import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import fixturesHandler from './api/fixtures.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve API routes FIRST
  app.get('/api/fixtures', async (req, res) => {
    try {
      await fixturesHandler(req, res);
    } catch (err) {
      console.error('[Server] Express route error on /api/fixtures:', err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    }
  });

  // Serve static assets from public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Alt Ligler server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
