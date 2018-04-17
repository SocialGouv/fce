FROM docker

ENV SSH_AUTH_SOCK=/ssh-agent

RUN apk add --no-cache curl

ENV RUBY_VERSION 2.2.0
RUN \
    curl -O http://ftp.ruby-lang.org/pub/ruby/ruby-$RUBY_VERSION.tar.gz && \
    tar zvxf ruby-$RUBY_VERSION.tar.gz && \
    cd ruby-$RUBY_VERSION && \
    ./configure && \
    make && \
    make install && \
    cd .. && \
    rm -rf ruby-$RUBY_VERSION.tar.gz ruby-$RUBY_VERSION

RUN gem update --system

ENV BUNDLE_APP_CONFIG=/project/.bundle

VOLUME [ "/project" ]
WORKDIR /project
