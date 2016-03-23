class Source < ActiveRecord::Base
	# The sort below only works in sqlite - need a DB-agnostic solution
	# default_scope {order('title collate NOCASE')}
	default_scope { order(title: :asc) }
	has_many :poems
	validates :title, presence:true
	validates :type, presence:true
end
