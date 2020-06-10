#!/bin/bash
echo "deploying docker image $2:$3 into container $1"
#removing previous containters
if docker ps -aq --filter "name=$1"
then 
	docker stop $1 && docker rm -fv $1
fi
#removing previous images
if docker images -aq "$2:*"
then
	docker rmi -f "$2:*"
fi
docker run -d -p 80:80/tcp --name $1 $2:$3