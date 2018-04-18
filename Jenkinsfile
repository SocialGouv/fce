pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  parameters {
    string(name: 'SLACK_CHANNEL',
           description: 'Slack channel to send messages to',
           defaultValue: '#jvf')
  }
  stages {
    stage('Init') {
      when {
        anyOf {
          branch 'develop';
          branch 'master'
        }
      }
      steps {
        notifyBuild()
        echo "Init $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
          sh '''
            cp .c42/docker-compose.yml.dist docker-compose.yml
            docker-compose build builder
          '''
          script {
            TO_DEPLOY = false
          }
        }
      }
    }
    stage('Build') {
      when {
        anyOf {
          branch 'develop';
          branch 'master'
        }
      }
      steps {
        echo "Building $BRANCH_NAME on $JENKINS_URL ..."
          sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
                docker-compose run --rm \
                    -v `pwd`:/project \
                    -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                    -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                    builder \
                    bash -c \
                    "bundle install --clean --path=vendors/bundle"
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
                  docker-compose run --rm \
                      -v `pwd`:/project \
                      -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                      -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                      builder \
                      bundle exec c42 deploy dev
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
                  docker-compose run --rm \
                      -v `pwd`:/project \
                      -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                      -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                      builder \
                      bundle exec c42 deploy preprod
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

  def colorCode = "#E01563"
  def emoji = ":x:"

  if (buildStatus == 'STARTED') {
    colorCode = "#6ECADC"
    emoji = ":checkered_flag:"
  } else if (buildStatus == 'WAITING') {
    colorCode = "#FFC300"
    emoji = ":double_vertical_bar:"
  } else if (buildStatus == 'SUCCESSFUL') {
    colorCode = "#3EB991"
    emoji = ":ok_hand:"
  }

  def subject = "${emoji} *${buildStatus}* - ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
  def summary = "${subject}\n\n${env.BUILD_URL}"

  slackSend (color: colorCode, message: summary, channel: "${params.SLACK_CHANNEL}")
}
