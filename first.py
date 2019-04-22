import json
#构造字典
python2json = {}
#构造list
listData = [1,2,3]
python2json["listData"] = listData
python2json["strData"] = "test python obj 2 json"

#转换成json字符串
data = json.dumps(python2json)

# Writing JSON data
with open('data.json', 'w') as f:
     json.dump(data, f)

# Reading data back
with open('data.json', 'r') as f:
     data = json.load(f)