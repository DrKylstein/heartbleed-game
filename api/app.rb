require 'json'
require 'haml'
require 'sinatra'
require 'data_mapper'

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/db/HeartBleed.db")

class HighScore
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :score, Integer
end

DataMapper.finalize

HighScore.auto_upgrade!

get '/hi' do
  "Hello World!"
end

get '/highscores' do
  headers 'Access-Control-Allow-Origin' => '*'
  @scores = HighScore.all( :limit => 8, :order => [:score.desc])
  @scores.to_json
end

post '/highscores' do
  headers 'Access-Control-Allow-Origin' => '*'
  name = params[:name]
  score = params[:score]
  
  unless name==nil||score==nil then
    HighScore.create(:name => name,:score => score)
    "Success"
  else
    "Error"
  end
end

not_found { haml :'404' }
error { @error = request.env['sinatra_error'] ; haml :'500' }
