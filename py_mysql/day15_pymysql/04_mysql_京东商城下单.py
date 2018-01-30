import mysql_basic as mb
import core_data as cd


def exit_instant():
	mb.exit_system()


def logoff():
	mb.logoff_customer()


def order():
	mb.query_customer()
	mb.insert_order()
	mb.insert_order_detail()


def login():
	mb.login_customer()


def register():
	mb.register_customer()


def print_goods():
	mb.query_goods()


def connect_db():
	mb.create()


def close_db():
	mb.close()


def print_menu():
	print('******************order****************')
	print('********* 1.查看所有商品信息 **********')
	print('********* 2.用户注册        ***********')
	print('********* 3.用户登陆        ***********')
	print('********* 4.用户下单        ***********')
	print('********* 5.用户下线        ***********')	
	print('********* 6.退出系统        ***********')	
	print('******************end******************')


def _main():
	connect_db()	
	while(True):
		print_menu()
		cmd = input('please enter the service num:')
		if cmd == '1':
			print_goods()
		elif cmd == '2':
			register()
		elif cmd == '3':
			circle_times = 3
			for i in range(circle_times):
				login()
				print(cd.customer_dict)
				if cd.customer_dict:
					print('---------->这是第%d次登录成功<---------' % (i+1))
					break
				else:
					print('---------->这是第%d次登录失败<---------' % (i+1))
			else:
				print('---------->%d次登录失败都失败了，请检查您的信息并重新登录<---------' % circle_times)
		elif cmd == '4':
			order()
		elif cmd == '5':
			logoff()
		elif cmd == '6':
			close_db()
			exit_instant()


if __name__ == '__main__':
	_main()
