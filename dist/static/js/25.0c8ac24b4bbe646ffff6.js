webpackJsonp([25],{"73sK":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"adduser",data:function(){return{name:"",username:"",password:"",repassword:"",email:"",phone:"",address:"",type:4,options:[{text:"Nhân viên",value:3},{text:"Người quản lý",value:2},{text:"Quản trị viên",value:1}]}},methods:{close:function(){this.$emit("close")},handleSubmit:function(t){var s=this;t.preventDefault(),this.username.length>6?this.password===this.repassword?(this.$emit("close"),this.$http.post("api/user/adduser",{name:this.name,username:this.username,password:this.password,email:this.email,phone:this.phone,address:this.address,type:this.type},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){s.name="",s.username="",s.password="",s.repassword="",s.email="",s.phone="",s.address="",s.$http.get("api/user/getallusers?page="+s.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return s.$emit("inputData",t.data)})}).catch(function(t){console.error(t.response)})):alert("Mật khẩu phải giống nhau!"):alert("Tên đăng nhập quá ngắn!")}},mounted:function(){}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"modal"}},[e("div",{staticClass:"modal-mask"},[e("div",{staticClass:"modal-wrapper"},[e("div",{staticClass:"modal-container"},[e("div",[e("div",{staticClass:"panel-body_modal"},[e("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(s){return t.$emit("close")}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Họ và Tên")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Tên đăng nhập")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(s){s.target.composing||(t.username=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Mật khẩu")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Nhập lại mật khẩu")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.repassword,expression:"repassword"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.repassword},on:{input:function(s){s.target.composing||(t.repassword=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Email")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Điện thoại")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.phone},on:{input:function(s){s.target.composing||(t.phone=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Địa chỉ")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.address},on:{input:function(s){s.target.composing||(t.address=s.target.value)}}})])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{staticClass:"col-sm-3 control-label"},[t._v("Phân quyền")]),t._v(" "),e("div",{staticClass:"col-sm-9"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],staticClass:"form-control",on:{change:function(s){var e=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.type=s.target.multiple?e:e[0]}}},t._l(t.options,function(s){return e("option",{domProps:{value:s.value}},[t._v("\n                  "+t._s(s.text)+"\n                ")])}),0)])]),t._v(" "),e("div",{staticClass:"panel-body_modal"},[e("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("Lưu")])])])])])])])},staticRenderFns:[]},l=e("VU/8")(a,o,!1,null,null,null);s.default=l.exports}});
//# sourceMappingURL=25.0c8ac24b4bbe646ffff6.js.map