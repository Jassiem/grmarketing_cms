class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.string :description
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
