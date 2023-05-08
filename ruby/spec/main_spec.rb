# frozen_string_literal: true

RSpec.describe 'API Endpoints', type: :request do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  describe 'GET /ping' do
    before { get '/ping' }

    it 'returns a 200 status code' do
      expect(last_response.status).to eq(200)
    end

    it 'returns a pong response' do
      expect(JSON.parse(last_response.body)).to eq('result' => 'pong')
    end
  end
end
