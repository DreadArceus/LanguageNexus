require "sinatra"
require "json"
require_relative "constants"

set :port, PORT

get "/ping" do
  content_type :json
  { result: "pong" }.to_json()
end
