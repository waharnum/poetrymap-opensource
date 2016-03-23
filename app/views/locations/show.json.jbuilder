json.cache! @location, expires_in: 10.minutes do
	json.id @location.id
	json.name @location.name
	json.longitude @location.longitude
	json.latitude @location.latitude
	json.image do 
			json.url @location.image_url
			json.credit @location.image_credit
			json.creditURL @location.image_credit_url
		end
	json.poems @location.poems.each do |poem|
			json.id poem.id
			json.title poem.title
			json.excerpt get_excerpt(poem,@location)
			json.poet do 
				json.firstName poem.poet.first_name
				json.lastName poem.poet.last_name
				json.id poem.poet.id
			end
			json.source do
				json.link poem.source.link
				json.title poem.source.title
			end
	end
end