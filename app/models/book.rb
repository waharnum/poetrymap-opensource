class Book < Source
	def link
		if library_item_id.blank?
			return nil
		else		
			return "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM#{library_item_id}&R=#{library_item_id}"
		end
	end
end
