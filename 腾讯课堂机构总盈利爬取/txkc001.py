#coding:utf8
import requests
from bs4 import BeautifulSoup
import lxml
import json
import time


def get_agency_list():
    agency_list = []
    base_url = "https://ke.qq.com/course/list?mt="
    for mt in range(1001, 1002):
        agency_url = base_url + str(mt)
        for page in range(1, 35):
            # time.sleep(1)
            alist = []
            dest_url = agency_url+"&page="+str(page)
            # print(dest_url)     #测试代码
            r = requests.get(dest_url)
            soup = BeautifulSoup(r.content, 'lxml')
            course_market = soup.find('ul', {'class': 'course-card-list'})
            # print(course_market)
            if course_market:
                course_list = course_market.find_all('li', class_='course-card-item')
                for item in course_list:
                    agency_href = item.find('a', class_='item-source-link')
                    alist.append(agency_href)
            else:
                print("no market!!!")
            for item in alist:
                agency_name = item['href']
                if agency_name not in agency_list:
                    agency_list.append(agency_name)
    return agency_list


def get_agency_sum_income(agency_name):
    agency_sum_list = []
    agency_url = "https:"+agency_name+"/cgi-bin/agency_new/get_courses?count=30&page=0&preview=0"
    headers = {'authority': agency_name, 'referer': 'https:'+agency_name}
    r = requests.get(agency_url, headers=headers)
    content = r.content
    json_content = str(content, 'utf-8')
    course_object = json.loads(json_content)
    course_items = course_object['result']['items']
    agency_price_sum = 0
    agency_cname = ""
    for course_item in course_items:
        course_apply_num = course_item['apply_num']
        course_price = course_item['price']/100
        course_price_sum = course_apply_num*course_price
        agency_cname = course_item['agency_name']
        agency_price_sum = agency_price_sum + course_price_sum
    agency = (agency_cname, agency_price_sum)
    agency_sum_list.append(agency)
    return agency_sum_list


if __name__ == '__main__':
    # agency_name1 = get_agency_list()
    # print(len(agency_name1))
    # print(agency_name1)
    agency_sum_list = get_agency_sum_income("//dongnao.ke.qq.com")
    print(agency_sum_list)