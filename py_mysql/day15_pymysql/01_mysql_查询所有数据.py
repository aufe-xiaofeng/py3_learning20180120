import pymysql


def query():
	conn = pymysql.connect(host='localhost', port=3306, database='jing_dong', user='root', password='mysql', charset='utf8')
	cs = conn.cursor()
	count = cs.execute('select * from goods')
	conn.commit()
	result = cs.fetchall()
	print(result)
	cs.close()
	conn.close()


def _main():
	query()


if __name__ == '__main__':
	_main()
