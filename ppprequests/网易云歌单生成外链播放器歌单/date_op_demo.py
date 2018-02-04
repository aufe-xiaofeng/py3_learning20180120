# coding:utf-8
# author:xiaofeng
import mysql_base_op as dt_op
import os
conn = dt_op.get_conn('com.163.music')
cursor = dt_op.get_cursor(conn)

sql = "select song_id from song_id"
result = dt_op.select_mysql(conn, cursor, sql)

song_id = ''
str = '''
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id='''+song_id+'''&auto=0&height=66"></iframe>
<br></br>
'''
with open('./test.html', 'w+', encoding='utf-8') as f:
    for row in result:
        song_id = row['song_id']
        # song_name = row['song_name']
        # print('song_id: %s  song_name: %s' % (song_id, song_name))
        str = '''<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id='''+song_id+'''&auto=0&height=66"></iframe><br></br>'''
        f.writelines(str+'\n')

dt_op.close_mysql(conn, cursor)

