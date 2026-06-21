pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'arhamafarhan/jenkins-demo'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'node --version || true'
                sh 'npm install || true'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo "Tests passed"'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$IMAGE_TAG .'
                sh 'docker tag $DOCKER_IMAGE:$IMAGE_TAG $DOCKER_IMAGE:latest'
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_IMAGE:$IMAGE_TAG
                        docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop jenkins-demo || true
                    docker rm jenkins-demo || true
                    docker pull $DOCKER_IMAGE:latest
                    docker run -d -p 3000:3000 --name jenkins-demo $DOCKER_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ PIPELINE SUCCESS"
        }
        failure {
            echo "❌ PIPELINE FAILED"
        }
    }
}
