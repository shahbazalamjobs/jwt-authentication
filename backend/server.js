// backend/server.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Hello world")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
