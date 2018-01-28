# coding:utf-8
# author:xiaofeng
import requests
import json
from bs4 import BeautifulSoup
import urllib.request


t_url = 'https://node.kg.qq.com/play?s=LeICznL9jWiLmLBH&g_f=personal'
r = requests.get(t_url)
soup = BeautifulSoup(r.content, 'lxml')
json_content = soup.find_all('script', {'type': 'text/javascript'})[2].get_text()[len('window.__DATA__ = '):-2]
music_info = json.loads(json_content)
print(music_info['detail']['playurl'])
playurl = music_info['detail']['playurl']

urllib.request.urlretrieve(playurl, '1.mp3')
# print(soup.find_all('script', {'type': 'text/javascript'})[2].get_text()[len('window.__DATA__ = '):-2])
