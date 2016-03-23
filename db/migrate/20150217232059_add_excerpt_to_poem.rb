class AddExcerptToPoem < ActiveRecord::Migration
  def change
  	add_column :poems, :excerpt, :text
  end
end
