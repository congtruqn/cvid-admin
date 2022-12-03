webpackJsonp([5,29,30],{SXHo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"EditInvoiceType",data:function(){return{projects:[{text:"Thương mại",value:1},{text:"Thiết kế",value:2},{text:"Thi công",value:3}]}},methods:{handleSubmit:function(){this.editid.project_name.length>0&&(this.$emit("close"),this.$http.post("api/projects/editproject",{project_name:this.editid.project_name,project_id:this.editid.project_id,project_type:this.editid.project_type,id:this.editid._id},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){}).catch(function(t){console.error(t.response)}))}},props:["editid"]},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"modal"}},[i("div",{staticClass:"modal-mask"},[i("div",{staticClass:"modal-wrapper"},[i("div",{staticClass:"modal-container"},[i("div",[i("div",{staticClass:"panel-body_modal"},[i("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Tên dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.project_name,expression:"editid.project_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.project_name},on:{input:function(e){e.target.composing||t.$set(t.editid,"project_name",e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Mã dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.project_id,expression:"editid.project_id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.project_id},on:{input:function(e){e.target.composing||t.$set(t.editid,"project_id",e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Loại dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.editid.project_type,expression:"editid.project_type"}],staticClass:"form-control",on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.editid,"project_type",e.target.multiple?i:i[0])}}},t._l(t.projects,function(e){return i("option",{domProps:{value:e.value}},[t._v("\n                  "+t._s(e.text)+"\n                ")])}),0)])]),t._v(" "),i("div",{staticClass:"panel-body_modal"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("\n              Lưu\n            ")])])])])])])])},staticRenderFns:[]},s=i("VU/8")(a,o,!1,null,null,null);e.default=s.exports},Wa8j:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("pEP4"),o=i("SXHo"),s=i("XW0x"),n=i.n(s),c={data:function(){return{isModalVisible:!1,isModalEditVisible:!1,listinvoicetypes:"",countinvoicetype:"",project_date:"",page:Number(this.$route.query.page),editid:""}},components:{AddInvoiceType:a.default,EditInvoiceType:o.default},methods:{todate:function(t){return n.a.timestamptodate(t)},displayProjectType:function(t){switch(t){case 1:return"Thương mại";case 2:return"Thiết kế";default:return"Thi công"}},showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(t){this.editid=t,this.isModalEditVisible=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},clickCallback:function(t){var e=this;this.$http.get("api/projects/getallprojects?page="+t,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return e.listinvoicetypes=t.data})},updateMessage:function(t){this.listinvoicetypes=t},dellInvoiceType:function(t,e){var i=this;this.$confirm({message:"Bạn có muốn xóa loại hóa đơn "+e,button:{yes:"Đồng ý"},callback:function(e){e&&i.$http.post("api/projects/dellproject",{id:t},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){i.$http.get("api/projects/getallprojects?page="+i.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.listinvoicetypes=t.data}),i.$http.get("api/projects/getcountprojects",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.countinvoicetype=t.data})}).catch(function(t){console.error(t.response)})}})}},mounted:function(){var t=this;void 0==this.$route.query.page&&(this.page=1),this.$http.get("api/projects/getallprojects?page="+this.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){t.listinvoicetypes=e.data}),this.$http.get("api/projects/getcountprojects",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return t.countinvoicetype=e.data})}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("div",{staticClass:"panel-body"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.showModal}},[t._v("Thêm dự án")])]),t._v(" "),i("table",{staticClass:"table"},[t._m(1),t._v(" "),i("tbody",t._l(t.listinvoicetypes,function(e,a){return i("tr",{key:a},[i("td",[t._v(t._s(20*(t.page-1)+a+1))]),t._v(" "),i("td",[t._v(t._s(e.project_name))]),t._v(" "),i("td",[t._v(t._s(e.project_id))]),t._v(" "),i("td",[t._v(t._s(t.displayProjectType(e.project_type)))]),t._v(" "),i("td",[t._v(t._s(t.todate(e.create_date)))]),t._v(" "),i("td",[i("span",[i("a",{attrs:{href:"#"},on:{click:function(i){return t.showisModalEditVisible(e)}}},[i("i",{staticClass:"fa fa-edit"})])])]),t._v(" "),i("td",[i("a",{attrs:{href:"#"},on:{click:function(i){return t.dellInvoiceType(e._id,e.project_name)}}},[i("i",{staticClass:"fa fa-trash"})])])])}),0)])]),t._v(" "),i("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[i("paginate",{attrs:{"page-count":t.countinvoicetype/20,"page-range":3,"margin-pages":2,"click-handler":t.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),t._v(" "),i("AddInvoiceType",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],on:{inputData:t.updateMessage,close:t.closeModal}}),t._v(" "),i("EditInvoiceType",{directives:[{name:"show",rawName:"v-show",value:t.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{editid:t.editid},on:{close:t.closeEditModal}})],1),t._v(" "),i("vue-confirm-dialog")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý dự án")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Danh sách dự án")])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("th",{attrs:{width:"25px"}},[t._v("STT")]),t._v(" "),i("th",[t._v("Tên dự án")]),t._v(" "),i("th",[t._v("Mã dự án")]),t._v(" "),i("th",[t._v("Loại dự án")]),t._v(" "),i("th",[t._v("Ngày tạo")]),t._v(" "),i("th",{staticClass:"functionicon",attrs:{width:"15px"}}),t._v(" "),i("th",{staticClass:"functionicon",attrs:{width:"15px"}})])])}]},l=i("VU/8")(c,r,!1,null,null,null);e.default=l.exports},pEP4:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"AddInvoiceType",data:function(){return{project_id:"",project_name:"",project_type:"",listinvoicetypes:"",projects:[{text:"Thương mại",value:1},{text:"Thiết kế",value:2},{text:"Thi công",value:3}]}},methods:{close:function(){this.$emit("close")},handleSubmit:function(t){var e=this;t.preventDefault(),this.project_name.length>0?(this.$emit("close"),this.$http.post("api/projects/addproject",{project_name:this.project_name,project_id:this.project_id,project_type:this.project_type},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){e.project_name="",e.project_id="",e.$http.get("api/projects/getallprojects?page="+e.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return e.$emit("inputData",t.data)})}).catch(function(t){console.error(t.response)})):alert("Vui lòng nhập tên dự án")}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"modal"}},[i("div",{staticClass:"modal-mask"},[i("div",{staticClass:"modal-wrapper"},[i("div",{staticClass:"modal-container"},[i("div",[i("div",{staticClass:"panel-body_modal"},[i("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Tên dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.project_name,expression:"project_name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.project_name},on:{input:function(e){e.target.composing||(t.project_name=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Mã dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.project_id,expression:"project_id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.project_id},on:{input:function(e){e.target.composing||(t.project_id=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"form-group"},[i("label",{staticClass:"col-sm-2 control-label"},[t._v("Loại dự án")]),t._v(" "),i("div",{staticClass:"col-sm-10"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.project_type,expression:"project_type"}],staticClass:"form-control",on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.project_type=e.target.multiple?i:i[0]}}},t._l(t.projects,function(e){return i("option",{domProps:{value:e.value}},[t._v("\n                  "+t._s(e.text)+"\n                ")])}),0)])]),t._v(" "),i("div",{staticClass:"panel-body_modal"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("Lưu")])])])])])])])},staticRenderFns:[]},s=i("VU/8")(a,o,!1,null,null,null);e.default=s.exports}});
//# sourceMappingURL=5.1dfa5c0f3d7c32fdbc99.js.map