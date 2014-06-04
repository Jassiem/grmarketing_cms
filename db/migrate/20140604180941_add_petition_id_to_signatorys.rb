class AddPetitionIdToSignatorys < ActiveRecord::Migration
  def change
  	add_column :signatories, :petition_id, :integer
  end
end
