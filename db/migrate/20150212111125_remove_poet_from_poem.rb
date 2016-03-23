class RemovePoetFromPoem < ActiveRecord::Migration
  def change
  	remove_column :poems, :poet
  end
end
