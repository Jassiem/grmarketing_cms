class AddGraphicToCards < ActiveRecord::Migration
  def self.up
    add_attachment :cards, :graphic
  end

  def self.down
    remove_attachment :cards, :graphic
  end
end
