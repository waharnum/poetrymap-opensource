class ChangeLibraryItemIdOnBooksToString < ActiveRecord::Migration
  def change
  	change_column :books, :library_item_id, :string
  end
end
