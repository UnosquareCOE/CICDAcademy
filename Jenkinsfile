#!groovy?
 
pipeline {
    // agent any
    agent {
        docker { image 'node:16' }
    }

    stages {
        stage('Pull Request') {
            when {
                anyOf {
                    changeRequest()
                }
            }
            steps {
                sh (script: 'docker-compose up --abort-on-container-exit')
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh (script: 'docker-compose up --abort-on-container-exit')

                // docker.image('flyway/flyway').withRun {c ->
                //     sh '-url=jdbc:postgresql://db/test -schemas=public -user=postgres -password=password -connectRetries=5 migrate'
                // }

                dir('api') {
                    script {
                        docker.build("test-api:${env.BUILD_ID}")
                    }
                }

                sh '''
                    wget https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/7.8.2/flyway-commandline-7.8.2-linux-x64.tar.gz
                    tar -xvf flyway-commandline-7.8.2-linux-x64.tar.gz
                ''';
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
