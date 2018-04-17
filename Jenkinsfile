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
  environment {
    SLACK_COLOR_DANGER  = '#E01563'
    SLACK_COLOR_INFO    = '#6ECADC'
    SLACK_COLOR_WARNING = '#FFC300'
    SLACK_COLOR_GOOD    = '#3EB991'
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
            docker-compose build builder # rebuild builder
            docker-compose up -d # build and start builder containers
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
              docker-compose up -d # build and start builder containers
              docker-compose run --rm \
                -v `pwd`:/project \
                -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                -e SSH_AUTH_SOCK=/run/ssh_agent \
                -e BUNDLE_APP_CONFIG=/project/.bundle \
                builder \
                sh -c \
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
                  -v `pwd`:/project \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/project/.bundle \
                  -w /project \
                  builder \
                  sh -c \
                  'bundle exec c42 deploy dev'
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
                  -v `pwd`:/project \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/project/.bundle \
                  -w /project \
                  builder \
                  sh -c \
                  'bundle exec c42 deploy preprod'
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

  def colorCode = "${env.SLACK_COLOR_DANGER}"
  def emoji = ":x:"

  if (buildStatus == 'STARTED') {
    colorCode = "${env.SLACK_COLOR_INFO}"
    emoji = ":checkered_flag:"
  } else if (buildStatus == 'WAITING') {
    colorCode = "${env.SLACK_COLOR_WARNING}"
    emoji = ":double_vertical_bar:"
  } else if (buildStatus == 'SUCCESSFUL') {
    colorCode = "${env.SLACK_COLOR_GOOD}"
    emoji = ":ok_hand:"
  }

  def subject = "${emoji} *${buildStatus}* - ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
  def summary = "${subject}\n\n${env.BUILD_URL}"

  slackSend (color: colorCode, message: summary, channel: "${params.SLACK_CHANNEL}")
}
