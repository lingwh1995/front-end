"use strict";(self["webpackChunkqrcode_generator_webui"]=self["webpackChunkqrcode_generator_webui"]||[]).push([[915],{3915:function(e,a,l){l.r(a),l.d(a,{default:function(){return h}});var r=l(6768);const n=e=>((0,r.Qi)("data-v-3be5594a"),e=e(),(0,r.jt)(),e),o={class:"app-container"},s={class:"login"},t=n((()=>(0,r.Lk)("div",{class:"header"}," 用户登录 ",-1))),u={class:"container"};function d(e,a,l,n,d,c){const i=(0,r.g2)("el-input"),p=(0,r.g2)("el-form-item"),m=(0,r.g2)("el-form");return(0,r.uX)(),(0,r.CE)("div",o,[(0,r.Lk)("div",s,[t,(0,r.Lk)("div",u,[(0,r.bF)(m,{model:n.user},{default:(0,r.k6)((()=>[(0,r.bF)(p,null,{default:(0,r.k6)((()=>[(0,r.bF)(i,{modelValue:n.user.username,"onUpdate:modelValue":a[0]||(a[0]=e=>n.user.username=e),type:"text",placeholder:"请输入用户名称",clearable:""},null,8,["modelValue"])])),_:1}),(0,r.bF)(p,{label:""},{default:(0,r.k6)((()=>[(0,r.bF)(i,{modelValue:n.user.password,"onUpdate:modelValue":a[1]||(a[1]=e=>n.user.password=e),type:"password",placeholder:"请输入用户密码",clearable:""},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])]),(0,r.Lk)("div",{class:"footer",onClick:a[2]||(a[2]=(...e)=>n.handleLogin&&n.handleLogin(...e))}," 登录 ")])])}l(4114);var c=l(144),i=l(2730);function p(e){return(0,i.A)({url:"/user/login",method:"POST",data:e})}var m=l(1219),b=l(1387),f={name:"Login",setup(){const e=(0,c.Kh)({username:"",password:""}),a=(0,b.rd)(),l=async()=>{const l=await p(e);if(200==l.code){const e=l.data;localStorage.setItem("token",e),a.push("/layout")}else(0,m.nk)({message:"用户名或密码输入错误，请重新输入。",type:"error",plain:!0})};return{user:e,handleLogin:l}}},k=l(1241);const g=(0,k.A)(f,[["render",d],["__scopeId","data-v-3be5594a"]]);var h=g}}]);
//# sourceMappingURL=915.db6d1765.js.map