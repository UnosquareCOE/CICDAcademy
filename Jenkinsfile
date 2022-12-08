#!groovy?
 
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
    }
    stages {
        // stage('Approve deploy?') {
        //     steps {
        //         saySomething "ello"
        //         requestApproval(environment: 'DEV', time: 1, unit: 'DAYS')
        //     }
        // }
        // stage('Start other pipeline') {
        //     steps {
        //         script {
        //             if (env.JOB_BASE_NAME != "test-project") {
        //                 // we can also add wait: false if we want to do asynchronously
        //                 // additionally we can get the result if needed for SUCCESS or FAILED
        //                 build job: "test-project"
        //             }
        //         }   
        //     }
        // }
        // stage('Parallel example') {
        //     parallel {
        //         stage('Pull Request Database') {
        //             when { 
        //                 allOf {
        //                     changeRequest target: 'main' 
        //                     changeset "database/*"
        //                 }
        //             }
        //             steps {
        //                 sh (script: 'docker-compose up --abort-on-container-exit')
        //             }
        //         }
        //         stage ('Pull Request API') {
        //             when { 
        //                 allOf {
        //                     changeRequest target: 'main' 
        //                     changeset "api/*"
        //                 }
        //             }
        //             agent {
        //                 docker { image 'node:16' }
        //             }
        //             steps {
        //                 dir('api') {
        //                     script {
        //                         sh 'npm i && npm run test'
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // stage('Deploy Database') {
        //     when {  
        //         allOf {
        //             branch 'main' 
        //             changeset "database/*"
        //         }
        //     }
        //     agent {
        //         docker { 
        //             image 'flyway/flyway'
        //             args '--entrypoint=' 
        //         }
        //     }
        //     environment {
        //         DB_URL = credentials('dev-db-url')
        //         DB_USER = credentials('dev-db-user')
        //         DB_PASSWORD = credentials('dev-db-password')
        //     }
        //     steps {
        //         script {
        //             sh '''       
        //                 flyway -url=jdbc:postgresql://${DB_URL}/cicdtestdb -schemas=public -user=${DB_USER} -password=${DB_PASSWORD} -locations="filesystem:./database" -connectRetries=5 migrate
        //             ''';
        //         }
        //     }
        // }
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

        // stage('Deploy UI') {
        //     when {  
        //         allOf {
        //             changeset "ui/*"
        //             branch 'main' 
        //         }
        //     }
        //     agent {
        //         docker { image 'node:16' }
        //     }
        //     steps {
        //         dir('ui') {
        //             script {
        //                 withAWS(region:'eu-west-1', credentials:'awsAccessCredentials') {
        //                     sh '''                         
        //                         npm i && npm run-script build
        //                     ''';
        //                     s3Upload(file:'build', bucket:'cicdacademybucket', path:'')
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
