# -*-coding:utf-8-*-
a = "中国"
print(a)
print("type(a) "+str(type(a)))
b = a.encode('utf-8')
print(b)
print("type(b) "+str(type(b)))
c = b.decode('utf-8')
print(c)
print("type(c) "+str(type(c)))