#!groovy?
 
pipeline {
    agent any
    stages {
        stage ('Pull Request API') {
            // when { changeRequest target: 'main' }
            // when { changeRequest() }
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
            // when {
            //     anyOf {
            //         changeRequest()
            //     }
            // }
            steps {
                // check database
                sh (script: 'docker-compose up --abort-on-container-exit')
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
        
                // apply database
                // docker.image('flyway/flyway').withRun {c ->
                //     sh '-url=jdbc:postgresql://db/test -schemas=public -user=postgres -password=password -connectRetries=5 migrate'
                // }

                // apply api

                // apply UI
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
