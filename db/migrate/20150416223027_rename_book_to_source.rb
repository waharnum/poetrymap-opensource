class RenameBookToSource < ActiveRecord::Migration
  def change
  	rename_table :books, :sources
  end
end
