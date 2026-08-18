require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const orderRoutes = require('./routes/orderRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const financeRoutes = require('./routes/financeRoutes');
const riskRoutes = require('./routes/riskRoutes');
const operationsRoutes = require('./routes/operationsRoutes');
const staffRoutes = require('./routes/staffRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cycleCountRoutes = require('./routes/cycleCountRoutes');
const eventRoutes = require('./routes/eventRoutes');
const auditRoutes = require('./routes/auditRoutes');
const bulkRoutes = require('./routes/bulkRoutes');
const reportRoutes = require('./routes/reportRoutes');

const intelligenceRoutes = require('./routes/intelligenceRoutes');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Enable CORS for all local development origins (localhost:3000, localhost:5173, etc.)
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'INVINTELL Backend Service',
    dataset: 'retail_store_inventory.csv',
    timestamp: new Date().toISOString()
  });
});

// Primary API Routes
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/warehouses', storeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderRoutes);
app.use('/api/forecasts', forecastRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/risks', riskRoutes);
app.use('/api/intelligence', intelligenceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cycle-counts', cycleCountRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/bulk', bulkRoutes);
app.use('/api/reports', reportRoutes);

// Operations API Routes
app.use('/api', operationsRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`⚡ INVINTELL Backend running on port ${portToTry} with universal CORS support.`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${portToTry} is occupied. Retrying on port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('❌ Server Listen Error:', err);
    }
  });
}

startServer(PORT);
