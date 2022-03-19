
# Node.js and Redis
nodejs webapp(with auto restart) with redis database for cache

Infrastructure(basically what we have in the docker-compose.yml)
1. webapp NodeJS container
2. redis container


## webapp node packages in use 
1. express - web framework  
2. node-fetch - provides an interface for fetching resources
3. nodemon - automatically restarting the node application when file changes in the directory are detected(installed globally)
> use:
> docker-compose.yml
>>volumes:
>>./:/usr/src/app  
>> ...  
>> command: nodemon -e js,json server.js
> 
> Dockerfile  
>> WORKDIR /usr/src/app/test-webapp  
>> ...  
>> RUN npm install -g nodemon  
>> 
4. redis - in-memory data structure store
5. promisify - convert a method that returns responses using a callback function to return responses in a promise object  
> use:
>> const redisClient = require('redis').createClient();  
>> const get = promisify(redisClient.get).bind(redisClient);  
>> const set = promisify(redisClient.set).bind(redisClient);  

## docker commands in use
###### clear all Docker images and containers and start with a clean slate
> **docker system prune -a**
###### build containers
> **docker-compose -f docker-compose.yml build**
>  
> remember we are using multiple containers, in single container world we will use:  
>> docker build -t <your-image-name> .  
>> docker run --rm -d  -p 3000:9229  image:tag  
>> -d(detached mode, you can use the same terminal to execute other commands), -p(port) external:internal
###### check built images
> **docker images**
###### run application
> **docker-compose -f docker-compose.yml up**
###### check running containers
> **docker ps**
###### enter redis container -it(connect to a running container)
> **docker exec -it 061caad73f1b sh**

## play inside redis container
/data # redis-cli                                                                                                                                                     
127.0.0.1:6379> get numVisits                                                                                                                                      
"8"                                                                                                                                                                    
127.0.0.1:6379> set numVisits 911  

## play inside webapp container
**docker exec -it 3d1668ab1896 sh**
###### show all process id’s using 
**ps -al**
###### kill process for testing restart
/usr/src/app # kill -9 18



ref: [https://dev.to/marcelkatz/nodejs-and-redis-deployed-in-docker-containers-using-docker-compose-then-load-balancing-the-nodejs-servers-with-nginx-4omc]
