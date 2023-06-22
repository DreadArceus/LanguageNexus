# frozen_string_literal: true

require 'sinatra'
require 'json'
require_relative 'constants'
require_relative 'routes/normalize'

set :port, PORT

get '/ping' do
  content_type :json
  { result: 'pong' }.to_json
end
