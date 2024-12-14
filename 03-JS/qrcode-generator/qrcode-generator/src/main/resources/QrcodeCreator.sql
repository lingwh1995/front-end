-- create database QrCodeGenerator;
create table t_product
(
    id int identity(1,1) primary key,   --id主键 自增长,
    productName varchar(20),            --产品名称
    productModel varchar(20),            --产品型号
    productModelId varchar(2),          --产品型号Id
    createTime datetime,                --创建时间
    updateTime datetime                 --更新时间
)                                       --产品表

CREATE TABLE Tree (
      Id INT,
      ParentId INT,
      Name VARCHAR(50)
)
-- 插入示例数据
INSERT INTO Tree (Id, ParentId, Name) VALUES (1, NULL, 'Root')
INSERT INTO Tree (Id, ParentId, Name) VALUES (2, 1, 'Child 1')
INSERT INTO Tree (Id, ParentId, Name) VALUES (3, 1, 'Child 2')
INSERT INTO Tree (Id, ParentId, Name) VALUES (4, 2, 'Grandchild 1')
INSERT INTO Tree (Id, ParentId, Name) VALUES (5, 3, 'Grandchild 2')

-- 递归查询
WITH RecursiveQuery AS (
    SELECT *
    FROM t_product_dict_type
    WHERE dict_parent_id = 0 -- 递归起始条件
    UNION ALL
    SELECT D.*
    FROM t_product_dict_type D
             INNER JOIN RecursiveQuery R ON D.dict_parent_id = R.dict_id -- 递归公式
)
SELECT R.*
FROM RecursiveQuery R
WHERE R.dict_status = '0' and R.dict_level <=2

create table t_rule
(
    id int identity(1,1) primary key,       --规则表主键
    rule_name    varchar(30),               --规则名称
    rule_number  varchar(20),               --规则编号
    rule_status  char(1),                   --规则启用状态[0:正常,1停用]
    scheme_id   varchar(32),                --方案id
    rule_id    varchar(32),                 --规则唯一标识
    rule_comments    varchar(100),          --规则备注
    create_time datetime,                   --创建时间
    update_time datetime                    --更新时间
)                                           --规则表

create table t_rule_field (
    id int identity(1,1) primary key,         --规则字段表主键
    rule_id varchar(32),                      --规则唯一标识
    rule_field_category_code varchar(4),      --规则字段类型代码
    rule_field_category_name varchar(30),     --规则字段类型名称
    rule_field_name varchar(30),              --规则字段名称
    rule_field_value varchar(200),            --规则字段的值
    rule_field_fill_strategy  varchar(200),   --规则字段补齐策略
    rule_field_reset_strategy  varchar(20),   --规则字段补齐策略
    rule_field_association_tab_index int     --当前字段关联的标签页的索引值
)

create table t_scheme
(
    id int identity(1,1) primary key,       --方案表主键
    scheme_id varchar(32),                  --方案唯一标识
    scheme_name varchar(50),                --方案名称
    scheme_comments varchar(200),           --方案备注
    scheme_status  char(1),                 --方案启用状态[0:正常,1停用]
    create_time datetime,                   --创建时间
    update_time datetime                    --更新时间
)                                           --方案表

create table t_barcodes(
    id int identity(1,1) primary key,       --条码表主键
    scheme_id varchar(32),                  --与该条条码相互关联的方案的唯一标识
    scheme_Name varchar(50),                --方案名称
    rule_id varchar(32),                    --与该条条码相互关联的规则的唯一标识
    rule_Name varchar(50),                  --规则名称
    batch_id varchar(32),                   --生成批次id，
    batch_amount int,                       --该批次生成的条码的数量
    barcodes_value text,                    --条码值,
    create_time datetime                    --生成时间
)                                           --条码表

create table t_template(
   id int identity(1,1) primary key,       --模板表主键
   scheme_id varchar(32),                  --与该条条码相互关联的方案的唯一标识
   scheme_name varchar(50),                --方案名称
   rule_id varchar(32),                    --与该条条码相互关联的规则的唯一标识
   rule_name varchar(50),                  --规则名称
   template_name varchar(30),               --模板名称
   template_status  char(1),               --模板启用状态[0:正常,1停用]
   template_type char(1),                  --模板类型
   template_content varchar(200),          --模板内容
   create_time datetime,                   --生成时间
   update_time datetime                    --更新时间
)                                          --模板表

create table t_dict (
    id int identity(1,1) primary key,      --字典表主键
    dict_name varchar(100),                --字典名称
    dict_code varchar(32),                 --字典代码
    dict_data varchar(100),                --字典数据
    dict_sort int,                         --字典排序
    dict_desc varchar(100),                --字典描述
    dict_status char,                      --字典状态
    parent_id int,                         --父节点id
    level int,                             --层级
    scheme_id varchar(32)                  --方案id
);

-- 用户表
create table t_user
(
    id int identity(1,1) primary key,      --用户表主键
    user_name   varchar(30)                not null comment '用户账号', --用户账号
    password    varchar(50)                not null comment '用户密码', --用户密码
    nick_name   varchar(64)                not null comment '用户名称', --用户名称
    remark      varchar(255)               null comment '备注'         --用户备注
);
