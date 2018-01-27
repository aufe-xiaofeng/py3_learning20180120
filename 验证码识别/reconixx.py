# coding:utf-8
# author:xiaofeng
import pytesseract
from PIL import Image


filepath = './codeimg/'


image = Image.open(filepath + '6.jpg')
image.show()

# text1 = pytesseract.image_to_string(image, lang='chi_sim+eng+equ+osd')

# print(text)
# print(text1)
