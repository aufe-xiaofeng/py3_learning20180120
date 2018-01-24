# coding:utf-8
# author:xiaofeng

import requests
from bs4 import BeautifulSoup
import lxml
import time
import os
import urllib.request


img_dir = './girs_imgs'
root_url = "http://meizian.com"


#获取套图的分类链接
def get_img_fenlei_lists():
    img_fenlei_lists = []
    r = requests.get(root_url)
    soup = BeautifulSoup(r.content, 'lxml')
    item_lists = soup.find_all('div', {'class':'image-inner'})
    # i = 0;
    for item in item_lists:
        # i = i+1
        # print(str(i) + item.a.get('href'))
        img_fenlei_lists.append(item.a.get('href'))
    return img_fenlei_lists


#获取具体分类的套图链接列表
def get_img_url_lists(fenlei):
    url_lists = []
    r = requests.get(root_url+fenlei)
    soup = BeautifulSoup(r.content, 'lxml')
    pages = soup.find_all('option')[-1].get_text().split(' ')[-2]
    # print(pages)
    for page in range(1, int(pages)+1):
        # time.sleep(1)
        r = requests.get(root_url + fenlei+"?p="+str(page))
        soup = BeautifulSoup(r.content, 'lxml')
        item_lists = soup.find_all('div', {'class': 'image-inner'})
        i = 0
        for item in item_lists:
            i = i+1
            print(str(i) + item.a.get('href'))
            url_lists.append(item.a.get('href'))
    return url_lists


#具体的URL页面也有很多原图链接，根据每个URL创建文件夹，保存图片
def save_img(img_url):
    final_url_lists=[]
    filename = img_url.split('/')[-1].split('.')[0]
    filepath = img_dir+'/'+filename
    # os.mkdir(filepath)
    if not os.path.exists(filepath):
        os.mkdir(filepath)
    else:
        return 0
    r = requests.get(img_url)
    soup = BeautifulSoup(r.content, 'lxml')
    item_lists = soup.find_all('div', {'class': 'image-inner'})
    for item in item_lists:
        final_url_lists.append(item.a.get('href'))

    #开始存取图片
    for final_url in final_url_lists:
        # print(final_url.find('http'))
        imgname= final_url.split('/')[-1]+".jpg"
        #这里只保存图片路径
        if final_url.find('http')==0:
            with open('img_urls.html', 'a+', encoding='utf-8') as f:
                f.write('''<img src="%s"><p>'''%final_url)
                f.write('\n')
            #这里是保存图片
            urllib.request.urlretrieve(final_url, filepath+'/'+imgname)


def test():
    img_url = 'http://meizian.com/taotu/sityle/3561.html'
    filename = img_url.split('/')[-1].split('.')[0]
    print(filename)
    save_img(img_url)


if __name__ == '__main__':
    img_urls = get_img_url_lists('/taotu/aagirl.html')
    print('这里一共有'+str(len(img_urls))+'组图片')
    for img_url in img_urls:
        # time.sleep(1)
        print(img_url)
        save_img(root_url+img_url)
