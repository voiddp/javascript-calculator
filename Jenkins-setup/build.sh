#!/bin/bash
builddir="./Build"
rm $builddir -vr
if [ ! -d ./Build ]; then mkdir Build; fi;
find . -not \( -path $builddir -prune \) -not \( -path ./Jenkins-setup -prune \) -not \( -path ./.git -prune \) #-exec cp -rv {} ./Build \;

