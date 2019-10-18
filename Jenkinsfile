pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'yarn install'
            }
        }
    }
}