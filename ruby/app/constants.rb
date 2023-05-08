# frozen_string_literal: true

IS_PROD = ENV['RACK_ENV'] == 'production'
PORT = IS_PROD ? ENV['PORT'].to_i : 4003
