'use strict';

const hbs = require('hbs');
const moment = require('moment');

function linkTag(output, url, linkText) {
    return output.replace(linkText, `<a href="${url}" target="_blank">${linkText}</a>`);
}

hbs.registerHelper('formatDate', (date) => {
    let now = moment();
    let tweetDate = moment(date);

    if (now.diff(tweetDate, 'days') < 1) {
        return tweetDate.fromNow();
    } else {
        return tweetDate.format('MMMM Do YYYY, h:mm:ss a');
    }
});

hbs.registerHelper('showLinks', (text, entities) => {
    let output = text;

    entities.urls.forEach((url) => {
        output = linkTag(output, url.expanded_url, url.url);
    });

    if (entities.media) {
        entities.media.forEach((item) => {
            output = linkTag(output, item.expanded_url, item.url);
        });
    }

    entities.user_mentions.forEach((user) => {
        output = linkTag(output, `http://twitter.com/${user.username}`, `@${user.screen_name}`);
    });

    entities.hashtags.forEach((tag) => {
        output = linkTag(output, `http://twitter.com/hashtag/${tag.text}`, `#${tag.text}`);
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

hbs.registerHelper('linkToUser', (name, username) => {
    return new hbs.SafeString(linkTag(name, `http://twitter.com/${username}`, name));
});
