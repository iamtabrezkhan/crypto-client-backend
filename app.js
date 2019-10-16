const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// root
app.get('/', (req, res, next) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server listening at post ${port}`);
})