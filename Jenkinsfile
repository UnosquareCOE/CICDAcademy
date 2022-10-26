#!groovy?
 
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                dir('your-sub-directory') {
                    sh "pwd"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
