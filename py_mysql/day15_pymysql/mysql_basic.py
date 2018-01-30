import pymysql
import core_data as cd
import time


def create():
	# cd.conn = pymysql.connect(host='localhost', port=3306, database='jing_dong', user='root', password='mysql', charset='utf8')
	cd.conn = pymysql.connect(**cd.config)
	cd.cs = cd.conn.cursor()
	print('------------------------->数据库连接<------------------------------')


# 所有商品显示
def query_goods():
	print('-------------------->goods query<-------------------------------')
	sql = '''select g.id,g.name,c.name,b.name,g.price,g.is_show,g.is_saleoff from goods as g
		inner join goods_cates as c on g.cate_id=c.id
		inner join goods_brands as b on g.brand_id=b.id  
	'''
	count = cd.cs.execute(sql)
	if count == 0:
		print('------------------------->query fail<-------------------------')
		print('--------------------->databases goods is null<----------------')
	else:
		print('----------------------->query success<------------------------')
		print('**************************************************************')
		print('*************************all goods info***********************')
		print('**************************************************************')
		print('id\tname\t\t\t\tcate_name\tbrand_name\tprice\tis_show\tis_saleoff')
		for i in range(count):
			result = cd.cs.fetchone()
			print('%s\t%s\t\t\t%s\t%s\t%s\t%s\t\%s' % result)


# 顾客身份验证
def query_customer():
	print('--------------------------->customer query<-----------------------')
	while True:
		if cd.customer_dict:
			print('------------------>query success<-------------------------')
			break
		else:
			print('------------------->query fail<---------------------------')
			print('----------------->please log in first!<-------------------')
			login_customer()


# 订单
def insert_order():
	print('------------------------->insert order<---------------------------')
	cur_time = time.strftime("%Y-%m-%d %H:%M:%S")
	sql = '''insert into orders values (0, %s, %s)
	'''
	count = cd.cs.execute(sql, [cur_time, cd.customer_dict['id']])
	cd.conn.commit()
	print('------------------->insert one new order record<------------------')

	sql = '''select * from orders as o where o.order_date_time=%s and o.customer_id=%s
	'''
	print(sql % (cur_time, cd.customer_dict['id']))
	count = cd.cs.execute(sql, [cur_time, cd.customer_dict['id']])
	result = cd.cs.fetchone()
	# print(result)
	oid = result[0]
	order_date_time = result[1]  # datetime类型
	customer_id = result[2]
	cd.order_dict['id'] = int(oid)
	cd.order_dict['order_date_time'] = order_date_time
	cd.order_dict['customer_id'] = customer_id
	print('-------------------------->order success<-------------------------')
	print('**************************all order info**************************')
	print('id\torder_date_time\tcustomer_id\n%s\t%s\t%s' % result)


# 订单详情
def insert_order_detail():
	print('------------------------>insert order detail<--------------------')
	sql = '''select g.id,g.name,c.name,b.name,g.price,g.is_show,g.is_saleoff from goods as g
		inner join goods_cates as c on g.cate_id=c.id
		inner join goods_brands as b on g.brand_id=b.id  
	'''
	while True:
		query_goods()
		good_id = int(input('please enter good id:'))
		sql = '''select id from goods
		'''
		count = cd.cs.execute(sql)
		print(sql)
		result = cd.cs.fetchall()
		print(result)
		good_id_list = list()
		for i in result:
			for j in i:
				good_id_list.append(j)
		good_id_tuple = tuple(good_id_list)
		print(good_id_tuple)
		if good_id in good_id_tuple:
			good_quantity = int(input('please enter goods quantity(<1000):'))
			if good_quantity<1000:
				sql = '''insert into order_detail values (0, %s, %s, %s)
				'''
				count = cd.cs.execute(sql, [cd.order_dict['id'], good_id, good_quantity])
				cd.conn.commit()
				print('----->insert one new order_detail record<---------')
				print(sql % (cd.order_dict['id'], good_id, good_quantity))
				print('----------------->order detail success<-----------')

				sql = '''select * from order_detail as o where o.order_id=%s
				'''
				print(sql % (cd.order_dict['id']))
				count = cd.cs.execute(sql, [cd.order_dict['id']])
				result = cd.cs.fetchone()
				cd.order_detail_dict['id'] = result[0]
				cd.order_detail_dict['order_id'] = result[1]
				cd.order_detail_dict['good_id'] = result[2]
				cd.order_detail_dict['quantity'] = result[3]
				print('*************all order detail info********************')
				print('id\torder_id\tgood_id\tquantity\n%s\t%s\t\t%s\t%s' % result)
				break
			else:
				print('------------>order detail fail<-------------------')
				print('------------>good quantity overflow<--------------')
		else:
			print('-------------------->order detail fail<-------------------')
			print('--------------------->good id overflow<-------------------')

