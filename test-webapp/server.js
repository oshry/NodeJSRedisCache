import express from 'express';
import fetch from 'node-fetch';
import { promisify } from 'util'
import { RedisCacheData } from './services/RedisCacheData.js'

const app = express();
let redisClient = new RedisCacheData();

const get = promisify(redisClient.get).bind(redisClient);
const set = promisify(redisClient.set).bind(redisClient);

// retrieve some data from an API
async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let  data = await response.json();

    return data;
}

// GET route
app.get('/', (req, res) => {
    let numVisitsToDisplay
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
        res.send('Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

app.get('/posts', async (req, res) => {
    try {
        // try to get the posts from the cache
        let posts = await get('allPosts');
        // if posts does not exist in the cache, retrieve it from the
        // original source and store it in the cache
        if (posts === "") {
            // not in cache
            posts = await getPosts();
            // time-to-live is set to 300 seconds. After this period
            // the entry for `allPosts` will be removed from the cache
            // and the next request will hit the API again
            set('allPosts', JSON.stringify(posts));
        }

        res.status(200).send(JSON.parse(posts));
    } catch (err) {
        // console.log(err);
        res.sendStatus(500);
    }
});

// Listen on Port 5000 in Docker Container (mapped to Local Machine Port 80)
app.listen(5000, function() {
    console.log('Web app is listening on port 5000');
});
