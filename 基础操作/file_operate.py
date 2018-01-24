# coding:utf-8
# author:xiaofeng

# f = open('test.txt', 'a', encoding='utf-8') #w为覆盖，a为追加
# print(type(f))
# f.write('''你喜欢我吗”lll''')
# f.write('\n')
# f.write('''你还“喜欢我吗？”\n''')
# f.close()

ff = open('test.txt', 'r', encoding='utf-8')
content = ff.read()
print(content)
ff.close()
