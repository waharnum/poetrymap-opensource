class AddImageInfoToLocation < ActiveRecord::Migration
  def change
  	add_column :locations, :image_url, :text
  	add_column :locations, :image_credit, :text
  end
end
