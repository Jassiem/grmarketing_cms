class CreateSignatories < ActiveRecord::Migration
  def change
    create_table :signatories do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
