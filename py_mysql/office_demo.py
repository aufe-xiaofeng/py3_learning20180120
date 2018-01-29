# coding:utf-8
# author:xiaofeng

import pymysql

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='root',
                             db='testdb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:
        # Create a new record
        value_tuple = ('aaaaa', 'Mohan', 25, 'M', 2000)
        sql = "INSERT INTO employee (FIRST_NAME, LAST_NAME, AGE, SEX, INCOME) VALUES (%s, %s, %s, %s, %s)"
        print(value_tuple)
        cursor.execute(sql, value_tuple)
    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()

    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT * FROM employee WHERE FIRST_NAME = %s"
        cursor.execute(sql, ('alan',))
        result = cursor.fetchone()
        print(result)
finally:
    connection.close()
