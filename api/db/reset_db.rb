require 'data_mapper'

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/HeartBleed.db")

class HighScore
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :score, Integer
end

DataMapper.finalize

DataMapper.auto_migrate!

