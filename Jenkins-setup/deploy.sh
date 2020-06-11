#!/bin/bash
echo "deploying docker image $2:$3 into container $1"
#removing previous containters
for container in docker ps -aq --filter "name=$1"
do 
	docker stop ${container} && docker rm -fv ${container}
done
#removing previous images
for image in docker images -aq "$2:*"
do
	docker rmi -f ${image}
done
docker run -d -p 80:80/tcp --name $1 $2:$3