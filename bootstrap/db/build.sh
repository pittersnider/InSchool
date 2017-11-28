echo "+ Importing the existent database structure and fixtures."
mysql -uroot -proot < /project/bootstrap/db/createdb.sql
mysql -uroot -proot inschool < /project/bootstrap/db/structure.sql

echo "+ MySQL process of import has just completed."