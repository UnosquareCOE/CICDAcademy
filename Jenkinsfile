#!groovy?
 
pipeline {
    // agent any
    agent {
        docker { image 'node:18' }
    }

    stages {
        stage('Pull Request') {
            when {
                anyOf {
                    changeRequest()
                }
            }
            steps {
                echo "PR"
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                // dir('api') {
                //     script {
                //         docker.build("test-api:${env.BUILD_ID}")
                //     }
                // }

                // sh '''
                //     wget https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/7.8.2/flyway-commandline-7.8.2-linux-x64.tar.gz
                //     tar -xvf flyway-commandline-7.8.2-linux-x64.tar.gz && ln -s `pwd`/flyway-7.8.2/flyway /usr/local/bin
                //     flyway --version
                // ''';
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
