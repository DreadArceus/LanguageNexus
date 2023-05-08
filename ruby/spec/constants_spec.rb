# frozen_string_literal: true

require_relative '../app/constants'

RSpec.describe 'Constants' do
  let(:original_verbose) { $VERBOSE }

  before { $VERBOSE = nil }
  after { $VERBOSE = original_verbose }

  describe 'IS_PROD' do
    let(:original_rack_env) { ENV['RACK_ENV'] }

    after { ENV['RACK_ENV'] = original_rack_env }

    it 'is true when RACK_ENV is "production"' do
      ENV['RACK_ENV'] = 'production'
      load 'app/constants.rb'
      expect(IS_PROD).to be_truthy
    end

    it 'is false when RACK_ENV is not "production"' do
      ENV['RACK_ENV'] = 'development'
      load 'app/constants.rb'
      expect(IS_PROD).to be_falsey
    end
  end

  describe 'PORT' do
    let(:original_rack_env) { ENV['RACK_ENV'] }
    let(:original_port) { ENV['PORT'] }

    after do
      ENV['RACK_ENV'] = original_rack_env
      ENV['PORT'] = original_port
    end

    it 'equals the value of PORT environment variable when RACK_ENV is "production"' do
      ENV['RACK_ENV'] = 'production'
      ENV['PORT'] = '4090'
      load 'app/constants.rb'
      expect(PORT).to eq(ENV['PORT'].to_i)
    end

    it 'equals 4003 when RACK_ENV is not "production"' do
      ENV['RACK_ENV'] = 'development'
      ENV['PORT'] = '4090'
      load 'app/constants.rb'
      expect(PORT).to eq(4003)
    end
  end
end
