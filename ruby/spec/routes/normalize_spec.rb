# frozen_string_literal: true

RSpec.describe 'POST /normalize', type: :request do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  context 'when data is valid' do
    valid_data = [[10, 20, 30, 40, 50], [10.5, 20.5, 30.5, 40.5, 50.5]]

    valid_data.each do |data|
      context "when data is '#{data}'" do
        before do
          post '/normalize', { data: data }.to_json
        end

        it 'returns a 200 status code' do
          expect(last_response.status).to eq(200)
        end

        it 'returns normalized data' do
          expect(JSON.parse(last_response.body)['normalizedData']).to eq([0, 0.25, 0.5, 0.75, 1])
        end
      end
    end
  end

  context 'when array has one unique element' do
    let(:data) { [7, 7, 7] }

    before do
      post '/normalize', { data: data }.to_json
    end

    it 'returns a 200 status code' do
      expect(last_response.status).to eq(200)
    end

    it 'returns an array of zeroes' do
      expect(JSON.parse(last_response.body)['normalizedData']).to eq([0, 0, 0])
    end
  end

  context 'when array is empty' do
    let(:data) { [] }

    before do
      post '/normalize', { data: data }.to_json
    end

    it 'returns a 200 status code' do
      expect(last_response.status).to eq(200)
    end

    it 'returns an empty array' do
      expect(JSON.parse(last_response.body)['normalizedData']).to eq([])
    end
  end

  context 'when data is invalid' do
    invalid_data = [[10, 20, '30', 40, 50], 'yeah']

    invalid_data.each do |data|
      context "when data is '#{data}'" do
        before do
          post '/normalize', { data: data }.to_json
        end

        it 'returns a 422 status code' do
          expect(last_response.status).to eq(422)
        end

        it 'returns an error message' do
          expect(JSON.parse(last_response.body)['error']).to eq('Input must be an array of numbers.')
        end
      end
    end
  end
end
