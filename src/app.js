const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');
const enumsRouter = require('./routes/enums');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDatabase = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);
app.use('/api/enums', enumsRouter);

const requireAdmin = (req, res, next) => {
  const adminCookie = req.cookies && req.cookies.admin_access;
  if (adminCookie === 'granted') return next();
  return res.redirect('/admin');
};

app.get('/admin', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Admin Gate</title></head>
<body>
<script>
  const pass = prompt('Enter admin pass:');
  if (!pass) { window.location = '/'; }
  else {
    fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pass }) })
      .then(r => r.ok ? window.location = '/admin/app/' : alert('Invalid pass'))
      .catch(() => alert('Login failed'))
  }
</script>
</body></html>`);
});

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/api/admin/login', (req, res) => {
  const input = (req.body && req.body.pass) || '';
  const expected = process.env.ADMIN_PASS || '';
  if (expected && input === expected) {
    res.cookie('admin_access', 'granted', { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 8 });
    return res.status(204).end();
  }
  return res.status(401).json({ error: 'Unauthorized' });
});

app.use('/admin/app', requireAdmin, express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.path} not found` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const startServer = async () => {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

