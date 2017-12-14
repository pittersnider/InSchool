echo "+ Importing the existent database structure and fixtures."
mysql -uroot -proot < /project/env/db/createdb.sql
mysql -uroot -proot inschool < /project/env/db/structure.sql

echo "+ MySQL process of import has just completed."