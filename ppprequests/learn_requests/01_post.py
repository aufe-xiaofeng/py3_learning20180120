# coding:utf-8
# author:xiaofeng

import requests

root_url = 'http://pythonscraping.com/pages/files'

#提交表单
post_url = root_url + '/processing.php'
paramas = {'firstname': 'zhang', 'lastname': 'xiaofeng'}
r = requests.post(post_url, data=paramas)
print(r.text)

#上传文件
files = {'uploadFile': open('./01_post.py', 'rb')}
r = requests.post("http://pythonscraping.com/pages/processing2.php", files=files)
print(r.text)
