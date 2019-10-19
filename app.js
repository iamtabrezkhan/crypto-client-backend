const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let port = process.env.PORT || 3000;
const superagent = require('superagent');
const config = require('./config');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// root
app.get('/', (req, res, next) => {
    res.send('Hello World');
})

// get latest listings
app.post('/listings/latest', (req, res, next) => {
    let url = config.urls.latestListings;
    let start = req.body.start;
    let limit = req.body.limit;
    superagent
    .get(`${url}?start=${start}&limit=${limit}`)
    .set('X-CMC_PRO_API_KEY', config.apiKey)
    .end((err, resp) => {
        // Calling the end function will send the request
        if(err) {
            return res.json({
                status: err.status,
                success: false,
                error_message: resp.body.status.error_message
            })
        };
        return res.json({
            success: true,
            data: resp.body
        })
    });
})

app.listen(port, () => {
    console.log(`Server listening at post ${port}`);
})