class AddImageCreditUrlToLocation < ActiveRecord::Migration
  def change
  	add_column :locations, :image_credit_url, :text
  end
end
