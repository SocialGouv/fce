require 'date'

SHELL = '/bin/bash'.freeze
NPM = ENV['NPM'] || 'docker-compose run --rm %container% npm'
YARN = ENV['YARN'] || 'docker-compose run --rm %container% yarn'
NODE = ENV['NODE'] || 'docker-compose run --rm %container% node'
CYPRESS = 'docker-compose run --rm cypress'
DB_NAME = 'fce'
REMOTE_HOST = 'factory@52.143.162.139'.freeze
REMOTE_DUMP = 'dump.sql.xz'.freeze

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

desc 'pg:console', 'Lance la console postgres'
shell_task 'pg:console', "docker exec -i $(docker-compose ps -q db | sed -n 1p) /bin/bash -c 'psql -d #{DB_NAME} -U postgres'"

desc 'pg:dump', 'Lance la console pg_dump pour créer un dump de la bdd locale'
shell_task 'pg:dump', "docker exec -i $(docker-compose ps -q db | sed -n 1p) /bin/bash -c 'pg_dump -U postgres #{DB_NAME}'"

desc 'dump:get', 'Recupère le dump de la bdd en fonction de la date'
task 'dump:get' do
  run("rsync -avz #{REMOTE_HOST}:/mnt/data/shared/#{REMOTE_DUMP} .c42/tmp/dump.sql.xz")
end

# Front
%w(front server frentreprise).each do |ctr|
    package :"#{ctr}" do
        ctr_npm = NPM.gsub("%container%", ctr)
        ctr_yarn = YARN.gsub("%container%", ctr)

        desc 'yarn', 'Lance yarn'
        shell_task 'yarn', ctr_yarn

        desc 'yarn:build', 'Lance yarn build'
        shell_task 'yarn:build', "#{ctr_yarn} build"

        desc 'npm', 'Lance npm'
        shell_task 'npm', ctr_npm

        desc 'node', 'Lance node'
        shell_task 'node', NODE.gsub("%container%", ctr)

        desc 'npm:install', 'Lance npm install'
        shell_task 'npm:install', "#{ctr_npm} install"

        desc 'npm:update', 'Lance npm update'
        shell_task 'npm:update', "#{ctr_npm} update"

        desc 'npm:build', 'Lance npm run build'
        shell_task 'npm:build', "#{ctr_npm} run build"

        desc 'cypress:tests', 'Lance les tests de cypress'
        shell_task 'cypress:tests', "#{CYPRESS}"

        desc 'cypress:install', 'Installation de cypress'
        shell_task 'cypress:install', 'cd src/client && ./node_modules/.bin/cypress install'

        desc 'cypress:run', 'Lance cypress en local'
        shell_task 'cypress:run', "cd src/client && ./node_modules/.bin/cypress open --port 8080 --env host=https://fce.test"
    end
end

desc 'server:migrate', "Migrate db table"
shell_task 'server:migrate', 'c42 server:yarn migrate'

desc 'frentreprise:upgrade', "Upgrade frentreprise"
task 'frentreprise:upgrade' do
    run 'c42 frentreprise:yarn build'
    run 'c42 server:yarn upgrade frentreprise'
end

desc 'build', "Build a release"
task 'build' do
    if(File.directory?("dist"))
        info("Removing old build...")
        run "rm -rf dist/"
    end

    info("Installing dependencies...")
    run 'c42 frentreprise:yarn'
    run 'c42 server:yarn'
    run 'c42 front:yarn'

    info("Building...")
    run 'c42 frentreprise:yarn build'
    run 'c42 server:yarn upgrade frentreprise'
    run 'c42 server:yarn build'
    run 'c42 front:yarn build'

    info("Packaging...")
    directory "dist" # copy .c42/dist/ to dist/
    directory "../src/server/build", "dist" # copy .c42/../server/build to dist/
    directory "../src/server/scripts", "dist/scripts"
    directory "../src/server/src/shell/monthImport.sh", "dist"
    directory "../src/server/src/Exceptions", "dist/Exceptions"
    directory "../src/server/src/db", "dist/db"
    directory "../src/server/migrations", "dist/migrations" # copy .c42/../server/build to dist/
    directory "../src/client/build", "dist/htdocs" # copy .c42/../client/build to dist/htdocs
    directory "../src/frentreprise", "frentreprise"
    chmod "dist/run.sh", 0755
    chmod "dist/install.sh", 0755

    info("Done!")
end

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
  system("docker-compose build")
end

# Install
desc 'install', 'Installe le projet'
task :install do
  invoke 'docker:install', []

  info('Downloading db dump depending on the date ')
  invoke 'dump:get', [Time.now.strftime('%Y-%m-%d')]

  sql_cat_cmd = 'cat .c42/tmp/fce-base.sql' if File.exists?('.c42/tmp/fce-base.sql')
  sql_cat_cmd = 'zcat .c42/tmp/dump.sql.gz' if File.exists?('.c42/tmp/dump.sql.gz')
  sql_cat_cmd = 'xzcat .c42/tmp/dump.sql.xz' if File.exists?('.c42/tmp/dump.sql.xz')
  fatal('Could not find .c42/tmp/[dump|fce-base].sql[.xz]') unless defined?(sql_cat_cmd) && !sql_cat_cmd.nil?

  copy_file('../src/server/.env.dist', './src/server/.env')

  info('Yarn install')
  invoke 'frentreprise:yarn', ['install']
  invoke 'front:yarn', ['install']
  invoke 'server:yarn', ['install']

  info('Starting docker')
  invoke 'docker:run', []
Install
  info('Waiting for full loading of the db container')
  sleep 12

  info('Piping sql dump into pg:console')
  run("#{sql_cat_cmd} | c42 pg:console")

  info('Execute migrations')
  invoke 'server:yarn', ['migrate up']

  info('Restart front')
  invoke 'docker:restart', ['front']

  info('Restart server')
  invoke 'docker:restart', ['server']
end

depenvs = %w[preprod]
desc 'deploy DEPLOY_ENV', "deploy to DEPLOY_ENV (#{depenvs.join(', ')})"
task :deploy do |dep_env = 'preprod'|
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
         'NPM' => NPM.gsub("%container%", "server"),
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
