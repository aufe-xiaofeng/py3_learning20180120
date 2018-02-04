# coding:utf-8
# author:xiaofeng
import requests

post_url = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
headers = {
    'Host': 'fanyi.youdao.com',
    'Referer': 'http://fanyi.youdao.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0'
}

param = {
    'i': '%E4%BA%BA',
    'from': 'AUTO',
    'to': 'AUTO',
    'smartresult': 'dict',
    'client': 'fanyideskweb',
    'salt': '1517713696743',
    'sign': 'b4cf7e76beab0b349dea3edd6128f07a',
    'doctype': 'json',
    'version': '2.1',
    'keyfrom': 'fanyi.web',
    'action': 'FY_BY_REALTIME',
    'typoResult': 'false',
}


r = requests.post(post_url, headers=headers)
print(r.content.decode('utf-8'))
