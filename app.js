'use strict';

const express = require('express');
const app = express();

const config = require('./config');
const path = require('path');
const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('formatDate', (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

app.set('port', config.get('PORT'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use('/static', express.static('public'));
app.use('/', require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server is listening to port ' + app.get('port'));
});
