#!groovy?
 
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
    }
    stages {
        stage('Pull Request Database') {
            when { 
                allOf {
                    // changeRequest target: 'main' 
                    changeset "database/*"
                }
            }
            steps {
                sh (script: 'docker-compose up --abort-on-container-exit')
            }
        }
        stage ('Pull Request API') {
            when { 
                allOf {
                    // changeRequest target: 'main' 
                    changeset "api/*"
                }
            }
            agent {
                docker { image 'node:16' }
            }
            steps {
                dir('api') {
                    script {
                        sh 'npm i && npm run test'
                    }
                }
            }
        }
        stage('Deploy Database') {
            when { changeset "database/*" }
            steps {
                script {
                    docker.image('flyway/flyway').withRun('-v "${PWD}/database:/flyway/sql"', '-url=jdbc:postgresql://db/test -schemas=public -user=postgres -password=password -connectRetries=5 migrate') { c ->
                        sh "docker exec ${c.id} ls flyway"
                        sh "docker logs --follow ${c.id}"
                    }
                }
            }
        }

        //   aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        //   aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        //   aws-region: "eu-west-2"

        stage('Deploy API') {
            // when { changeset "api/*" }
            steps {
                sh '''
                    curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl" -o "lightsailctl"
                    mv "lightsailctl" "/usr/local/bin/lightsailctl"
                    chmod +x /usr/local/bin/lightsailctl
                ''';
                dir('api') {
                    script {
                        withAWS(region:'eu-west-1', credentials:'awsAccessCredentials') {
                            sh '''
                                docker build -t test-system-api:latest .
                                aws lightsail push-container-image --region eu-west-2 --service-name cicd-service-1 --label test-system-api --image test-system-api:latest
                                aws lightsail get-container-images --service-name cicd-service-1 | jq --raw-output ".containerImages[0].image" > image.txt
                                jq --arg image $(cat image.txt) '.containers.app.image = $image' container.template.json > container.json
                                aws lightsail create-container-service-deployment --service-name cicd-service-1 --cli-input-json file://$(pwd)/container.json
                            ''';
                        }
                    }
                }
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
