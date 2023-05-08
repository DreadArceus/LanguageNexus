RSpec.describe 'API Endpoints', type: :request do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  describe 'GET /ping' do
    it 'returns a pong response' do
      get '/ping'
      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('result' => 'pong')
    end
  end
end
