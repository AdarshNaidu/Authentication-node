const express = require('express');
const userRoute = require('./routes/user.js');
const path = require('path');
require('./database/database.js');

const viewsPath = path.join(__dirname, './views')

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.json());
app.use(userRoute);

app.get('/', (req, res) => {
    res.send("App setup successful");
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})