# User API

## 请求返回
> 成功：`success`为`true`，如果需要返回的信息在`data`中返回
```
   {
        "success": true,
        "data": {}
   }
```
> 失败：`success`为`false`，错误信息在`msg`中
```
  {
      "success": false,
      "msg": "用户名已存在",
      "debug": "用户名已存在",
      "type": ""
  }
```
## 注册

* Path - /api/public/signup
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/public/signup

    Body:

    {
    	"username": "lijianxun",
    	"password": "123456",
      "confirmPassword": "123456",
      "types": [1, 2]
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 登录

* Path - /api/public/signin
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/public/signin

    Body:

    {
    	"username": "lijianxun",
    	"password": "123456"
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
      "success": true,
      "data": {
          "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3NTc0NjcwLWQ1NDQtMTFlOC05NTUxLTg3NTg0NmQxNzUzMyIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQwMjE1MTA3fQ.b-hDo6RZhXzZdyqNy9tyRNISiFE_ArYDnE0nL93HlSU"
      }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 获取当前登录用户详情

* Path - /api/users/me
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/users/me

    Header:
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc


如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "id": "697bf400-e1c8-11e8-8225-5f431bc9c468",
            "username": "lijianxun",
            "salt": "7d012bfa-a58b-4ed6-9fa5-e58194edd8c4",
            "avatar": null,
            "role": "common",
            "createdTime": "2018-11-06T13:32:31.427Z",
            "updatedTime": "2018-11-06T13:32:31.427Z",
            "follows": [
                {
                    "id": "740e1970-e1c8-11e8-8225-5f431bc9c468",
                    "userId": "697bf400-e1c8-11e8-8225-5f431bc9c468",
                    "type": 0,
                    "createdTime": "2018-11-06T13:32:49.159Z",
                    "updatedTime": "2018-11-06T13:32:49.159Z"
                },
                {
                    "id": "740e1971-e1c8-11e8-8225-5f431bc9c468",
                    "userId": "697bf400-e1c8-11e8-8225-5f431bc9c468",
                    "type": 1,
                    "createdTime": "2018-11-06T13:32:49.159Z",
                    "updatedTime": "2018-11-06T13:32:49.159Z"
                },
                {
                    "id": "740e1972-e1c8-11e8-8225-5f431bc9c468",
                    "userId": "697bf400-e1c8-11e8-8225-5f431bc9c468",
                    "type": 2,
                    "createdTime": "2018-11-06T13:32:49.159Z",
                    "updatedTime": "2018-11-06T13:32:49.159Z"
                }
            ]
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 添加关注类型

* Path - /api/follows
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/follows
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

    Body:

    {
    	"types": [0, 1, 2]
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
      "success": true
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 获取页面的截图及标题

* Path - /api/articles/screen-shot
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/articles/screen-shot
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

    Body:

    {
    	"link": "http://yc345.tv/teacher.html"
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "imageUrl": "http://localhost:4000/bce57f02-5b8e-4011-876c-16f516148043-1541511371012.jpg",
            "name": "bce57f02-5b8e-4011-876c-16f516148043-1541511371012.jpg"
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。


## 添加分享文章

* Path - /api/articles
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/articles
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

    Body:

    {
    	"type": 0,
    	"description": "我觉得很好，所以推荐",
    	"link": "http://yc345.tv/teacher.html",
    	"imageName": "db29fb43-4125-49e2-a4a8-8a32d8843528-1541513033694.jpg",
    	"isShare": true
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "id": "fb72cc30-e1cd-11e8-b594-11852866e9f1"
        }
    }
如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 获取当前用户文章列表

* Path - /api/users/articles
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/users/articles?type=-1&offset=0&limit=10
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

参数解释：

* `type` 文章类型，如果是全部分类的话`type`为`-1`，其他分类按字段
* `offset` 从第几个开始
* `limit` 取多少条


如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "offset": "0",
            "limit": "2",
            "dimension": "latest",
            "type": "-1",
            "total": 2,
            "data": [
                {
                    "id": "aec46a80-e955-11e8-849f-cfeb96519783",
                    "userId": "cdf74860-e954-11e8-9caa-e959de78edd5",
                    "type": 1,
                    "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                    "description": "我觉得很好，所以推荐",
                    "link": "http://yc345.tv/teacher.html",
                    "thumbPath": "96c081fd-105c-4da7-b474-41ead49f1efa-1542341155302.jpg",
                    "status": 0,
                    "isShare": true,
                    "createdTime": "2018-11-16T04:11:24.841Z",
                    "updatedTime": "2018-11-16T04:11:24.841Z"
                },
                {
                    "id": "498dec90-e955-11e8-9caa-e959de78edd5",
                    "userId": "cdf74860-e954-11e8-9caa-e959de78edd5",
                    "type": 0,
                    "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                    "description": "我觉得很好，所以推荐",
                    "link": "http://yc345.tv/teacher.html",
                    "thumbPath": "96c081fd-105c-4da7-b474-41ead49f1efa-1542341155302.jpg",
                    "status": 0,
                    "isShare": true,
                    "createdTime": "2018-11-16T04:08:35.034Z",
                    "updatedTime": "2018-11-16T04:08:35.034Z"
                }
            ]
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 获取首页文章列表（需登录）

* Path - /api/articles
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/articles?dimension=latest&type=-1&offset=0&limit=10
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

参数解释：

* `dimension` 查询维度可选：`latest`, `day`, `week`, `month`，对应 最新，日排行，周排行，月排行，默认`latest`
* `type` 文章类型，如果是全部分类的话`type`为`-1`，其他分类按字段
* `offset` 从第几个开始
* `limit` 取多少条


如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "offset": 0,
            "limit": 10,
            "type": -1,
            "total": 1,
            "data": [
                {
                    "articleId": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                    "stars": 0,
                    "pv": 0,
                    "dayPV": 0,
                    "dayStr": "2018-11-11",
                    "weekPV": 0,
                    "weekNumber": 46,
                    "monthPV": 0,
                    "monthStr": "2018-11",
                    "createdTime": "2018-11-11T15:39:38.019Z",
                    "updatedTime": "2018-11-11T15:39:38.019Z",
                    "article": {
                        "id": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                        "userId": "ecaf6390-e5c7-11e8-af7b-d9e59372b736",
                        "type": 0,
                        "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                        "description": "我觉得很好，所以推荐",
                        "link": "http://yc345.tv/teacher.html",
                        "thumbPath": "8664b539-2181-438c-a15b-904cfc18291d-1541950765753.jpg",
                        "status": 0,
                        "isShare": true,
                        "createdTime": "2018-11-11T15:39:38.014Z",
                        "updatedTime": "2018-11-11T15:39:38.014Z",
                        "user": {
                            "id": "ecaf6390-e5c7-11e8-af7b-d9e59372b736",
                            "username": "tom2",
                            "password": "1be88a34e0704c185c2579d0a3c29be481e16c39f331e7c6193a235b865bfdb5b2f89a4e",
                            "salt": "de73f561-3f1e-4751-aba6-ea0043af53a7",
                            "avatar": null,
                            "role": "common",
                            "createdTime": "2018-11-11T15:39:06.699Z",
                            "updatedTime": "2018-11-11T15:39:06.699Z"
                        }
                    }
                }
            ]
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 获取首页文章列表（不需要登录）

* Path - /api/public/articles
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/public/articles?dimension=latest&type=-1&offset=0&limit=10

参数解释：

* `dimension` 查询维度可选：`latest`, `day`, `week`, `month`，对应 最新，日排行，周排行，月排行，默认`latest`
* `type` 文章类型，如果是全部分类的话`type`为`-1`，其他分类按字段
* `offset` 从第几个开始
* `limit` 取多少条


如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "offset": 0,
            "limit": 10,
            "type": -1,
            "dimension": "latest",
            "total": 1,
            "data": [
                {
                    "articleId": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                    "stars": 0,
                    "pv": 0,
                    "dayPV": 0,
                    "dayStr": "2018-11-11",
                    "weekPV": 0,
                    "weekNumber": 46,
                    "monthPV": 0,
                    "monthStr": "2018-11",
                    "createdTime": "2018-11-11T15:39:38.019Z",
                    "updatedTime": "2018-11-11T15:39:38.019Z",
                    "article": {
                        "id": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                        "userId": "ecaf6390-e5c7-11e8-af7b-d9e59372b736",
                        "type": 0,
                        "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                        "description": "我觉得很好，所以推荐",
                        "link": "http://yc345.tv/teacher.html",
                        "thumbPath": "8664b539-2181-438c-a15b-904cfc18291d-1541950765753.jpg",
                        "status": 0,
                        "isShare": true,
                        "createdTime": "2018-11-11T15:39:38.014Z",
                        "updatedTime": "2018-11-11T15:39:38.014Z",
                        "user": {
                            "id": "ecaf6390-e5c7-11e8-af7b-d9e59372b736",
                            "username": "tom2",
                            "password": "1be88a34e0704c185c2579d0a3c29be481e16c39f331e7c6193a235b865bfdb5b2f89a4e",
                            "salt": "de73f561-3f1e-4751-aba6-ea0043af53a7",
                            "avatar": null,
                            "role": "common",
                            "createdTime": "2018-11-11T15:39:06.699Z",
                            "updatedTime": "2018-11-11T15:39:06.699Z"
                        }
                    }
                }
            ]
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 搜索

* Path - /api/search
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/search?keyword=洋葱&offset=0&limit=10
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc


如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "total": 1,
            "max_score": 1.3664899,
            "hits": [
                {
                    "_index": "notes",
                    "_type": "article",
                    "_id": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                    "_score": 1.3664899,
                    "_source": {
                        "createdAt": 1541950778022,
                        "link": "http://yc345.tv/teacher.html",
                        "description": "我觉得很好，所以推荐",
                        "thumbPath": "8664b539-2181-438c-a15b-904cfc18291d-1541950765753.jpg",
                        "type": 0,
                        "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                        "userId": "ecaf6390-e5c7-11e8-af7b-d9e59372b736"
                    },
                    "highlight": {
                        "content": [
                            "激发学生学习兴趣课后巩固查漏补缺，学生牢牢掌握知识点千所学校深度使用，赶快来加入全国万所中学使用，近千所中学的一线教师已将<span style=\"color:red\">洋葱</span>数学深度整合在日常教学流程中"
                        ]
                    }
                }
            ],
            "offset": 0,
            "limit": 10,
            "keyword": "洋葱"
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。

## 记录文章访问量

* Path - /api/articles/:id/visit
* 方法 - GET
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    GET /api/articles/ff595fa0-e5c7-11e8-af7b-d9e59372b736/visit
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

参数解释：

* `id` articleId 文章id

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true,
        "data": {
            "total": 1,
            "max_score": 1.3664899,
            "hits": [
                {
                    "_index": "notes",
                    "_type": "article",
                    "_id": "ff595fa0-e5c7-11e8-af7b-d9e59372b736",
                    "_score": 1.3664899,
                    "_source": {
                        "createdAt": 1541950778022,
                        "link": "http://yc345.tv/teacher.html",
                        "description": "我觉得很好，所以推荐",
                        "thumbPath": "8664b539-2181-438c-a15b-904cfc18291d-1541950765753.jpg",
                        "type": 0,
                        "title": "洋葱数学 —— 在线学数学，就找洋葱数学",
                        "userId": "ecaf6390-e5c7-11e8-af7b-d9e59372b736"
                    },
                    "highlight": {
                        "content": [
                            "激发学生学习兴趣课后巩固查漏补缺，学生牢牢掌握知识点千所学校深度使用，赶快来加入全国万所中学使用，近千所中学的一线教师已将<span style=\"color:red\">洋葱</span>数学深度整合在日常教学流程中"
                        ]
                    }
                }
            ],
            "offset": 0,
            "limit": 10,
            "keyword": "洋葱"
        }
    }

如果失败，则会返回400,500返回码,在Body中msg中返回error信息。


## 添加钉钉机器人

* Path - /api/ding-robots
* 方法 - POST
* 成功应答码 - 200
* 失败应答码 - 400、500

请求内容范例：

    POST /api/ding-robots
    Header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YmEyYjgwLWQ2OTMtMTFlOC1hOGIzLTNiMjVhZWJiYzJjOSIsInVzZXJuYW1lIjoibGlqaWFueHVuIiwiaWF0IjoxNTQxNDI1NTg5fQ.fx6aGKy7radO_sjPJZSIfc2UxRdtYrgafm7mzwA7sWc

    Body:

    {
    	"name": "洋葱分享",
    	"hookUrl": "https://oapi.dingtalk.com/robot/send?access_token=9d88a9d7e3a0df179f064727b23e8b8044b4ad9dcb3df84fff6f5445ca54ffc2"
    }

如果调用成功，服务会返回200返回码在返回Body附加信息：

    {
        "success": true
    }
如果失败，则会返回400,500返回码,在Body中msg中返回error信息。
