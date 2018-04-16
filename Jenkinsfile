pipeline {
  agent any
  options {
      buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  stages {
    stage('Init') {
      steps {
        echo "Init $BRANCH_NAME on $JENKINS_URL ..."
        sh '''
          cp docker-compose.yml.dist docker-compose.yml
          make -- composer install --prefer-dist -n --ignore-platform-reqs
          docker pull composer/composer
          docker run -t --rm -v `pwd`:/app composer/composer install --prefer-dist -n
        '''
        script {
          TO_DEPLOY = false
        }
      }
    }
    stage('Build') {
      steps {
        echo "Building $BRANCH_NAME on $JENKINS_URL ..."
        sh '''
          docker run -t --rm \
          	-v `pwd`:/app \
              -e BUNDLE_APP_CONFIG=/app/.bundle \
              -w /app \
              ruby \
              bundle install --clean --path=vendors/bundle
        '''
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
    stage('Deploy') {
      parallel {
        stage('Preproduction') {
          when {
            anyOf {
              branch 'develop'
            }
          }
          steps {
            echo "Deploying $BRANCH_NAME into on http://wip.livraisons.pro/ from $JENKINS_URL ..."
            sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
              sh '''
                docker run --rm \
                	-v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  ruby bash -c \
                  'bundle exec cap wip deploy'
                make generate_documentation
                docker run --rm \
                	-v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  ruby bash -c \
                  'bundle exec cap wip documentation:deploy'
              '''
            }
          }
        }
        stage('Production Master') {
          when {
            anyOf {
              branch 'master'
            }
            expression { TO_DEPLOY }
          }
          steps {
            echo "Deploying $BRANCH_NAME on http://itm.livraisons.pro/ from $JENKINS_URL ..."
            sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
              sh '''
                docker run --rm \
                	-v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  ruby bash -c \
                  'bundle exec cap production_master deploy'
                make generate_documentation
                docker run --rm \
                	-v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  ruby bash -c \
                  'bundle exec cap production_master documentation:deploy'
              '''
            }
          }
        }
        stage('Production Slave') {
          when {
            anyOf {
              branch 'master'
            }
            expression { TO_DEPLOY }
          }
          steps {
            echo "Deploying $BRANCH_NAME on http://itm2.livraisons.pro/ from $JENKINS_URL ..."
            sshagent(['67d7d1aa-02cd-4ea0-acea-b19ec38d4366']) {
              sh '''
                docker run --rm \
                	-v `pwd`:/app \
                  -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                  -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                  -e SSH_AUTH_SOCK=/run/ssh_agent \
                  -e BUNDLE_APP_CONFIG=/app/.bundle \
                  -w /app \
                  ruby bash -c \
                  'bundle exec cap production_slave deploy'
                make generate_documentation
                docker run --rm \
                	-v `pwd`:/app \
                    -v "${SSH_AUTH_SOCK}:/run/ssh_agent" \
                    -v "${JENKINS_HOME}/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
                    -e SSH_AUTH_SOCK=/run/ssh_agent \
                    -e BUNDLE_APP_CONFIG=/app/.bundle \
                    -w /app \
                    ruby bash -c \
                    'bundle exec cap production_slave documentation:deploy'
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
  }
}
