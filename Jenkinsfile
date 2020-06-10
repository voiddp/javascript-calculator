pipeline {
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/voiddp/javascript-calculator.git'
      }
    }
    stage('listing files') {
      steps {
          sh "ls -r"
      }
    }
  }
}
