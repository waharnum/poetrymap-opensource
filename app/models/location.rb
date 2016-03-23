class Location < ActiveRecord::Base
	# The sort below only works in sqlite - need a DB-agnostic solution
	# default_scope {order('name collate NOCASE')}
	default_scope { order(name: :asc) }
	has_and_belongs_to_many :poems
	has_many :location_excerpts
	geocoded_by :address
	after_validation :geocode
	validates :name, presence:true
	validates :address, presence:true
end
