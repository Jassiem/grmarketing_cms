class DropRecipient < ActiveRecord::Migration
  def change
  	drop_table :recipients
  end
end
