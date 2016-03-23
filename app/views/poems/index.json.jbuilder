json.array!(@poems) do |poem|
  json.extract! poem, :id, :poet, :title, :locations
  json.url poem_url(poem, format: :json)
end
