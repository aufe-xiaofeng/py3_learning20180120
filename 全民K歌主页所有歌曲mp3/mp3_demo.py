# coding:utf-8
# author:xiaofeng
# 主页 https://node.kg.qq.com/personal?uid=639d94862d2b308337

# 歌词 https://node.kg.qq.com/cgi/fcgi-bin/fcg_lyric?
# jsonpCallback=callback_0
# &g_tk=5381
# &outCharset=utf-8
# &format=jsonp
# &ksongmid=002wkp4X02ecmv
# &g_tk_openkey=5381
# &_=1517140745848

# 歌曲 http://dl.stream.kg.qq.com/szkge/5dfcb9227b05d0fb0ae0acd7f039edef070ac9a8?
# ftnrkey=229fe7044d124738d2e465cc8ec9763920f38e0a5fb279e80007a963f4d1eb3050c229a7cfa734f95437c618473e2ec42b59693b8edca67236cefbffb8189038
# &vkey=39024623B3374F47EA6C3FA749D1AB720619418C61335C536689CBEBCC150557878A39C475B0F0429B841A022A9F9762580E8AEE4725D756EBABF38CF1EDDB877DD34059DE75AD307F6FB3BAF0C44B8E22A3E5DDC7A0D55B
# &fname=1021_96a1caefe71fa89e547e47ef80f989fc768136ac.0.m4a
# &fromtag=1506
# &sdtfrom=v1506

# 获取主页https://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?jsonpCallback=callback_1&g_tk=5381&outCharset=utf-8&format=jsonp&type=get_ugc&start=2&num=8&touin=&share_uid=639d94862d2b308337&g_tk_openkey=5381&_=1517142128209

import requests
import json
ksongmid=''
lyric_url = 'https://node.kg.qq.com/cgi/fcgi-bin/fcg_lyric?jsonpCallback=callback_0&g_tk=5381&outCharset=utf-8&format=jsonp&g_tk_openkey=5381&_=1517146414954&ksongmid='+ksongmid
music_url = 'http://dl.stream.kg.qq.com/shkge/c525f1d40cb1098e52234a41c511fe5e1ed67b24?ftnrkey=295b43b655b10e7d6e29e36a1e0f2b2f524de87fc2c9c168ad2aa08cb08497d78c838ab670a64762888cbeeff3391c08008d713daaa794df897960d00dd79606&vkey=AC907FF14320D52E80EF93B22825C648BCBDF1916849EE325BC7A970E9D0DFDB37662C28BF3F55917230CBCD81CF47E5F5902E4C9F90ACC87B902752197042F5826B5D94DFF416662080D93D50EE86F174E0ABD6A4F8579D&fname=1021_ec67c0ef0a0182bd547e47ef83f984fc7d8143ae.0.m4a&fromtag=1506&sdtfrom=v1506'
t_url = 'https://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?jsonpCallback=callback_1&g_tk=5381&outCharset=utf-8&format=jsonp&type=get_ugc&start=2&num=8&touin=&share_uid=639d94862d2b308337&g_tk_openkey=5381&_=1517154835629'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/57.0',
    'Referer': 'https://node.kg.qq.com/personal?uid=639d94862d2b308337',
    'Host': 'node.kg.qq.com',
    'Accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
    'Connection': 'keep-alive'
}

r = requests.get(t_url)
# print(r.content.decode('utf-8'))
# print(r.content.decode('utf-8')[11:-1])
# json_content = r.content.decode('utf-8')
song_object = json.loads(r.content.decode('utf-8')[11:-1])
# print(json_content)
print(song_object)
