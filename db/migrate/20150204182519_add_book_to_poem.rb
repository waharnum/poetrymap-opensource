class AddBookToPoem < ActiveRecord::Migration
  def change
    add_reference :poems, :book, index: true
  end
end
