# -*-coding:utf-8-*-
import urllib.request
import lxml
from bs4 import BeautifulSoup


url = "http://www.baidu.com"


# 获取网页
r = urllib.request.urlopen(url)
ret = r.read()
# print(ret.decode('utf-8'))

soup = BeautifulSoup(ret, 'lxml')
# print(soup.prettify())
# print(soup.a)
# print(soup.a.get('id'))

a_list = soup.find_all('a')
for item in a_list:
    print(item.get('href'))

