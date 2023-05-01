FROM ruby:3.2.2-alpine
RUN apk add --no-cache build-base
WORKDIR /app

ENV RACK_ENV production

COPY Gemfile* ./
RUN bundle install

COPY . .

CMD ["ruby", "app/main.rb"]