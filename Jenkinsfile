pipeline {
  agent any
  options {
      buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  stages {
    stage('Init') {
      steps {
        echo "Init $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
                .c42/scripts/install.sh
            '''
        }
      }
    }
    stage('Build') {
      steps {
        echo "Building $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
            sh '''
                .c42/scripts/build.sh $BRANCH_NAME
            '''
        }
      }
    }
    stage('Eslint') {
      steps {
        echo "Check eslint $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
          sh '''
              docker-compose run --rm server yarn lint
              docker-compose run --rm frentreprise yarn lint
              docker-compose run --rm front yarn lint
          '''
        }
      }
    }
    stage('Tests') {
      steps {
        echo "Check unit tests $BRANCH_NAME on $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
          sh '''
              docker-compose run --rm front yarn testci
          '''
        }
      }
    }
    stage('Deploy staging') {
      when {
        anyOf {
          branch 'develop'
        }
      }
      steps {
        echo "Deploying $BRANCH_NAME from $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
          sh '''
            cd .c42/deployment
            docker-compose run --rm deployment ansible-playbook /root/fce-ppd.yml -i /root/hosts
          '''
        }
      }
    }
    stage('Notify') {
      when {
        anyOf {
          branch 'master'
        }
      }
      steps {
          slackSend channel: "#direccte", message: "FCE deployement waiting for confirmation on (<${env.RUN_DISPLAY_URL}|Jenkins>)"
      }
    }
    stage('Confirm') {
      when {
        anyOf {
          branch 'master'
        }
      }
      steps {
        input(message: "Are you sure you want to deploy on production?")
          script {
            TO_DEPLOY = true
          }
        sh '''
          echo "Deployment confirmed"
        '''
      }
    }
    stage('Deploy production') {
      when {
        anyOf {
          branch 'master'
        }
        expression { TO_DEPLOY }
      }
      steps {
        echo "Deploying $BRANCH_NAME from $JENKINS_URL ..."
        sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
          sh '''
            cd .c42/deployment
            docker-compose run --rm deployment ansible-playbook /root/fce-prod.yml -i /root/hosts
          '''
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
  }
}
