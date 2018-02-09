CREATE database yiyan_api

use yiyan_api

CREATE TABLE test(
    i int AUTO_INCREMENT,
    hitokoto nvarchar(255),
    catname nvarchar(255),
    data nvarchar(100),
    author nvarchar(100),
    source nvarchar(100),
    id nvarchar(20),
		PRIMARY KEY(i)
)
