const express = require('express');
const gqHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 3000;


app.use('/graphql', gqHTTP({
    schema,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send(`<html><h1>EXPRESS IS SERVING...</h1></html>`)
})

app.listen(3000);
console.log(`Listening to port ${PORT}...`);