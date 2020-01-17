const mongoose = require('mongoose');
const databaseName = "Authentication-node"

mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log(`Connected to the database ${databaseName}`)
}).catch((error) => {
    console.log("Not able to connect to the database")
})