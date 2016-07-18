'use strict';

const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('formatDate', (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

hbs.registerHelper('showLinks', (text, entities) => {
    let output = text;

    entities.urls.forEach((url) => {
        output = output.replace(url.url, `<a href="${url.expanded_url}" target="_blank">${url.url}</a>`);
    });

    if (entities.media) {
        entities.media.forEach((item) => {
            output = output.replace(item.url, `<a href="${item.expanded_url}" target="_blank">${item.url}</a>`);
        });
    }

    entities.user_mentions.forEach((user) => {
        output = output.replace(user.screen_name, `<a href="http://twitter.com/${user.screen_name}" target="_blank">${user.screen_name}</a>`);
    });

    entities.hashtags.forEach((tag) => {
        output = output.replace(`#${tag.text}`, `<a href="http://twitter.com/hashtag/${tag.text}" target="_blank">#${tag.text}</a>`);
    });

    return new hbs.SafeString(output);
});

hbs.registerHelper('showImg', (entities) => {
    let output = '';

    if (entities.media) {
        entities.media.forEach((item) => {
            if (item.type === 'photo') {
                output += `<a href="${item.media_url}" target="_blank"><img src="${item.media_url}" class="image"></a>`;
            }
        });
    }

    return new hbs.SafeString(output);
});
