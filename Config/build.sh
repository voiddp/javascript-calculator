#!/bin/bash
case ${1} in
	files)
		if [ ! -d ./Build ] 
		then 
			rm ./Build -vr
			mkdir Build 
		fi
		rsync -av --exclude 'Build' --exclude '.git' --exclude 'Config' . ./Build
		mv ./Build/js_calculator.html ./Build/index.html
	;;
	build) #parameters should be 1=build 2=Repository:Tag 3=Dockerfile 4=context
		docker build -t "${2}" -f ${3} ${4}
	;;
	clearup) #clearing up all images and containers parameters: 1=clearup 2=Repository 3=ContainerName
		for image in $(docker images -aq "${2}:*")
		do 
			docker rmi -f ${image}
		done
		if [$# -eq 3] 
		then
			for container in $(docker ps -aq --filter "name=$3")
			do 
				docker stop ${container} && docker rm -fv ${container}
			done
		fi
	;;
	*) if #if nothing from above - error
		exit 1
	;;

