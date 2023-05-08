require_relative '../app/constants'

RSpec.describe 'Constants' do
  before(:all) do
    @original_verbose = $VERBOSE
    $VERBOSE = nil
  end

  after(:all) do
    $VERBOSE = @original_verbose
  end

  describe 'IS_PROD' do
    before(:each) do
      @original_rack_env = ENV['RACK_ENV']
    end

    after(:each) do
      ENV['RACK_ENV'] = @original_rack_env
    end

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
    before(:each) do
      @original_rack_env = ENV['RACK_ENV']
      @original_port = ENV['PORT']
    end

    after(:each) do
      ENV['RACK_ENV'] = @original_rack_env
      ENV['PORT'] = @original_port
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
