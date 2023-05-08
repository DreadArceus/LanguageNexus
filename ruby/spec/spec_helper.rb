# frozen_string_literal: true

require 'simplecov'
SimpleCov.start

require_relative '../app/main'
require 'rack/test'
require 'rspec'

ENV['RACK_ENV'] = 'test'
