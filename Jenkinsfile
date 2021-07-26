pipeline {
    stages {
        stage('Build') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'yarn install'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'yarn install'
                        }
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
