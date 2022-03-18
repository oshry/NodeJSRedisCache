
#Node.js and Redis
nodejs webapp(with auto restart) with redis database for cache
###### clear all Docker images and containers and start with a clean slate
**docker system prune -a**
###### build containers
**docker-compose -f docker-compose.yml build**
###### check built images
**docker images**
###### run application
**docker-compose -f docker-compose.yml up**
###### check running containers
**docker ps**
###### enter redis container -it(connect to a running container)
**docker exec -it 061caad73f1b sh**
###### play inside redis container
/data # redis-cli                                                                                                                                                     
127.0.0.1:6379> get numVisits                                                                                                                                      
"8"                                                                                                                                                                    
127.0.0.1:6379> set numVisits 911  

###### enter webapp container
**docker exec -it 3d1668ab1896 sh**
###### show all process id’s using 
**ps -al**
###### kill process for testing restart
/usr/src/app # kill -9 18
