# coding:utf-8
# author:xiaofeng
from bs4 import BeautifulSoup
import requests

t_url = 'http://211.86.241.124:8080/cas/login'
session = requests.Session()
r = session.get(t_url)
soup = BeautifulSoup(r.content, 'lxml')
print(soup.find_all('form', {'id': 'loginForm'})[0].get('action'))
print(soup.find('input', {'name': 'lt'}).get('value'))

