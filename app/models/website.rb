class Website < Source
	validates :url, presence:true	
	validates :library_item_id, absence:true
	def link
		return url
	end
end
