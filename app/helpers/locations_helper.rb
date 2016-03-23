module LocationsHelper
	def get_excerpt(poem,location)
		location_excerpt = location.location_excerpts.find_by(poem: poem.id)
		if(location_excerpt != nil)
			location_excerpt.excerpt	
		elsif(poem.excerpt != nil)
			poem.excerpt
		end	
	end
end