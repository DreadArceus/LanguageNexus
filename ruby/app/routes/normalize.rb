# frozen_string_literal: true

post '/normalize' do
  data = JSON.parse(request.body.read)['data']
  if !data.is_a?(Array) || data.any? { |item| !item.is_a?(Numeric) }
    halt 422, { error: 'Input must be an array of numbers.' }.to_json
  end

  max = data.max
  min = data.min
  normalized_data = max == min ? Array.new(data.length, 0) : data.map { |num| (num - min).to_f / (max - min) }

  { normalizedData: normalized_data }.to_json
rescue JSON::ParserError
  halt 400, { error: 'Bad request' }.to_json
end
