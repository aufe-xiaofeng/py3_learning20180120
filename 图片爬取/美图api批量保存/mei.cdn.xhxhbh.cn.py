# coding:utf-8
# author:xiaofeng
import requests
import urllib.request
import os

url = 'http://mei.cdn.xhxhbh.cn/jde.php'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0',
    'Host': 'mei.cdn.xhxhbh.cn'
}


def get_imginfo():
    r = requests.get(url, headers=headers)
    img_name = r.text
    img_url = 'http://mei.cdn.xhxhbh.cn/' + img_name
    info = (img_name.strip(), img_url.strip())
    return info


def save_img(img_info_tuple):
    filepath = './imgs'
    if not os.path.exists(filepath):
        os.mkdir(filepath)
    urllib.request.urlretrieve(img_info_tuple[1], filepath + '/' + img_info_tuple[0])


if __name__ == '__main__':
    save_img(get_imginfo())
