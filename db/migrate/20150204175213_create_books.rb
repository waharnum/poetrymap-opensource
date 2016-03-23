class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :link
      t.string :title

      t.timestamps
    end
  end
end
