# coding:utf-8
# author:xiaofeng
import pytesser3
from PIL import Image


filepath = 'C:/DDD/soft/git/mygithub/py3_learning20180120/验证码识别/codeimg'


image = Image.open('1.jpg')

text = pytesser3.image_file_to_string('1.jpg')
text1 = pytesser3.image_to_string(image)

print(text)
print(text1)
