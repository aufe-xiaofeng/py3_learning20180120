# coding:utf-8
# author:xiaofeng
from envelopes import Envelope
envelope = Envelope(
    from_addr=('fengge475@163.com', 'cc'),
    to_addr=('1732279948@q.com', 'To Example'),
    subject='Envelopes demo',
    html_body='<h1>测试邮件</h1><h2>作者：sf</h2>',
    text_body="这是一封测试邮件",
    # cc_addr='boss1@example.com',
    # bcc_addr='boss2@example.com',
    headers='11',
    charset='utf-8',
)
# envelope.add_attachment('test.jpg')#附件

envelope.send('smtp.163.com', login='fengge475@163.com', password='8563qqq', tls=True)
