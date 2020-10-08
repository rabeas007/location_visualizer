// //server.js
// const express = require('express');
// const favicon = require('express-favicon');
// const path = require('path');
// const port = process.env.PORT || 8080;
// const app = express();
// app.use(favicon(__dirname,'..', '/build/favicon.ico'));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname,'..', 'public')));
// app.get('/ping', function (req, res) {
//     return res.send('pong');
// });
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
// });
// app.listen(port);
//
// const path = require('path');
// const express = require('express');
// const app = express();
// const publicPath = path.join(__dirname,'..', 'public');
// const port = process.env.PORT || 3000;
//
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });
// app.listen(port, () => {
//     console.log('Server is up!');
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

app.use(bodyParser.json());
app.use(cors());

// API
const users = require('../src/server/server');
app.use('../src/server/server', users);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
