webpackJsonp([6,32,33],{"+YrF":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("RUzx"),o=s.n(a),i=s("bzuE").BASE_URL,l={name:"adduser",components:{Multiselect:o.a},data:function(){return{name:"",username:"",password:"",repassword:"",roles:[],type:1,options:[{roleGroup:"Người lao động",role:[{name:"NLD Duyệt 1",value:"nldC1"},{name:"NLD Duyệt 2",value:"nldC2"}]},{roleGroup:"Nhà tuyển dụng",role:[{name:"NTD Duyệt 1",value:"ntdC1"},{name:"NTD Duyệt 2",value:"ntdC2"}]}]}},methods:{close:function(){this.$emit("close")},handleSubmit:function(t){var e=this;t.preventDefault(),this.username.length>6?this.password===this.repassword?(this.$emit("close"),this.$http.post(i+"/admin/create",{name:this.name,username:this.username,password:this.password,type:this.type,roles:this.roles.map(function(t){return t.value})},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){e.name="",e.username="",e.password="",e.repassword="",e.roles=[],e.$http.get(i+"/admin/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){t.data&&e.$emit("inputData",t.data.data)})}).catch(function(t){console.error(t.response)})):alert("Mật khẩu phải giống nhau!"):alert("Tên đăng nhập quá ngắn!")}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"modal"}},[s("div",{staticClass:"modal-mask"},[s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",[s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Họ và Tên")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Tên đăng nhập")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Nhập lại mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.repassword,expression:"repassword"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.repassword},on:{input:function(e){e.target.composing||(t.repassword=e.target.value)}}})])]),t._v(" "),s("label",{staticClass:"col-sm-3 control-label"},[t._v("Phân quyền")]),t._v(" "),s("div",{staticClass:"col-sm-9 h-100"},[s("multiselect",{attrs:{options:t.options,value:"",multiple:!0,"group-values":"role","group-label":"roleGroup","group-select":!0,placeholder:"Type to search","track-by":"value",label:"name"},model:{value:t.roles,callback:function(e){t.roles=e},expression:"roles"}})],1),t._v("\n          "+t._s(t.roles)+"\n          "),s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("\n              Lưu\n            ")])])])])])])])},staticRenderFns:[]},n=s("VU/8")(l,r,!1,null,null,null);e.default=n.exports},FhL7:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"modal"}},[s("div",{staticClass:"modal-mask"},[s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",[s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),s("b-table",{attrs:{striped:"",bordered:"",hover:"",items:t.items,fields:t.fields,filter:t.filter}}),t._v(" "),s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("\n              Lưu\n            ")])])],1)])])])])},staticRenderFns:[]},o=s("VU/8")({name:"EditInvoiceType",data:function(){return{items:[{name:"Quản lí người lao động"},{name:"Quản lí vị trí tuyển dụng"},{name:"Quản lí hỗ trợ"},{name:"Quản lí thanh toán"}],fields:[{key:"name",label:"Quyền",sortable:!0,$isDisabled:!0},{key:"namex",label:"Thêm",sortable:!0,$isDisabled:!0},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"}]}},methods:{handleSubmit:function(){}},props:["itemid"]},a,!1,null,null,null);e.default=o.exports},dork:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("FhL7"),o=s("WRiz"),i=s("IgUE"),l=s("+YrF"),r=s("bzuE").BASE_URL,n={data:function(){return{encodedURL:"?token="+encodeURIComponent(localStorage.getItem("token")),filter:null,isModalVisible:!1,isModalEdit:!1,isModalEditVisible:!1,isModalViewCv:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),itemid:"",fields:[{key:"username",label:"Tên đăng nhập",sortable:!0,$isDisabled:!0},{key:"name",label:"Họ và tên",sortable:!0,$isDisabled:!0},{key:"status",label:"Kích hoạt",sortable:!0,thClass:"text-center"},{key:"show_details",label:"Kích hoạt",thClass:"text-center"},{key:"actions",label:"Thao tác",sortable:!1}]}},components:{editadmin:a.default,edituser:o.default,viewcv:i.default,AddAdmin:l.default},methods:{showModal:function(){this.isModalVisible=!0},showisModalEdit:function(t){this.itemid=t,this.isModalEdit=!0},showisModalViewCv:function(t){this.itemid=t,this.isModalViewCv=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},closeModalViewCv:function(){this.isModalViewCv=!1},clickCallback:function(t){var e=this;this.items=this.employees.filter(function(s,a){return(t-1)*e.perPage<=a&&a<t*e.perPage})},updateMessage:function(t){this.items=t},makeQueryParams:function(t,e,s){return{sortBy:t[0].field,sortOrder:t[0].direction,pageNo:e,pageSize:s}},editItem:function(t){if(t.password!=t.password2)return alert("Xác nhận mật khẩu không khớp");this.$http.put(r+"/admin/edit",{data:t},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){alert("Cập nhật thành công")}).catch(function(t){console.error(t.response)}),console.log(t)},deleteItem:function(t,e){var s=this;this.$confirm({message:"Bạn có muốn xóa "+e,button:{yes:"Đồng ý"},callback:function(e){e&&s.$http.get(r+"/employee/delete/"+t,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){s.$http.get(r+"/admin/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){s.items=t.data.data,s.totalRows=s.items.length})}).catch(function(t){console.error(t.response)})}})}},created:function(){var t=this;this.$http.get(r+"/admin/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){e.data&&(t.items=e.data.data,t.totalRows=t.items.length,void 0===t.$route.query.page&&(t.currentPage=1))})}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),t._v(" "),s("section",{staticClass:"panel panel-inverse"},[s("div",{staticClass:"row"},[s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.showModal}},[t._v("\n          Thêm người dùng\n        ")])]),t._v(" "),s("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[s("b-form-select",{staticClass:"form-control",attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" "),s("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[s("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1)],1),t._v(" "),s("b-table",{attrs:{striped:"",bordered:"",hover:"","sort-by":"approved",items:t.items,fields:t.fields,filter:t.filter},scopedSlots:t._u([{key:"cell(show_details)",fn:function(e){return[s("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("\n            "+t._s(e.detailsShowing?"Hide":"Show")+" Details\n          ")])]}},{key:"cell(job.status)",fn:function(e){var a=e.item;return[s("b",[t._v(t._s(a.job?t.displayJobStatus(a.job.status):""))])]}},{key:"cell(actions)",fn:function(e){var a=e.item;return[s("b-icon",{staticStyle:{margin:"auto 2px"},attrs:{icon:"trash",variant:"danger"},on:{click:function(e){return t.deleteItem(a._id,a.name)}}})]}},{key:"row-details",fn:function(e){return[s("b-row",[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-4 control-label"},[t._v("Mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-6"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.item.password,expression:"row.item.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:e.item.password},on:{input:function(s){s.target.composing||t.$set(e.item,"password",s.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-4 control-label"},[t._v("Xác nhận mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-6"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.item.password2,expression:"row.item.password2"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:e.item.password2},on:{input:function(s){s.target.composing||t.$set(e.item,"password2",s.target.value)}}})])])]),t._v(" "),s("b-col",{attrs:{cols:"12",md:"6"}},[s("b-form-group",{attrs:{label:"Nhóm chức năng NLĐ"},scopedSlots:t._u([{key:"default",fn:function(a){var o=a.ariaDescribedby;return[s("b-row",[s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o},model:{value:e.item.roles,callback:function(s){t.$set(e.item,"roles",s)},expression:"row.item.roles"}},[s("b",[t._v("Quản lí NLĐ:")]),s("br"),t._v(" "),s("b-form-checkbox",{attrs:{value:"nldC1"}},[t._v("Duyệt 1")]),t._v(" "),s("b-form-checkbox",{attrs:{value:"nldC2"}},[t._v("Duyệt 2")])],1)],1),t._v(" "),s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o}},[s("b",[t._v("Quản lí NLĐ:")]),s("br")])],1),t._v(" "),s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o}},[s("b",[t._v("Quản lí NLĐ:")]),s("br")])],1)],1)]}}],null,!0)})],1),t._v(" "),s("b-col",{attrs:{cols:"12",md:"6"}},[s("b-form-group",{attrs:{label:"Nhóm chức năng NTD"},scopedSlots:t._u([{key:"default",fn:function(a){var o=a.ariaDescribedby;return[s("b-row",[s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o},model:{value:e.item.roles,callback:function(s){t.$set(e.item,"roles",s)},expression:"row.item.roles"}},[s("b",[t._v("Quản lí NTD:")]),s("br"),t._v(" "),s("b-form-checkbox",{attrs:{value:"ntdC1"}},[t._v("Duyệt 1")]),t._v(" "),s("b-form-checkbox",{attrs:{value:"ntdC2"}},[t._v("Duyệt 2")])],1)],1),t._v(" "),s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o}},[s("b",[t._v("Quản lí NTD:")]),s("br")])],1),t._v(" "),s("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[s("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":o}},[s("b",[t._v("Quản lí NTD:")]),s("br")])],1)],1)]}}],null,!0)})],1)],1),t._v(" "),s("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("Hide Details")]),t._v(" "),s("b-button",{attrs:{size:"sm",variant:"success"},on:{click:function(s){return t.editItem(e.item)}}},[t._v("Lưu")])]}}])})],1),t._v(" "),s("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[s("paginate",{attrs:{"page-count":Math.ceil(t.totalRows/t.perPage),"page-range":3,"margin-pages":2,"click-handler":t.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),t._v(" "),s("viewcv",{directives:[{name:"show",rawName:"v-show",value:t.isModalViewCv,expression:"isModalViewCv"}],attrs:{itemid:t.itemid},on:{close:t.closeModalViewCv}}),t._v(" "),s("AddAdmin",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],on:{inputData:t.updateMessage,close:t.closeModal}}),t._v(" "),s("edituser",{directives:[{name:"show",rawName:"v-show",value:t.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{itemid:t.itemid},on:{close:t.closeEditModal}}),t._v(" "),s("editadmin",{directives:[{name:"show",rawName:"v-show",value:t.isModalEdit,expression:"isModalEdit"}],attrs:{itemid:t.itemid},on:{close:t.closeEditModal}})],1),t._v(" "),s("vue-confirm-dialog")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý nhân viên")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Danh sách nhân viên")])])])])}]},d=s("VU/8")(n,c,!1,null,null,null);e.default=d.exports}});
//# sourceMappingURL=6.b7cd5a5fe756bc06eabd.js.map