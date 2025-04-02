import mysql.connector

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="expenses"
)

cursor = db.cursor()
sql="CREATE TABLE Money_spent (Transactionnumber INT AUTO_INCREMENT PRIMARY KEY, Category VARCHAR(250), Date DATE, Description VARCHAR(250), Amount INT)"

cursor.execute(sql)

db.close()
cursor.close()