# 退出系统
def exit_system():
	print('------------------------->system exit<----------------------------')
	logoff_customer()
	conn = None
	cs = None
	print('------------------------->exit success<---------------------------')
	print('------------------------>leave the jing_dong<---------------------')
	exit(0)


# 用户下线
def logoff_customer():
	print('---------------------------->customer logoff<---------------------')
	customer_dict = dict()
	order_dict = dict()
	order_detail = dict()
	customer_id = None
	order_id = None
	good_id = None
	good_quantity = None
	print('---------------------------->logoff success<----------------------')


# 用户登录
def login_customer():
	# customer表中的数据存入字典，用于用户查询
	print('---------------------------->customer login<----------------------')
	name = input('please enter user:')
	address = input('please enter address:')
	tel = input('please enter telephone:')
	sql = '''select * from customer as c where c.name=%s and c.addr=%s and c.tel=%s
	'''
	count = cd.cs.execute(sql, [name, address, tel])
	print('--->1<---', count)

	# customer表验证登陆用户是否合法
	if count == 0:
		print('------------------------------>login fail<--------------------')
		print('-------------->user info has errors, please check<------------')	
	else:
		sql = '''select * from customer as c where c.name=%s and c.addr=%s and c.tel=%s
		'''
		count = cd.cs.execute(sql, [name, address, tel])
		cid = cd.cs.fetchone()
		# print('------>2<--------', cid)
		cd.customer_dict['id'] = cid[0]
		cd.customer_dict['name'] = name
		cd.customer_dict['address'] = address
		cd.customer_dict['tel'] = tel
		print('------------------->login success<----------------------------')
		print('your personal info:\tid\tname\taddress\ttel\n\t\t%s\t%s\t%s\t%s' % cid)


# 用户注册
def register_customer():
	print('-------------------->customer register<---------------------------')
	name = input('please enter user:')
	address = input('please enter address:')
	tel = input('please enter telephone:')
	sql = '''select * from customer as c where c.name=%s and c.addr=%s and c.tel=%s
	'''
	count = cd.cs.execute(sql, [name, address, tel])
	# print('--->1<---', count)

	# customer表中写入数据，若数据已经存在，就不写入
	if count == 0:
		sql = '''insert into customer values (0, %s, %s ,%s)
		'''
		count = cd.cs.execute(sql, [name, address, tel])
		cd.conn.commit()
		result = cd.cs.fetchone()
		# print('------>2<--------', result)

		sql = '''select * from customer as c where c.name=%s and c.addr=%s and c.tel=%s
		'''
		count = cd.cs.execute(sql, [name, address, tel])
		# print('------>3<--------', count)

		cid = cd.cs.fetchone()
		# print('------>4<--------', cid)

		print('----------------->register success<---------------------------')
		print('your personal info:\tid\tname\taddress\ttel\n\t\t\t\t\t\t%s\t%s\t%s\t%s' % cid)	
	else:
		print('------------------>register fail<-----------------------------')
		print('------------------->the personal info is using<---------------')	


def close():
	cd.cs.close()
	cd.conn.close()
	print('---------------------------->数据库关闭<----------------------------')


def _main():
	create()
	query_goods()
	close()


if __name__ == '__main__':
	_main()