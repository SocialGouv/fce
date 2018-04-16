pipeline {
  agent any
    options {
      buildDiscarder(logRotator(numToKeepStr: '20'))
    }
  stages {
    stage('Init') {
      steps {
        notifyBuild()
          echo "Init $BRANCH_NAME on $JENKINS_URL ..."
          sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
              cp .c42/docker-compose.yml.dist docker-compose.yml
              docker-compose up -d # build and start builder containers
              '''
              script {
                TO_DEPLOY = false
              }
          }
      }
    }
    stage('Build') {
      steps {
        echo "Building $BRANCH_NAME on $JENKINS_URL ..."
          sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
              docker-compose up -d # build and start builder containers
              docker-compose run --rm \
              -v `pwd`:/app \
              -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
              -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
              -e SSH_AUTH_SOCK=/run/ssh_agent \
              -e BUNDLE_APP_CONFIG=/app/.bundle \
              -w /app \
              builder \
              bash -c \
              'bundle install --clean --path=vendors/bundle'
              '''
          }
      }
    }
    stage('Confirm') {
      when {
        anyOf {
          branch 'master'
        }
      }
      steps {
        notifyBuild("WAITING");
        input(message: "Are you sure you want to deploy on preproduction?")
          script {
            TO_DEPLOY = true
          }
        sh '''
          echo "Deployment confirmed"
          '''
      }
    }
    stage('Deploy') {
      parallel {
        stage('Dev') {
          when {
            anyOf {
              branch 'develop'
            }
          }
          steps {
            echo "Deploying $BRANCH_NAME into on https://dev.direccte.commit42.fr/ from $JENKINS_URL ..."
              sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
                sh '''
                  docker-compose up -d # build and start builder containers
                  docker-compose run --rm \
                  -v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  builder \
                  bash -c \
                  'NPM=npm bundle exec c42 deploy dev'
                  '''
              }
          }
        }
        stage('Preproduction') {
          when {
            anyOf {
              branch 'master'
            }
            expression { TO_DEPLOY }
          }
          steps {
            echo "Deploying $BRANCH_NAME on https://direccte.commit42.fr/ from $JENKINS_URL ..."
            sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
                sh '''
                docker-compose up -d # build and start builder containers
                docker-compose run --rm \
                -v `pwd`:/app \
                -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                -e SSH_AUTH_SOCK=/run/ssh_agent \
                -e BUNDLE_APP_CONFIG=/app/.bundle \
                -w /app \
                builder \
                bash -c \
                'NPM=npm bundle exec c42 deploy preprod'
                '''
            }
          }
        }
      }
    }
  }
  post {
    always {
      sh '''
        docker-compose down
        sudo chown -R $(id -u):$(id -g) ./
      '''
      deleteDir()
    }
    success {
      notifyBuild("SUCCESSFUL");
    }
    failure {
      notifyBuild("FAILED");
    }
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

    // Default values
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"

    if (buildStatus == 'STARTED') {
      colorCode = '#FFFF00'
    } else if (buildStatus == 'WAITING') {
      colorCode = '#FFA500'
    } else if (buildStatus == 'SUCCESSFUL') {
      colorCode = '#00FF00'
    } else {
      colorCode = '#FF0000'
    }

  slackSend (color: colorCode, message: summary, channel:"#jvf")
}
