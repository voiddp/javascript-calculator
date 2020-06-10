#!/bin/bash
rm ./Build -vr
if [ ! -d ./Build ]; then mkdir Build; fi;
rsync -av --exclude '.git' --exclude 'Jenkins-setup' . ./Build

