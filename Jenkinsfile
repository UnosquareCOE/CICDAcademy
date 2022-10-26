#!groovy?
 
pipeline {
    agent any
    // agent {
    //     docker { image 'node:18' }
    // }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                dir('api') {
                    sh "pwd"
                    docker.build("test-api:${env.BUILD_ID}")
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
