json.array!(@poets) do |poet|
  json.extract! poet, :id, :first_name, :last_name
  json.url poet_url(poet, format: :json)
end
