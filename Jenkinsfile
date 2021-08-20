pipeline {
    environment {
        registryCredential = 'dockerhub'
    }

    agent any

    tools {
       nodejs 'NodeJS 13.6.0'
    }

    stages {
        stage('Build') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'yarn install'
                            sh 'yarn build'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'yarn install'
                            sh 'yarn build'
                        }
                    }
                }
            }
        }

        stage('Deployment') {
            parallel {
                stage('Backend') {
                    environment {
                        registry = "raphaelmue/raphael-muesseler-backend"
                    }
                    steps {
                        dir('backend') {
                            docker.build registry + ":latest"
                        }
                    }
                }
                stage('Frontend') {
                    environment {
                        registry = "raphaelmue/raphael-muesseler-frontend"
                    }
                    steps {
                        docker.build registry + ":latest"
                    }
                }
            }
        }
    }

    post {
        always {
            dir('backend') {
                sh 'yarn run clean:modules'
            }
            dir('frontend') {
                sh 'yarn run clean:modules'
            }
        }
    }
}
