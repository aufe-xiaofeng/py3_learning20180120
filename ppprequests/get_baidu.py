# coding:utf-8
# author:xiaofeng
import requests
import json

t_url = 'http://heqiming.cn/?'
r =requests.get(t_url+"我喜欢谁")
# print(r.content.decode('utf-8'))
json_content = json.loads(r.content.decode('utf-8'))
print(json_content)
# print(json_content['urls'][0]['url_short'])
