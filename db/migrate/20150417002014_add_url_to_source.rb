class AddUrlToSource < ActiveRecord::Migration
  def change
  	add_column :sources, :url, :string
  end
end
