const express = require('express');
const userRoute = require('./routes/user.js');
require('./database/database.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(userRoute);

app.get('/', (req, res) => {
    res.send("App setup successful");
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})