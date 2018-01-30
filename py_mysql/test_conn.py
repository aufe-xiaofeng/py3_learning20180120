# coding:utf-8
# author:xiaofeng


import pymysql
# print(pymysql)

conn = pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    passwd='root',
    db='testdb',
    charset='utf8'
)

cursor = conn.cursor()

print(conn)
print(cursor)

conn.close()
cursor.close()
