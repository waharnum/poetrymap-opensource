class Poem < ActiveRecord::Base
		# The sort below only works in sqlite - need a DB-agnostic solution
		# default_scope {order('title collate NOCASE')}
		default_scope { order(title: :asc) }
		belongs_to :source
		belongs_to :poet
		has_and_belongs_to_many :locations	
		has_many :location_excerpts	
		validates :title, presence:true
		validates :poet_id, presence:true		
end
