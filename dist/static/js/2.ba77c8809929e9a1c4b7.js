webpackJsonp([2,19],{DNBb:function(t,e){},Di0L:function(t,e){},"Krf/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("kudI"),a=i("XboE"),s=i("dbxL"),o=i("v5cT"),r=i("bzuE").BASE_URL,l={data:function(){return{filter:null,isModalConfirm:!1,isModalVisible:!1,isModalEditVisible:!1,isModalViewGPKD:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),itemid:"",fields:[{key:"name",label:"Tên công ty",sortable:!0,value:""},{key:"username",label:"Mã số thuế",sortable:!0,value:""},{key:"address",label:"Địa chỉ",sortable:!0,value:""},{key:"usernjame",label:"Tình trạng hoạt động",sortable:!0,value:""},{key:"urlGPKD",label:"Giấy ĐKKD",sortable:!0,value:""},{key:"use",label:"Người đại diện",sortable:!0,value:""},{key:"confirm1.status",label:"Trạng thái duyệt 1",sortable:!0,thClass:"text-center",value:"ntdC1"},{key:"confirm1.confirmAt",label:"Thời gian duyệt 1",sortable:!0,thClass:"text-center",value:"ntdC1"},{key:"confirm1.confirmBy",label:"Người duyệt 1",sortable:!0,thClass:"text-center",value:"ntdC1"},{key:"confirm2.status",label:"Trạng thái duyệt 2",sortable:!0,thClass:"text-center",value:"ntdC2"},{key:"confirm2.confirmAt",label:"Thời gian duyệt 2",sortable:!0,thClass:"text-center",value:"ntdC2"},{key:"confirm2.confirmBy",label:"Người duyệt 2",sortable:!0,thClass:"text-center",value:"ntdC2"},{key:"actions",label:"Thao tác",sortable:!1,value:""}]}},components:{adduser:n.default,edituser:a.default,viewGPKD:s.default,confirmModal:o.default},methods:{ConfirmModal:function(t){this.isModalConfirm=!0,this.itemid=t},closeConfirmModal:function(){this.isModalConfirm=!1},showisModalEditVisible:function(t){this.itemid=t,this.isModalEditVisible=!0},showModal:function(t){this.itemid=t,this.isModalVisible=!0},showModalViewGPKD:function(t){this.itemid=t,this.isModalViewGPKD=!0},closeModalViewGPKD:function(){this.isModalViewGPKD=!1},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},handleConfirm1:function(t){t.status=-1},getStatusConfirm:function(t){switch(t=parseInt(t)){case-1:return"Không được duyệt";case 0:return"Đang chờ duyệt";case 1:return"Đã được duyệt"}},displayGPKDStatus:function(t){switch(t){case-1:return"Không đủ điều kiện";case 0:return"Đang chờ duyệt";case 1:return"Đã được duyệt"}},clickCallback:function(t){var e=this;this.$http.get(r+"/employee/getall?page="+t,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return e.items=t.data})},updateMessage:function(t){this.items=t},deleteItem:function(t,e){var i=this;this.$confirm({message:"Bạn có muốn xóa "+e,button:{yes:"Đồng ý"},callback:function(e){e&&i.$http.get(r+"/business/delete/"+t,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){i.$http.get(r+"/business/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.items=t.data}),i.$http.get("api/user/getcountuser",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.totalRows=t.data})}).catch(function(t){console.error(t.response)})}})}},created:function(){var t=this;this.$http.get(r+"/admin/me",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){if(e.data){var i=e.data;console.log(i),t.fields=t.fields.filter(function(t){return""===t.value||(console.log(i.roles.includes(t.value)),i.roles.includes(t.value))})}}),this.$http.get(r+"/business/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){t.items=e.data,t.totalRows=t.items.length,void 0===t.$route.query.page&&(t.currentPage=1)})}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("div",{staticClass:"panel-body"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.showModal}},[t._v("\n          Thêm nhân viên\n        ")])]),t._v(" "),i("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[i("b-form-select",{staticClass:"form-control",attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" "),i("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[i("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1)],1),t._v(" "),i("b-table",{attrs:{striped:"",bordered:"",hover:"",items:t.items,fields:t.fields,filter:t.filter},scopedSlots:t._u([{key:"cell(urlGPKD)",fn:function(e){var n=e.item;return[i("b-link",{on:{click:function(e){return t.showModalViewGPKD(n)}}},[t._v("Xem giấy ĐKKD")])]}},{key:"cell(address)",fn:function(e){var i=e.item;return[t._v("\n          "+t._s(i.address+", "+i.ward+", "+i.district+", "+i.province)+"\n        ")]}},{key:"cell(confirm1.status)",fn:function(e){var n=e.item;return[i("div",{on:{click:function(e){1!=n.confirm2.status&&t.ConfirmModal(n.confirm1)}}},[i("div",{class:1==n.confirm1.status?"status-confirm active":"status-confirm"}),t._v("\n            "+t._s(t.getStatusConfirm(n.confirm1.status))+"\n          ")])]}},{key:"cell(confirm1.confirmAt)",fn:function(e){var i=e.item;return[t._v("\n          "+t._s(i.confirm1&&0!==i.confirm1.status?new Date(i.confirm1.confirmAt).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"short",day:"numeric"}):"")+"\n        ")]}},{key:"cell(confirm1.confirmBy)",fn:function(e){var i=e.item;return[t._v("\n          "+t._s(i.confirm1&&0!==i.confirm1.status?i.confirm1.confirmBy:"")+"\n        ")]}},{key:"cell(confirm2.status)",fn:function(e){var n=e.item;return[i("div",{on:{click:function(e){1==n.confirm1.status&&t.ConfirmModal(n.confirm2)}}},[i("div",{class:1==n.confirm2.status?"status-confirm active":"status-confirm"}),t._v("\n            "+t._s(t.getStatusConfirm(n.confirm2.status))+"\n          ")])]}},{key:"cell(confirm2.confirmAt)",fn:function(e){var i=e.item;return[t._v("\n          "+t._s(i.confirm2&&0!==i.confirm2.status?new Date(i.confirm2.confirmAt).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"short",day:"numeric"}):"")+"\n        ")]}},{key:"cell(confirm2.confirmBy)",fn:function(e){var i=e.item;return[t._v("\n          "+t._s(i.confirm2&&1==i.confirm2.status?i.confirm2.confirmBy:"")+"\n        ")]}},{key:"cell(actions)",fn:function(e){var n=e.item;return[i("b-icon",{staticStyle:{margin:"auto"},attrs:{icon:"trash",variant:"danger"},on:{click:function(e){return t.deleteItem(n._id,n.name)}}})]}}])})],1),t._v(" "),i("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[i("paginate",{attrs:{"page-count":Math.ceil(t.totalRows/t.perPage),"page-range":3,"margin-pages":2,"click-handler":t.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),t._v(" "),i("viewGPKD",{directives:[{name:"show",rawName:"v-show",value:t.isModalViewGPKD,expression:"isModalViewGPKD"}],attrs:{itemid:t.itemid},on:{close:t.closeModalViewGPKD}}),t._v(" "),i("adduser",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],on:{inputData:t.updateMessage,close:t.closeModal}}),t._v(" "),i("confirmModal",{directives:[{name:"show",rawName:"v-show",value:t.isModalConfirm,expression:"isModalConfirm"}],attrs:{itemid:t.itemid},on:{close:t.closeConfirmModal}})],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý người dùng")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Danh sách người dùng")])])])])}]};var u=i("VU/8")(l,c,!1,function(t){i("Di0L")},"data-v-7703e7e8",null);e.default=u.exports},v5cT:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-confirm"},[i("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$emit("close")}}},[t._v("Bỏ qua")]),t._v(" "),i("b-button",{attrs:{variant:"success"},on:{click:t.confirm}},[t._v("Duyệt")]),t._v(" "),i("b-button",{attrs:{variant:"danger"},on:{click:t.notConfirm}},[t._v("Không duyệt")]),t._v(" "),i("b-button",{attrs:{variant:"info"},on:{click:t.cancelConfirm}},[t._v("Chờ duyệt")])],1)},staticRenderFns:[]};var a=i("VU/8")({name:"ConfirmModal",data:function(){return{}},methods:{confirm:function(){this.itemid.status=1,this.$emit("close")},notConfirm:function(){this.itemid.status=-1,this.$emit("close")},cancelConfirm:function(){this.itemid.status=0,this.$emit("close")}},props:["itemid"]},n,!1,function(t){i("DNBb")},"data-v-1f260578",null);e.default=a.exports}});
//# sourceMappingURL=2.ba77c8809929e9a1c4b7.js.map