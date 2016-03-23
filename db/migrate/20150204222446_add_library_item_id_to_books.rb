class AddLibraryItemIdToBooks < ActiveRecord::Migration
  def change
    add_column :books, :library_item_id, :text
  end
end
