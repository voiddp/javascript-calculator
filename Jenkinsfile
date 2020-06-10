pipeline {
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/voiddp/javascript-calculator.git'
      }
    }
    stage('Files in Build') {
      steps {
          sh '''#!/bin/bash
             if [ ! -d ./Build ]; then mkdir Build; fi;
             ls | grep -v 'Docker\\|Jenkins' | cp ./Build/
             mv ./Build/js_calculator.html ./Build/index.html
             '''
      }
    }
  }
}
