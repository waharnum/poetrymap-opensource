class Poet < ActiveRecord::Base
	# The sort below only works in sqlite - need a DB-agnostic solution
	# default_scope {order('last_name collate NOCASE')}
	default_scope { order(last_name: :asc) }
	has_many :poems
	validates :first_name, presence:true
	validates :last_name, presence:true

	def full_name
		"#{first_name} #{last_name}"
	end
	def name
		"#{last_name}, #{first_name}"
	end
end
