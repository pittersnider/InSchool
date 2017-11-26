echo "+ Importing the existent database structure and fixtures."
mysql -uroot -proot < /project/bootstrap/db/structure.sql

echo "+ MySQL process of import has just completed."