class RenameBookIdToSourceId < ActiveRecord::Migration
  def change
  	rename_column :poems, :book_id, :source_id  	
  end
end
