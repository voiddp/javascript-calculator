#!/bin/bash
indexfile=""
if [ ! -d ./Build ] 
	then rm ./Build -vr
	mkdir Build 
fi
rsync -av --exclude 'Build' --exclude '.git' --exclude 'Config' . ./Build
mv ./Build/js_calculator.html ./Build/index.html

