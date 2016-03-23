class AddPoetToPoem < ActiveRecord::Migration
  def change
    add_reference :poems, :poet, index: true
  end
end
