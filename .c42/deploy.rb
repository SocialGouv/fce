load '.c42/recipes/http_auth.rb'

set :stages, %w[preprod]
set :default_stage, 'preprod'

server '185.31.40.131', :app, :web, :db, primary: true

set :application, 'direccte'
set :repository,  'git@github.com:commit42/direccte.git'

set :scm, :git
set :git_enable_submodules, 1
set :deploy_via, :copy
set :copy_cache, true
set :copy_only, ['README.md', 'version.txt', 'dist']
set :copy_exclude, Dir.glob('*') - copy_only
set :build_script, 'SKIP_QUESTIONS=1 c42 docker:install && c42 build'
set :copy_compression, :bz2
set :ssh_options, forward_agent: true

set :use_sudo, false
set :keep_releases, 3

set :app_path, '/dist/htdocs/'
set :user, 'commit42'

task :dev do
  set :deploy_to, '/home/commit42/direccte-dev'
  set :branch, 'develop'
  set :webhost, 'https://dev.direccte.commit42.fr'
  after 'deploy' do
    run %(echo '{ "host": "127.2.47.171", "port": 8101, "mongo": "mongodb://commit42_direccte:5501HrwVReoC@mongodb-commit42.occitech.eu/commit42_direccte_dev", "proxy": false }' > #{File.join(latest_release, '/dist/config/local.json')})
  end
end

task :preprod do
  set :deploy_to, '/home/commit42/direccte'
  set :branch, 'master'
  set :webhost, 'https://direccte.commit42.fr'
  after 'deploy' do
    run %(echo '{ "host": "127.2.47.171", "port": 8101, "mongo": "mongodb://commit42_direccte:5501HrwVReoC@mongodb-commit42.occitech.eu/commit42_direccte", "proxy": false }' > #{File.join(latest_release, '/dist/config/local.json')})
  end
end

after 'deploy:finalize_update' do
  run "cd #{latest_release}/dist && npm install"
end

# see https://github.com/capistrano/capistrano/blob/master/lib/capistrano/ext/multistage.rb#L22
on :load do
  if stages.include?(ARGV.first)
    find_and_execute_task(ARGV.first) if ARGV.any? { |option| option =~ /-T|--tasks|-e|--explain/ }
  else
    find_and_execute_task(default_stage) if exists?(:default_stage)
  end
end

namespace :check do
  desc 'Make sure local git is in sync with remote.'
  task :revision, roles: %i[web app] do
    unless `git rev-parse HEAD` == `git rev-parse origin/#{branch}` || ENV['SKIP_REVISION_CHECK']
      puts "ERROR: Current branch HEAD is not the same as origin/#{branch}"
      puts 'Run `git push` to sync changes.'
      exit 1
    end
  end
  before 'deploy', 'check:revision'
  before 'deploy:migrations', 'check:revision'
  before 'deploy:cold', 'check:revision'
end

after 'deploy' do
  run "echo #{latest_revision} > #{File.join(latest_release, app_path, 'rev.txt')}"
end
task 'local_config' do
  run %(echo '{ "host": "127.2.47.171", "port": 8101, "mongo": "mongodb://commit42_direccte:5501HrwVReoC@mongodb-commit42.occitech.eu/commit42_direccte", "proxy": false }' > #{File.join(latest_release, '/dist/config/local.json')})
end
after 'deploy', 'local_config'

task 'restart' do
  run %(ps -ef | grep node | grep "#{application}" | grep -v grep | awk "{print \\$2}" | xargs kill -9)
end
after 'deploy', 'restart'
after 'restart', 'deploy:cleanup'
