---
title: "restfulapi实战避坑指南"
author: "李崎滨"
date: '2024-11-29'
slug: "restful-demo"
description: "restful-demo"
categories:
  - demo
tags:
  - restful
  - flask
disable_author_date: true
disable_donate: false
disable_comments: true
disable_adsense: true
disable_mathjax: false
disable_prismjs: true
---

# RESTFULAPI 实战避坑指南
文章基于这个[内容](https://docs.google.com/document/d/1v0l4TC2ZyFYyk6Y0ggFw86li2F6cwr5GLuTUyrzSpT4/edit?tab=t.0,一个restfulapi的小demo)：
学习过程中遇到如下问题：
- windows下venv环境激活涉及的powershell脚本权限
- flask相关命令行内容和上下文保持

下面是对应内容的补充展开，方便大家根据上面内容学习：
## winodws虚拟环境激活
注意windows环境下启用venv时候需要powershell的执行权限。参考https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#powershell-execution-policies
PolicyName选择AllSigned或者其他合适的
```
Set-ExecutionPolicy -ExecutionPolicy <PolicyName>
```

## 上下文保持细节
使用python代码调试falsk应用需要使得flask的环境在解释器中可访问，否则会出现outofcontext报错。使用 flask --app=application.py run以及 flask --app=application.py shell

# 实现了上述事情后你就可以体会到restfulapi的好处
在cmd中使用下列代码你就可以删除对应id的酒品（喝掉他）。
```
curl -X DELETE http://localhost:5000/drinks/1 

```

在cmd中使用下列代码你就可以新增内容字段。
```
curl -X POST http://localhost:5000/drinks \
     -H "Content-Type: application/json" \
     -d '{"name": "Your Drink Name", "description": "Your Drink Description"}'
```

在flask上下文中使用Drink.query.all()或者实际访问对应资源的url就可以验证。确实是确实非常的amazing啊。


flask源码参考（出处见上文链接）：
```
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)


class Drink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(120))

    def __repr__(self):
        return f"{self.name} - {self.description}"


@app.route('/')
def index():
    return 'Hello!'


@app.route('/drinks')
def get_drinks():
    drinks = Drink.query.all()

    output = []
    for drink in drinks:
        drink_data = {'name': drink.name, 'description': drink.description}

        output.append(drink_data)

    return {"drinks": output}


@app.route('/drinks/<id>')
def get_drink(id):
    drink = Drink.query.get_or_404(id)
    return {"name": drink.name, "description": drink.description}


@app.route('/drinks', methods=['POST'])
def add_drink():
    drink = Drink(name=request.json['name'],
                  description=request.json['description'])
    db.session.add(drink)
    db.session.commit()
    return {'id': drink.id}


@app.route('/drinks/<id>', methods=['DELETE'])
def delete_drink(id):
    drink = Drink.query.get(id)
    if drink is None:
        return {"error": "not found"}
    db.session.delete(drink)
    db.session.commit()
    return {"message": "yeet!@"}
```