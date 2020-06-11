#!/bin/bash
case ${1} in
	#rsync files 1=copy 2=user 3=server 4=SourceFolder
	copy)
		rsync -e "ssh -o StrictHostKeyChecking=no" -av ${4} ${2}@${3}:/home/${2}
	;;
	# 1=compose 2=repository:build
	deploy)
		#check if docker, docker-compose are installed
		if ! command -v docker >/dev/null 2>&1
		then
			echo "#####Updating, and instaling docker:"
			sudo yum update -y
			sudo yum install docker -y
			sudo service docker start
			sudo chkconfig docker on 
			sudo usermod -aG docker $USER
		fi
		if ! command -v docker-compose >/dev/null 2>&1
		then
			echo "#####instaling docker-compose"
			sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
			sudo chmod +x /usr/local/bin/docker-compose
		fi
		#checking build.latest file, and removing previous build if exist
		if [ ! -f build.latest ] || build=$(cat build.latest) docker-compose down --rmi all
		build="${2}" docker-compose up -d
		echo ${2} > build.latest
	;;
	*)
	exit 1
	;;
esac