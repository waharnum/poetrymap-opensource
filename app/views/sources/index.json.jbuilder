json.array!(@sources) do |source|
  json.extract! source, :id, :library_item_id, :title
  json.url source_url(source, format: :json)
end
