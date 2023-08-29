const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

const user = require('./routes/userRoutes');
const product = require('./routes/productRoutes');

app.use('/api/v1',user)
app.use('/api/v1',product)



module.exports = app