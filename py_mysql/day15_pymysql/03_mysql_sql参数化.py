import pymysql


def query():
	find_goods = input('please enter the good:')
	conn = pymysql.connect(host='localhost', port=3306, database='jing_dong', user='root', password='mysql', charset='utf8')
	cs = conn.cursor()
	# sql参数化
	sql = 'select * from goods_cates where name=%s'
	count = cs.execute(sql, [find_goods])
	conn.commit()
	result = cs.fetchall()
	print(result)
	cs.close()
	conn.close()


def _main():
	query()


if __name__ == '__main__':
	_main()
