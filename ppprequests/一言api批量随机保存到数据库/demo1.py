# coding:utf-8
# author:xiaofeng
from mytool import mysql_base_op as dbtool
import requests
import json

url = 'https://api.imjad.cn/hitokoto'
params = {
    'cat': '',
    'charset': 'utf-8',
    'length': '',
    'encode': 'json',
    'fun': 'sync',
    'source': 'sync'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0'
}


def test():
    r = requests.get(url, headers=headers, params=params)
    json_obj = json.loads(r.content.decode('utf-8'))
    print(json_obj)
    hitokoto = json_obj['hitokoto']
    catname = json_obj['catname']
    data = json_obj['date']
    author = json_obj['author']
    source = json_obj['source']
    id = json_obj['id']
    v_tuple = (hitokoto, catname, data, author, source, id)
    conn = dbtool.get_conn('yiyan_api')
    cursor = dbtool.get_cursor(conn)
    save_to_mysql(conn, cursor, v_tuple)


def save_to_mysql(conn,cursor,v_tuple):
    sql = "insert into test(hitokoto,catname,data,author,source,id) VALUES(%s, %s,%s, %s,%s, %s)"
    dbtool.insert_mysql(conn, cursor, sql,v_tuple)


if __name__ == '__main__':
    for i in range(1000):
        test()
