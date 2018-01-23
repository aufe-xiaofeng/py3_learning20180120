# -*-coding:utf-8-*-
# print(b"\344\275\223\345\275\251\347\275\221\347\253\231\347\210\254\345\217\226".decode('utf-8'))
a = "中国"
print(a)
print("type(a) "+str(type(a)))
b = a.encode('utf-8')
print(b)
print("type(b) "+str(type(b)))
c = b.decode('utf-8')
print(c)
print("type(c) "+str(type(c)))