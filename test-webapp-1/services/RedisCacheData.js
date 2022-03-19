import redis from 'redis';
// import bluebird from 'bluebird'


class RedisCacheData {
    myCache;
    constructor() {
        // 'createClient()' usually takes an URL connection path, or the path of a host to connect to.
        // In our case use the name of the service from 'docker-compose.yml', 'test-redis'.
        // Redis server itself usually runs on Port '6379'
        // bluebird.promisifyAll(redis)
        this.myCache = redis.createClient({
            host: 'test-redis',
            port: 6379
        });
        return this.myCache;
    }

    //key is string. returns either whatever value was set for this key, or undefined if none was set.
    get(key){
        return this.myCache.get(key);
    }
    // set value for key
    set(key, data){
        console.log('set data');
        this.myCache.set(key, data);
    }
    //for testing purposes, returns all the cache elements as an object
    toObject(){
        // return myCache.keys();
    }
}

export { RedisCacheData }
