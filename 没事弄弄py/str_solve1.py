# coding:utf-8
# author:xiaofeng
from bs4 import BeautifulSoup

str = '''
Ether(dst=00:50:56:f9:34:72,src=00:0c:29:5e:99:b7,type=0x806)/ARP(hwtype=0x1,ptype=0x800,hwlen=6,plen=4,op=who-has,hwsrc=00:0c:29:5e:99:b7,psrc=192.168.161.131 
,hwdst=00:50:56:f9:34:72,pdst=192.168.161.2 
)/Padding(load='\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00')
'''
soup = BeautifulSoup(str, 'lxml')
print(soup.prettify())
