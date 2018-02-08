# coding:utf-8
# author:xiaofeng
import json
import re
import json

script_str = '''

# print(script_str.split('\n'))


# for i in script_str.split('\n'):
#     print(i.strip())
pattern = r'pfs.comm.user = [{][\S]*[}]'
rsobj = re.search(pattern, script_str)
# print(script_str[rsobj.start():rsobj.end()])
pfs_comm_user = script_str[rsobj.start():rsobj.end()]

print(pfs_comm_user[pfs_comm_user.find('{'):])
pfs_comm_user_json = json.loads(pfs_comm_user[pfs_comm_user.find('{'):])
print(pfs_comm_user_json)
# print(pfs_comm_user_json['ORGID'])
'''