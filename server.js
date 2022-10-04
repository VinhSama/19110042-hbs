const express = require('express');
const server = express();

server.set('view engine', 'hbs');
server.use(express.urlencoded({extended: true}));
server.use('/', require('./routes/postRoute'));
server.all('*', (request, response) => {
    console.log(`'${request.method}' | http://localhost:5000${request.url}`);
    response.render('404');
});

server.listen(5000, () => console.log('Server is listening at 5000'));