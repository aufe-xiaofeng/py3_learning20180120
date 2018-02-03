# coding:utf-8
# author:xiaofeng
import requests
# import re
import json
import pymysql
from bs4 import BeautifulSoup


def save2mysql(db, cc, value_tuple):
    sql = "insert into song_id(song_id, song_name, biezhu) values(%s,%s,%s)"
    try:
        # 执行sql语句
        cc.execute(sql, value_tuple)
        # 提交到数据库执行
        db.commit()
        return 0
    except Exception as e:
        # 如果发生错误则回滚
        print(e)
        db.rollback()
        return -1


# 打开数据库连接
conn = pymysql.connect("localhost", "root", "root", "com.163.music", charset='utf8')
# 使用cursor()方法获取操作游标
cursor =conn.cursor()

t_url = 'https://music.163.com/playlist?id=2070939377'

headers = {
    "Host": "music.163.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
}

r = requests.get(t_url, headers=headers)
soup = BeautifulSoup(r.content, 'lxml')

for song_li in soup.ul.children:
    # < li > < a href = "/song?id=499308706" > 短发 < / a > < / li >
    # print(song_li.find('a').get('href'))
    song_id = song_li.find('a').get('href').split('=')[-1]
    song_name = song_li.find('a').get_text()
    # print(song_id)
    # print(song_name)
    save2mysql(conn, cursor, (song_id, song_name, "无备注"))
# 关闭数据库连接
conn.close()
