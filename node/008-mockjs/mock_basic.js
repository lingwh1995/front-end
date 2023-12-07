//生成一个列表数据,5条数据，包括id和name
let Mock = require('mockjs');
//模拟产生一条数据
let mockData1 = Mock.mock({
    'list':[
        {
            id:'1',
            name:'测试1'
        }
    ]
});
console.log(JSON.stringify(mockData1));
console.log('----------------------------------------------------------');

//模拟产生3到8条数据
let mockData2 = Mock.mock({
    'list|1-3':[
        {
            id:'1',
            name:'测试1'
        }
    ]
});
console.log(JSON.stringify(mockData2,null,4));
console.log('----------------------------------------------------------');

/**
 * 1.模拟产生五条相同的数据,
 * 2.格式化输出,TAB键规格为4个空白格
 * 3.id属性的值重复2-7遍
 * 4.name属性的值重复11遍
 * 5.age的值自增,步长为2(步长可以随意设置)
 * 6.no值最小为20,最大为55,产生的值可以重复
 * 7.money最小是1000.00,最大是5500.99,产生的值可以重复,小数位为小数点后两位
 * 8.生成的money1小数位为小数点后两位到5位之间
 * 9.flag为true或者false,出现true或者false的几率是相同的
 * 10.'school|count': object,从object中随机选取count个属性,但是数组中每个元素的school属性中包含的值都是固定的
 * 11.random:调用外部的方法,获取属性值,但是数组中每个元素的random属性中包含的值都是固定的
 */
let random = function(){
    return Math.random();
}
let mockData3 = Mock.mock({
    'list|5':[
        {
            'id|2-7':'1',
            'name|5':'测试5',
            'age|+2':2,
            'no|20-55':0,
            'money|1000-5500.2':0,
            'money1|1000-5500.2-5':0,
            'flag|1':true,
            'school|2':{schoolName:'ufe',schoolPlace:'changan',schoolLevel:'the top one!'},
            random:random()
        }
    ]
});
console.log(JSON.stringify(mockData3,null,4));
console.log('----------------------------------------------------------');

{
    page = _req.query.page;
      size = _req.query.size;
      let rows = [];
      for(let i=0;i<size;i++){
        let mockdata = Mock.mock({
          "id+1": "10000",
            "name": "@cname",
            "summary": "@string",
            "detail": "@string",
            "sponsor": "@string",
            "image": "@image",
            "starttime": "@date",
            "endtime": "@date",
            "address": "@county",
            "enrolltime": "@date",
            "state": "@string",
            "city": "@county",
            "date": "@date"
        });
        rows.push(mockdata);
      }
      let result = {}
      result.total = 100;
      result.rows = rows;
      return result;
      }
  }
