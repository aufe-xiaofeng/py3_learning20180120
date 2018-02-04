# coding:utf-8
# author:xiaofeng
import pymysql


def get_conn(db_name):
    # Connect to the database
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='root',
                                 db=db_name,
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection


def get_cursor(conn):
    return conn.cursor()


def insert_mysql(conn, cursor, sql, value_tuple=()):
    try:
        # 执行sql语句
        cursor.execute(sql, value_tuple)
        # 提交到数据库执行
        conn.commit()
        return 0
    except Exception as e:
        # 如果发生错误则回滚
        print(e)
        conn.rollback()
        return -1


def select_mysql(conn, cursor, sql, value_tuple=()):
    cursor.execute(sql, value_tuple)
    result = cursor.fetchall()
    # print(result)
    #返回一个字典的列表
    return result


def update_mysql(conn, cursor, sql, value_tuple=()):
    try:
        # 执行sql语句
        cursor.execute(sql, value_tuple)
        # 提交到数据库执行
        conn.commit()
        return 0
    except Exception as e:
        # 如果发生错误则回滚
        print(e)
        conn.rollback()
        return -1


def delete_mysql(conn, cursor, sql, value_tuple=()):
    try:
        # 执行sql语句
        cursor.execute(sql, value_tuple)
        # 提交到数据库执行
        conn.commit()
        return 0
    except Exception as e:
        # 如果发生错误则回滚
        print(e)
        conn.rollback()
        return -1


def close_mysql(conn, cursor):
    cursor.close()
    conn.close()

