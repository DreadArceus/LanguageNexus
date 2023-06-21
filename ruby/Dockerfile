FROM ruby:3.2.2-alpine
RUN apk add --no-cache build-base
WORKDIR /app

ENV RACK_ENV production

COPY Gemfile* ./
RUN bundle config set --local without 'test' && bundle install

COPY . .

RUN addgroup --system --gid 1003 ruby
RUN adduser --system --uid 1003 sinatra
USER sinatra

CMD ["ruby", "app/main.rb"]
