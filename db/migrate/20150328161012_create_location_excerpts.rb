class CreateLocationExcerpts < ActiveRecord::Migration
  def change
    create_table :location_excerpts do |t|
      t.belongs_to :location, index: true
      t.belongs_to :poem, index: true
      t.text :excerpt
      t.timestamps null: false
    end
  end
end
