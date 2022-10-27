#!groovy?
 
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
    }
    stages {
        stage ('Pull Request API') {
            // when { changeRequest target: 'main' }
            agent {
                docker { image 'node:16' }
            }
            steps {
                dir('api') {
                    script {
                        // check API tests
                        sh 'npm i && npm run test'
                    }
                }
            }
        }
        stage('Pull Request Database') {
            // when { changeRequest target: 'main' }
            steps {
                // check database
                sh (script: 'docker-compose up --abort-on-container-exit')
            }
        }
        stage('Deploy Database') {
            steps {
                // apply database
                // docker.image('flyway/flyway').withRun {c ->
                //     sh '-url=jdbc:postgresql://db/test -schemas=public -user=postgres -password=password -connectRetries=5 migrate'
                // }

                docker.image('mysql').withRun {c ->
                    sh './test-with-local-db'
                }
            }
        }

        stage('Deploy API') {
            steps {
                // apply api lightsail
                echo 'Deploy API'
            }
        }

        stage('Deploy UI') {
            steps {
                // apply UI S3
                echo 'Deploy UI'
            }
        }
    }
}
