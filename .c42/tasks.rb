require 'date'

SHELL = '/bin/bash'.freeze
NPM = ENV['NPM'] || 'docker-compose run --rm front npm'

desc 'docker:run', 'Lance docker-compose up'
task 'docker:run' do
  check_ssh_agent
  `docker-compose up -d`
end

desc 'docker:restart', 'Lance docker-compose restart'
task 'docker:restart' do
  check_ssh_agent
  `docker-compose restart`
end

# Front
desc 'npm', 'Lance npm'
shell_task 'npm', NPM

desc 'npm:install', 'Lance npm install'
shell_task 'npm:install', "#{NPM} install"

desc 'npm:update', 'Lance npm update'
shell_task 'npm:update', "#{NPM} update"

desc 'npm:build', 'Lance npm run build'
shell_task 'npm:build', "#{NPM} run build"

desc 'docker:install', 'Installe le docker-compose.yml'
task 'docker:install' do
  if File.exist?('.c42/docker-compose.yml') && File.exist?('docker-compose.yml')
    info('docker-compose.yml is already present')
  else
    info('copying docker-compose.yml')
    copy_file('docker-compose.yml.dist', '.c42/docker-compose.yml')
    create_link('docker-compose.yml', '.c42/docker-compose.yml')
    unless ENV['SKIP_QUESTIONS']
      if yes?('Do you want to edit docker-compose.yml? [y/N]')
        system(%("${EDITOR:-vim}" docker-compose.yml ))
      end
    end
  end
end

# Install
desc 'install', 'Installe le projet'
task :install do
  invoke 'docker:install', []

  info('Starting docker')
  invoke 'docker:run', []

  info('NPM install')
  invoke 'npm:install', []

  info('Restart front')
  invoke 'docker:restart', ['front']
end

depenvs = %w[production preprod]
desc 'deploy DEPLOY_ENV', "deploy to DEPLOY_ENV (#{depenvs.join(', ')})"
task :deploy do |dep_env = '(aucun)'|
  unless depenvs.include?(dep_env)
    error("environnement inconnu: #{dep_env}")
    error('')
    error('DEPLOY_ENV:')
    depenvs.each do |e|
      error("\t- #{e}")
    end
    error('')
    fatal('Impossible de continuer')
  end

  # exec remplace le process actuel
  exec({
         'NPM' => NPM,
         'SKIP_QUESTIONS' => '1'
       }, %(bundle exec cap #{dep_env} deploy))
end

private
def check_ssh_agent
  begin
    socket = (ENV['SSH_AUTH_SOCK']).to_s.strip
    return unless socket.empty? || !File.exist?(socket)
  rescue Errno::ESRCH
  end
  fatal(%{SSH Agent needed, please run the following command :
eval $(ssh-agent -s) && ssh-add})
end
