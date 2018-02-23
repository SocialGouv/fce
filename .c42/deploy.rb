load '.c42/recipes/http_auth.rb'

set :stages, %w[production preprod]
set :default_stage, 'preprod'

server '185.31.40.169', :app, :web, :db, primary: true

set :application, 'itm-pwa'
set :repository,  'git@github.com:commit42/direccte.git'

set :scm, :git
set :git_enable_submodules, 1
set :deploy_via, :copy
set :copy_cache, true
set :copy_exclude, '.git/*'
set :build_script, 'c42 docker:install && c42 front:npm:install && c42 front:npm:build'
set :copy_compression, :bz2
set :ssh_options, forward_agent: true

set :use_sudo, false
set :keep_releases, 3
after 'deploy:restart', 'deploy:cleanup'

set :app_path, '/build/'

task :preprod do
  # set :deploy_to, '/home/livraiso/deployment/pwa-preprod'
  # set :branch, 'develop'
  # set :user, 'livraiso'
  # set :webhost, 'https://app.wip.livraisons.pro'

  # set :http_auth_users, [%w[demo itm2018]]
  # set :http_auth_path, app_path
  # after 'deploy:finalize_update', 'http_auth:protect'
end

task :production do
  # raise 'STOP'
  # set :deploy_to, "/home/livraiso/deployment/pwa-prod"
  # set :branch, "master"
  # set :webhost, "https://app.livraisons.pro"
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

after :deploy do
  run "echo #{latest_revision} > #{File.join(latest_release, app_path, 'rev.txt')}"
end
