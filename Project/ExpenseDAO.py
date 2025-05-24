import mysql.connector
from config import config as cfg

class ExpenseDAO:
    connection = ""
    cursor = ''
    host = ''
    user = ''
    password = ''
    database = ''
    
    def __init__(self):
        self.host = cfg['db_host']
        self.user = cfg['db_user']
        self.password = cfg['db_password']
        self.database = cfg['db_name']

    def getcursor(self): 
        self.connection = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database,
        )
        self.cursor = self.connection.cursor()
        return self.cursor

    def closeAll(self):
        self.cursor.close()
        self.connection.close()

    def getAll(self):
        cursor = self.getcursor()
        sql = "SELECT * FROM money_spent"
        cursor.execute(sql)
        results = cursor.fetchall()
        returnArray = []
        for result in results:
            returnArray.append(self.convertToDictionary(result))
        self.closeAll()
        return returnArray

    def findByID(self, id):
        cursor = self.getcursor()
        sql = "SELECT * FROM money_spent WHERE transactionnumber = %s"
        cursor.execute(sql, (id,))
        result = cursor.fetchone()
        self.closeAll()
        return self.convertToDictionary(result) if result else {}

    def create(self, expense):
        cursor = self.getcursor()
        sql = "INSERT INTO money_spent (category, date, description, amount) VALUES (%s, %s, %s, %s)"
        values = (
            expense.get("category"),
            expense.get("date"),
            expense.get("description"),
            expense.get("amount")
        )
        cursor.execute(sql, values)
        self.connection.commit()
        expense["transactionnumber"] = cursor.lastrowid
        self.closeAll()
        return expense

    def update(self, id, expense):
        cursor = self.getcursor()
        sql = "UPDATE money_spent SET category=%s, date=%s, description=%s, amount=%s WHERE transactionnumber = %s"
        values = (
            expense.get("category"),
            expense.get("date"),
            expense.get("description"),
            expense.get("amount"),
            id
        )
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll()

    def delete(self, id):
        cursor = self.getcursor()
        sql = "DELETE FROM money_spent WHERE transactionnumber = %s"
        cursor.execute(sql, (id,))
        self.connection.commit()
        self.closeAll()

    def convertToDictionary(self, resultLine):
        attkeys = ['transactionnumber', 'category', 'date', 'description', 'amount']
        expense = {attkeys[i]: resultLine[i] for i in range(len(attkeys))}
        return expense

# Create DAO instance
expenseDAO = ExpenseDAO()