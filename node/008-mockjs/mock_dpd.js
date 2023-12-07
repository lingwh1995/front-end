let Mock = require('mockjs');
/**
 * 1.id自增,起始值为5,,步长为1
 * 2.randomString为随机字符串
 * 3.randomNumber为随机数字
 * 4.birthday为随机日期,默认格式为yyyy-MM-dd
 * 5.pic为随机的图片地址
 * 6.desc为随机产生的汉字,但是只有一个汉字
 * 7.content为随机产生的汉字,有50个汉字
 * 8.home为随机产生的汉字,有1-10个汉字
 * 9.name为随机产生的中文姓名
 * 10.zwxs为随机产生的中文姓氏
 * 11.ywxs为随机生成的英文姓氏
 * 12.url为随机生成的url
 * 14.ip为随机生成的IP地址
 * 15.email为随机生成的email
 * 16.region为随机生成的地区
 * 17.county为随机生成的区县,如：西安市
 */
let mockData1 = Mock.mock({
    'list|5':[
        {
            'id|+1':5,
            'randomString':'@string',
            'randomNumber':'@integer',
            'birthday':'@date',
            'pic':'@image',
            'title':'@title',
            'desc':'@cword',
            'content':'@cword(50)',
            'home':'@cword(1,10)',
            'name':'@cname',
            'zwxs':'@cfirst',
            'ywxs':'@Last',
            'url':'@url',
            'ip':'@ip',
            'email':'@email',
            'region':'@region',
            'county':'@county'
        }
    ]    
});

console.log(JSON.stringify(mockData1,null,4));