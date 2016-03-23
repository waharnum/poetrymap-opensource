class RemoveLinkFromBook < ActiveRecord::Migration
  def change
  	remove_column :books, :link
  end
end
