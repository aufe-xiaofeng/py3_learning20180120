# coding:utf-8
# author:xiaofeng
import json

import requests

import re

import urllib

from bs4 import *

url = "https://music.163.com/playlist?id=2070939377"

headers = {
    "Host": "music.163.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
}

#只传url不能获得响应，需要传header

request = urllib.request.Request(url, headers=headers)

response = urllib.request.urlopen(request)

#不decode的话text是十六进制，不是中文

html = response.read().decode('utf-8', 'ignore')

soup = BeautifulSoup(html, 'lxml')
print(soup.prettify())

''''
#打开1.txt 把歌单中的歌词写入

f=open('C:/Users/liuxu/Desktop/myfavoritesong.txt','w',encoding='utf-8')

for item in soup.ul.children:

    #取出歌单里歌曲的id  形式为：/song?id=11111111

    song_id = item('a')[0].get("href",None)

    #利用正则表达式提取出song_id的数字部分sid

    pat = re.compile(r'[0-9].*$')

    sid = re.findall(pat,song_id)[0]

    #这里的url是真实的歌词页面

    url = "http://music.163.com/api/song/lyric?"+"id="+str(sid)+"&lv=1&kv=1&tv=-1"

    html = requests.post(url)

    json_obj = html.text

    #歌词是一个json对象 解析它

    j = json.loads(json_obj)

    try:

        lyric = j['lrc']['lyric']

    except KeyError:

        lyric = "无歌词"

    pat = re.compile(r'\[.*\]')

    lrc = re.sub(pat,"",lyric)

    lrc = lrc.strip()

    #print(lrc)

    f.write(lrc)

f.close()
'''