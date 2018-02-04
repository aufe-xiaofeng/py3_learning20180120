# coding:utf-8
# author:xiaofeng
import urllib.request

# url = 'http://www.whatismyip.com.tw'
url = 'http://2017.ip138.com/ic.asp'
proxy_su = urllib.request.ProxyHandler({'http': '171.116.74.246:9797'})
opener = urllib.request.build_opener(proxy_su)
urllib.request.install_opener(opener)
r = urllib.request.urlopen(url)
html = r.read().decode('gb2312')

print(html)
