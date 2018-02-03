# coding:utf-8
# author:xiaofeng
import requests


header_aufe = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0',
    'Referer': 'http://www.aufe.edu.cn/_t436/298/list1.htm',
    'Host': 'www.aufe.edu.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
}
r = requests.get(
    'http://www.aufe.edu.cn/_t436/298/list1.htm',
    # header=header_aufe
)
print(r.headers)
# print(r.content.decode('utf-8'))
