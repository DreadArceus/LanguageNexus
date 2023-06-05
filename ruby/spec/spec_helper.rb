# frozen_string_literal: true

require 'simplecov'
SimpleCov.start do
  add_filter '/spec/'
end

require_relative '../app/main'
require 'rack/test'
require 'rspec'

ENV['RACK_ENV'] = 'test'
