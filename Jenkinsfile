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
                    changeRequest target: 'main' 
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
                    changeRequest target: 'main' 
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
            when {  
                allOf {
                    branch 'main' 
                    // changeset "database/*"
                }
            }
            environment {
                DB_URL = credentials('dev-db-url')
                DB_USER = credentials('dev-db-user')
                DB_PASSWORD = credentials('dev-db-password')
            }
            steps {
                script {
                    sh (script: 'ls ${PWD}/database')

                    docker.image('flyway/flyway').withRun('-v $WORKSPACE:/flyway/sql', '-url=jdbc:postgresql://${DB_URL}/cicdtestdb -schemas=public -user=${DB_USER} -password=${DB_PASSWORD} -connectRetries=5 migrate') { c ->
                        sh "docker exec ${c.id} ls flyway"
                        sh "docker logs --follow ${c.id}"
                    }
                }
            }
        }
        stage('Deploy API') {
            when {  
                allOf {
                    branch 'main' 
                    changeset "api/*"
                }
            }
            steps {
                sh '''
                    curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl" -o "lightsailctl"
                    mv "lightsailctl" "/usr/local/bin/lightsailctl"
                    chmod +x /usr/local/bin/lightsailctl
                ''';
                dir('api') {
                    script {
                        withAWS(region:'eu-west-2', credentials:'awsAccessCredentials') {
                            sh '''
                                docker build -t test-system-api:latest .
                                aws lightsail push-container-image --service-name cicd-service-1 --label test-system-api --image test-system-api:latest
                                aws lightsail get-container-images --service-name cicd-service-1 | jq --raw-output ".containerImages[0].image" > image.txt
                                jq --arg image $(cat image.txt) '.containers.app.image = $image' container.template.json > container.json
                                aws lightsail create-container-service-deployment --service-name cicd-service-1 --cli-input-json "file://$(pwd)/container.json"
                            ''';
                        }
                    }
                }
            }
        }

        stage('Deploy UI') {
            when {  
                allOf {
                    changeset "ui/*"
                    branch 'main' 
                }
            }
            agent {
                docker { image 'node:16' }
            }
            steps {
                dir('ui') {
                    script {
                        withAWS(region:'eu-west-1', credentials:'awsAccessCredentials') {
                            sh '''                         
                                npm i && npm run-script build
                            ''';
                            s3Upload(file:'build', bucket:'cicdacademybucket', path:'')
                        }
                    }
                }
            }
        }
    }
}
