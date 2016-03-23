class LocationExcerpt < ActiveRecord::Base
	belongs_to :location
	belongs_to :poem
	validates :location, presence:true
	validates :poem, presence:true
	validates :excerpt, presence:true
	def name
		if(poem != nil and location != nil)
			"#{poem.title} / #{location.name}"
		else
			"New Location-Specific Excerpt"
		end
			
	end	
end