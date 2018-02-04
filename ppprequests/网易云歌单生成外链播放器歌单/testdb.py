# coding:utf-8
# author:xiaofeng
import pymysql


def save2mysql(db, cc, value_tuple):
    sql = "insert into song_id(song_id, song_name, flag, biezhu) values(%s,%s,%s,%s)"
    try:
        # 执行sql语句
        cc.execute(sql, value_tuple)
        # 提交到数据库执行
        db.commit()
        return 0
    except:
        # 如果发生错误则回滚
        db.rollback()
        return -1


# def select_update_songid(conn, cursor, value_tuple):



# 打开数据库连接
conn = pymysql.connect("localhost", "root", "root", "com.163.music", charset='utf8')
# 使用cursor()方法获取操作游标
cursor =conn.cursor()
# sql = "insert into song_id(song_id, song_name, flag, biezhu) values('%s','%s','%s','%s')"%('12221', '1111', '1', '达到')
#
# try:
#     # 执行sql语句
#     cursor.execute(sql)
#     # 提交到数据库执行
#     conn.commit()
#     print('对了')
# except Exception as e:
#     # 如果发生错误则回滚
#     print('错了')
#     print(e)
#     conn.rollback()
conn.close()
