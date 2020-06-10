#!/bin/bash
indexfile=""
rm ./Build -vr
if [ ! -d ./Build ]; then mkdir Build; fi;
rsync -av --exclude '.git' --exclude 'Jenkins-setup' . ./Build
mv ./Build/js_calculator.html ./Build/index.html

