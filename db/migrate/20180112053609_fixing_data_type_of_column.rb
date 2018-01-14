class FixingDataTypeOfColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :tasks, :text, :string
  end
end
