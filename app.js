'use strict';

const express = require('express');
const app = express();

const config = require('./config');
const path = require('path');

app.set('port', config.get('PORT'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/static', express.static('public'));
app.use('/', require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server is listening to port ' + app.get('port'));
});
