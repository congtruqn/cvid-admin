webpackJsonp([17],{wL49:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("kudI"),s=a("XboE"),l=a("dbxL"),n=a("RUzx"),o=a.n(n),r=a("bzuE").BASE_URL,c={data:function(){return{filter:null,isModalVisible:!1,isModalEditVisible:!1,isModalViewGPKD:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),itemid:"",fields:[{key:"name",label:"Tên công ty",sortable:!0,$isDisabled:!0},{key:"username",label:"Mã số thuế",sortable:!0,$isDisabled:!0},{key:"createAt",label:"Thời gian đăng kí",sortable:!0,thClass:"text-center"},{key:"manager",label:"Người đăng kí",sortable:!0,thClass:"text-center"},{key:"position",label:"Chức vụ",sortable:!0,thClass:"text-center"},{key:"phone",label:"Số điện thoại",sortable:!0,thClass:"text-center"},{key:"email",label:"Email",sortable:!0,thClass:"text-center"},{key:"status",label:"Trạng thái",sortable:!0,thClass:"text-center"},{key:"actions",label:"Thao tác",sortable:!1}]}},components:{adduser:i.default,edituser:s.default,viewGPKD:l.default,Multiselect:o.a},methods:{showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(e){this.itemid=e,this.isModalEditVisible=!0},showModalViewGPKD:function(e){this.itemid=e,this.isModalViewGPKD=!0},closeModalViewGPKD:function(){this.isModalViewGPKD=!1},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},clickCallback:function(e){var t=this;this.$http.get(r+"/employee/getall?page="+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return t.items=e.data})},updateMessage:function(e){this.items=e},deleteItem:function(e,t){var a=this;this.$confirm({message:"Bạn có muốn xóa "+t,button:{yes:"Đồng ý"},callback:function(t){t&&a.$http.get(r+"/business/delete/"+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){a.$http.get(r+"/business/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return a.items=e.data}),a.$http.get("api/user/getcountuser",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return a.totalRows=e.data})}).catch(function(e){console.error(e.response)})}})}},created:function(){var e=this;this.$http.get(r+"/business/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){e.items=t.data,e.totalRows=t.data.length,void 0===e.$route.query.page&&(e.currentPage=1)})}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("section",{staticClass:"panel panel-inverse"},[a("div",{staticClass:"row"},[a("div",{staticClass:"panel-body"},[a("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:e.showModal}},[e._v("\n          Thêm người dùng\n        ")])]),e._v(" "),a("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[a("b-form-select",{staticClass:"form-control",attrs:{options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" "),a("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[a("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)],1),e._v(" "),a("b-table",{attrs:{striped:"",bordered:"",hover:"",items:e.items,fields:e.fields,filter:e.filter},scopedSlots:e._u([{key:"cell(status)",fn:function(t){var a=t.item;return[e._v("\n          "+e._s(1===a.status?"Đã xác nhận":"Chưa xác nhận")+"\n        ")]}},{key:"cell(actions)",fn:function(t){var i=t.item;return[a("b-icon",{staticStyle:{margin:"auto"},attrs:{icon:"trash",variant:"danger"},on:{click:function(t){return e.deleteItem(i._id,i.name)}}})]}}])})],1),e._v(" "),a("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[a("paginate",{attrs:{"page-count":Math.ceil(e.totalRows/e.perPage),"page-range":3,"margin-pages":2,"click-handler":e.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),a("viewGPKD",{directives:[{name:"show",rawName:"v-show",value:e.isModalViewGPKD,expression:"isModalViewGPKD"}],attrs:{itemid:e.itemid},on:{close:e.closeModalViewGPKD}}),e._v(" "),a("adduser",{directives:[{name:"show",rawName:"v-show",value:e.isModalVisible,expression:"isModalVisible"}],on:{inputData:e.updateMessage,close:e.closeModal}}),e._v(" "),a("edituser",{directives:[{name:"show",rawName:"v-show",value:e.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{itemid:e.itemid},on:{close:e.closeEditModal}})],1),e._v(" "),a("vue-confirm-dialog")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"content-header"},[t("h1",[this._v("Quản lý người dùng")]),this._v(" "),t("ol",{staticClass:"breadcrumb"},[t("li",[t("a",[t("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),t("li",[t("a",[this._v("Danh sách người dùng")])])])])}]},u=a("VU/8")(c,d,!1,null,null,null);t.default=u.exports}});
//# sourceMappingURL=17.35252ffc57cbcfb30770.js.map