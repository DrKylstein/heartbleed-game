worker_processes 2
timeout 30

listen "localhost:8080"

preload_app true

pid "#{Dir.pwd}/tmp/unicorn.pid"

stderr_path "#{Dir.pwd}/log/unicorn.stderr.log"
stdout_path "#{Dir.pwd}/log/unicorn.stdout.log"

before_fork do |server, worker|
  DataObjects::Pooling.pools.each do |pool|
    pool.dispose
  end
end
