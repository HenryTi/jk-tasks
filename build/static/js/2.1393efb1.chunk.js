(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{111:function(e,r,s){"use strict";s.r(r),s.d(r,"ChangePasswordPage",function(){return i});var a=s(0),t=s(1),n=s(3),o=s(8),i=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.schema=[{name:"orgPassword",type:"string",maxLength:60,required:!0},{name:"newPassword",type:"string",maxLength:60,required:!0},{name:"newPassword1",type:"string",maxLength:60,required:!0},{name:"submit",type:"submit"}],r.uiSchema={items:{orgPassword:{widget:"password",label:"\u539f\u5bc6\u7801",placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{widget:"password",label:"\u65b0\u5bc6\u7801",placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{widget:"password",label:"\u786e\u8ba4\u5bc6\u7801",placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",label:"\u63d0\u4ea4",className:"btn btn-primary"}}},r.onSubmit=function(e,s){return a.b(r,void 0,Promise,function(){var e,r,i,d;return a.e(this,function(a){switch(a.label){case 0:return e=s.data,r=e.orgPassword,i=e.newPassword,d=e.newPassword1,i!==d?(s.setError("newPassword1","\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"),[2]):[4,new o.c("tv/",void 0).changePassword({orgPassword:r,newPassword:i})];case 1:return!1===a.sent()?(s.setError("orgPassword","\u539f\u5bc6\u7801\u9519\u8bef"),[2]):(n.nav.replace(t.createElement(n.Page,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},t.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),[2])}})})},r}return a.d(r,e),r.prototype.render=function(){return t.createElement(n.Page,{header:"\u4fee\u6539\u5bc6\u7801"},t.createElement(n.Form,{className:"m-3",schema:this.schema,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,fieldLabelSize:2}))},r}(t.Component)}}]);
//# sourceMappingURL=2.1393efb1.chunk.js.map