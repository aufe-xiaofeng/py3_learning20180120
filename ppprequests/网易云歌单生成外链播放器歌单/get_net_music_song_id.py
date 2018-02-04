# coding:utf-8
# author:xiaofeng
import requests
import pymysql
from bs4 import BeautifulSoup


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
    # save2mysql(conn, cursor, (song_id, song_name, "无备注"))
