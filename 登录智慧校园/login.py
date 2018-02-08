# coding:utf-8
# author:xiaofeng
import requests
from bs4 import BeautifulSoup

t_url = 'http://211.86.241.124:8080'

session = requests.Session()

r = session.get('http://211.86.241.124:8080/cas/login')
soup = BeautifulSoup(r.content, 'lxml')
JSESSIONID = soup.find_all('form', {'id': 'loginForm'})[0].get('action')
lt = soup.find('input', {'name': 'lt'}).get('value')

params = {
    'username': 'xxxx',
    'password': 'xxxx',
    'execution': 'e1s1',
    '_eventId': 'submit',
    'isQrSubmit': 'false',
    # 'qrValue':
    'isMobileLogin': 'false',
    'authCode': '',
    'lt': lt
}
headers = {
    'Host': 'i.aufe.edu.cn',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0'
}
r = session.post(t_url+JSESSIONID, params=params, headers=headers)
# print(r.content.decode('utf-8'))
main_page = session.get('http://i.aufe.edu.cn/portal_main/toPortalPage', headers=headers)
# print(main_page.content.decode('utf-8'))
# sss = BeautifulSoup(main_page.content, 'lxml')
# info_str = sss.find_all('script', {'type': 'text/javascript'})[-5]
# print(info_str.get())
appcenter_params = {
    'USERID': 'xxxx',
    'USERGROUP': 'bks',
    'USERORG': '10378305',
    'APPID': '1d941ccc3c754609964f2cb5769ef544' #图书管理系统的appid
    # 'APPID': 'd149f391338444b0ba6ec91b9f6bc907' #安财云盘的appid
}
app_url = 'http://i.aufe.edu.cn/appcenter/queryAppByAuthority'
dir_url = 'http://211.86.245.190:81/ReaderTable.aspx'
jwc_url = 'http://jwcxk.aufe.edu.cn/ssologin.jsp'
t = 'http://211.86.245.190:8021/Tick.aspx'
headers['Referer'] = 'http://i.aufe.edu.cn/portal_main/toPortalPage'
# library_page = session.post(app_url, params=appcenter_params, headers=headers)
# library_page = session.post(dir_url, headers=headers)
jwc_page = session.post(jwc_url, headers=headers)
print(jwc_page.content.decode('utf-8'))
