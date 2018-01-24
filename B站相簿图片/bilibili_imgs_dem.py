# coding:utf-8
# author:xiaofeng


import requests
import json
import time
import os
import urllib.request

root_url = "https://api.vc.bilibili.com/link_draw/v2/Photo/list?category=sifu&type=hot&page_size=20"
img_pac = {}

def get_imgpac():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', 'Accept': '*/*', 'Referer': 'https://h.bilibili.com/'}
    for page_num in range(3):
        time.sleep(1)
        t_url = root_url+"&page_num="+str(page_num)
        r = requests.get(t_url, headers=headers)
        json_content = str(r.content, 'utf-8')
        jpg_object = json.loads(json_content)
        item_lists = jpg_object['data']['items']
        for item in item_lists:
            user_name = item['user']['name']
            pic_urls = []
            pic_lists = item['item']['pictures']
            for pic_item in pic_lists:
                pic_urls.append(pic_item['img_src'])
            img_pac[user_name] = pic_urls


def img_save():
    for filename in img_pac.keys():
        filepath = './' + filename
        print(filepath)
        if not os.path.exists(filepath):
            os.mkdir(filepath)
        else:
            return 0
        for img_url in img_pac[filename]:
            urllib.request.urlretrieve(img_url, filepath+'/'+img_url.split('/')[-1])



def test():
    img_pac['测试1'] = '111'
    print('aaa')


if __name__ == '__main__':
    get_imgpac()
    img_save()
