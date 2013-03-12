class AddStartDateToSiteSales < ActiveRecord::Migration
  def change
    remove_column :site_sales, :start_date
    add_column :site_sales, :start_date, :date
  end
end
