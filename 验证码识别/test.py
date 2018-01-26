# coding:utf-8
# author:xiaofeng
# 获取超星页面验证码

import time
import urllib.request

t_url = 'http://passport2.chaoxing.com/num/code?'
filepath = './codeimg'
# print(int(time.time()))

for i in range(50):
    strip_time = int(time.time())
    d_url = t_url + str(strip_time)
    urllib.request.urlretrieve(d_url, filepath + '/' + str(i) + '.jpg')
