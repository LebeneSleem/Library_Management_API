require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bookRoutes = require('./routes/bookRoutes');
const { connectDB } = require('./config/db');
const { syncDB } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to Database
connectDB();

// Sync Database
syncDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Library Management API");
});

// API Routes
app.use('/api/v1/books', bookRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 2013;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
