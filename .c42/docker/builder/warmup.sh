#!/bin/sh

echo "#!/bin/sh" > /bin/ruby
echo "exec docker run --rm -v \"\$PWD\":/usr/src/app -w /usr/src/app ruby:2.5 ruby \"\$@\"" > /bin/ruby
chmod a+x /bin/ruby

echo "#!/bin/sh" > /bin/gem
echo "exec docker run --rm -v \"\$PWD\":/usr/src/app -w /usr/src/app ruby:2.5 gem \"\$@\"" > /bin/gem
chmod a+x /bin/gem

echo "#!/bin/sh" > /bin/bundle
echo "exec docker run --rm -v \"\$PWD\":/usr/src/app -w /usr/src/app ruby:2.5 bundle \"\$@\"" > /bin/bundle
chmod a+x /bin/bundle

exec "$@"
