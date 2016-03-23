class CreatePoemsLocations < ActiveRecord::Migration
  def change
    create_table :locations_poems, id: false do |t|
    	t.integer :poem_id
    	t.integer :location_id    	
    end
    add_index :locations_poems, [:location_id, :poem_id]
  end
end
