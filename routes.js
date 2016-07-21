'use strict';

const express = require('express');
const router = express.Router();

const index = require('./controllers/index');
const images = require('./controllers/images');

const routes = [
    {
        path: '/',
        handler: index.showFeed
    },
    {
        path: '/images',
        handler: images.showImages
    },
    {
        path: '/filter',
        handler: index.fetch
    }
];

routes.forEach((route) => {
    router.get(route.path, (req, res) => {
        route.handler(req, res);
    });
});

module.exports = router;
