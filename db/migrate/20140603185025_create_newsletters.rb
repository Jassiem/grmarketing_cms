class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      t.string :recipient_name
      t.string :recipient_email

      t.timestamps
    end
  end
end
