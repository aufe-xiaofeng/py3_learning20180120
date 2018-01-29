# coding:utf-8
# author:xiaofeng

import pymysql

# 打开数据库连接
db = pymysql.connect("localhost", "root", "root", "testdb")

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 插入语句1
# sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
#          LAST_NAME, AGE, SEX, INCOME)
#          VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""

# SQL 插入语句2
# sql = "INSERT INTO EMPLOYEE(FIRST_NAME, \
#        LAST_NAME, AGE, SEX, INCOME) \
#        VALUES ('%s', '%s', '%d', '%c', '%d' )" % \
#        ('alan', 'Mohan', 20, 'M', 2000)

# SQL 插入语句3
value_tuple = ('tttt', 'Mohan', 20, 'M', 2000)
sql = "INSERT INTO EMPLOYEE(FIRST_NAME, \
       LAST_NAME, AGE, SEX, INCOME) \
       VALUES ('%s', '%s', '%d', '%c', '%d' )" % value_tuple

try:
    # 执行sql语句
    cursor.execute(sql)
    # 提交到数据库执行
    db.commit()
except:
    # 如果发生错误则回滚
    db.rollback()

# 关闭数据库连接
db.close()
