# coding:utf-8
# author:xiaofeng

import pymysql

# 打开数据库连接
db = pymysql.connect("localhost", "root", "root", "testdb")

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 删除语句
sql = "DELETE FROM EMPLOYEE WHERE FIRST_NAME = '%s'" % ('tttt')
try:
    # 执行SQL语句
    cursor.execute(sql)
    # 提交修改
    db.commit()
except:
    # 发生错误时回滚
    db.rollback()

# 关闭连接
db.close()
