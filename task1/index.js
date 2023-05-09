import express from 'express';
import fs from 'fs';

const rawData = fs.readFileSync('./data.json');  // read the file
const jsonData = JSON.parse(rawData);   // parse the data

const app = express();

app.get('/list-products', (req, res) => {
    res.json(jsonData);

});
app.get('/list/expensive', (req, res) => {
    // most expensive product from the list comparing the price
    const expensive = jsonData.reduce((prev, current) => {
        return (prev.price > current.price) ? prev : current
    });
    res.json(expensive);
});

app.get('/list/sum', (req, res) => {
    // sum of all the prices
    const sum = jsonData.reduce((prev, current) => {
        return prev + current.price
    }, 0);
    res.json(sum);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);