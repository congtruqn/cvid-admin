webpackJsonp([14],{BsAF:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("kudI"),a=i("XboE"),s=i("dbxL"),r=i("RUzx"),o=i.n(r),l=i("eVRm"),c=i("bzuE").BASE_URL,u={data:function(){return{encodedURL:"?token="+encodeURIComponent(localStorage.getItem("token")),filter:null,isModalVisible:!1,isModalEditVisible:!1,isModalViewGPKD:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),itemid:"",options:[],fields:[{key:"title",label:"Tên chức danh",sortable:!0,$isDisabled:!0},{key:"updatedAt",label:"Thời gian cập nhật",sortable:!0,thClass:"text-center"},{key:"viewDetail",label:"Nôị dung vị trí TD",sortable:!0,thClass:"text-center"},{key:"confirm1.confirmed",label:"Trạng thái duyệt 1",sortable:!0,thClass:"text-center"},{key:"confirm1.confirmAt",label:"Thời gian duyệt 1",sortable:!0,thClass:"text-center"},{key:"confirm1.confirmBy",label:"Người duyệt 1",sortable:!0,thClass:"text-center"},{key:"confirm2.confirmed",label:"Trạng thái duyệt 2",sortable:!0,thClass:"text-center"},{key:"confirm2.confirmAt",label:"Thời gian duyệt 2",sortable:!0,thClass:"text-center"},{key:"confirm2.confirmBy",label:"Người duyệt 2",sortable:!0,thClass:"text-center"},{key:"status",label:"Trạng thái tuyển dụng",sortable:!1,thClass:"text-center"},{key:"actions",label:"Thao tác",sortable:!1}]}},components:{adduser:n.default,edituser:a.default,viewGPKD:s.default,Multiselect:o.a},methods:{showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(e){this.itemid=e,this.isModalEditVisible=!0},showModalViewGPKD:function(e){this.itemid=e,this.isModalViewGPKD=!0},closeModalViewGPKD:function(){this.isModalViewGPKD=!1},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},displayUserType:function(e){switch(e){case 1:return"Quản trị viên";case 2:return"Người quản lý";default:return"Nhân viên"}},getStatusConfirm:function(e){switch(e){case-1:return"Không được duyệt";case 0:return"Đang chờ duyệt";case 1:return"Đã được duyệt"}},clickCallback:function(e){var t=this;this.$http.get(c+"/employee/getall?page="+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return t.items=e.data})},updateMessage:function(e){this.items=e},deleteItem:function(e,t){var i=this;this.$confirm({message:"Bạn có muốn xóa "+t,button:{yes:"Đồng ý"},callback:function(t){t&&i.$http.get(c+"/business/delete/"+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){i.$http.get(c+"/business/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return i.items=e.data})}).catch(function(e){console.error(e.response)})}})}},created:function(){var e=this;l.a.get("job/get-all").then(function(t){console.log(t.data.data),e.items=t.data.data,e.totalRows=e.items.length,void 0===e.$route.query.page&&(e.currentPage=1)})}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e._m(0),e._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("div",{staticClass:"panel-body"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:e.showModal}},[e._v("\n          Thêm người dùng\n        ")])]),e._v(" "),i("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[i("b-form-select",{staticClass:"form-control",attrs:{options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" "),i("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[i("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)],1),e._v(" "),i("b-table",{attrs:{striped:"",bordered:"",hover:"",items:e.items,fields:e.fields,filter:e.filter},scopedSlots:e._u([{key:"cell(updateAt)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(new Date(i.updateAt).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"short",day:"numeric"}))+"\n        ")]}},{key:"cell(status)",fn:function(t){var n=t.item;return[i("b",[e._v(e._s(n.status?"Đang tìm ứng viên":"Dừng tìm"))])]}},{key:"cell(viewDetail)",fn:function(t){var n=t.item;return[i("a",{attrs:{href:"https://cvidpro.net/job-detail/"+n._id+e.encodedURL,target:"_blank"}},[e._v("Xem chi tiết")])]}},{key:"cell(confirm1.confirmed)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(e.getStatusConfirm(i.confirm1.confirmed))+"\n        ")]}},{key:"cell(confirm1.confirmAt)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(i.confirm1&&0!==i.confirm1.confirmed?new Date(i.confirm1.confirmAt):"")+"\n        ")]}},{key:"cell(confirm1.confirmBy)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(i.confirm1&&0!==i.confirm1.confirmed&&i.adminConfirm1?i.adminConfirm1.name:"")+"\n        ")]}},{key:"cell(confirm2.status)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(e.getStatusConfirm(i.confirm2.confirmed))+"\n        ")]}},{key:"cell(confirm2.confirmAt)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(i.confirm2&&0!==i.confirm2.confirmed?new Date(i.confirm2.confirmAt):"")+"\n        ")]}},{key:"cell(confirm2.confirmBy)",fn:function(t){var i=t.item;return[e._v("\n          "+e._s(i.confirm2&&0!==i.confirm2.confirmed&&i.adminConfirm2?i.adminConfirm2.name:"")+"\n        ")]}},{key:"cell(questions)",fn:function(t){return t.item,[i("b",[e._v("Xem tiêu chí\n            "),i("b-icon",{staticStyle:{float:"right"},attrs:{icon:"eye",variant:"primary"}})],1)]}},{key:"cell(actions)",fn:function(t){var n=t.item;return[i("b-icon",{staticStyle:{margin:"auto"},attrs:{icon:"trash",variant:"danger"},on:{click:function(t){return e.deleteItem(n._id,n.name)}}})]}},{key:"cell(department)",fn:function(t){return t.item,[i("b",[e._v("Xem phòng ban\n            "),i("b-icon",{staticStyle:{float:"right"},attrs:{icon:"eye",variant:"success"}})],1)]}}])},[e._v(" "),e._v(" "),e._v("\n        viewDetail\n        ")])],1),e._v(" "),i("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[i("paginate",{attrs:{"page-count":Math.ceil(e.totalRows/e.perPage),"page-range":3,"margin-pages":2,"click-handler":e.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),i("viewGPKD",{directives:[{name:"show",rawName:"v-show",value:e.isModalViewGPKD,expression:"isModalViewGPKD"}],attrs:{itemid:e.itemid},on:{close:e.closeModalViewGPKD}}),e._v(" "),i("adduser",{directives:[{name:"show",rawName:"v-show",value:e.isModalVisible,expression:"isModalVisible"}],on:{inputData:e.updateMessage,close:e.closeModal}}),e._v(" "),i("edituser",{directives:[{name:"show",rawName:"v-show",value:e.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{itemid:e.itemid},on:{close:e.closeEditModal}})],1),e._v(" "),i("vue-confirm-dialog")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"content-header"},[t("h1",[this._v("Quản lý người dùng")]),this._v(" "),t("ol",{staticClass:"breadcrumb"},[t("li",[t("a",[t("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),t("li",[t("a",[this._v("Danh sách người dùng")])])])])}]},m=i("VU/8")(u,d,!1,null,null,null);t.default=m.exports}});
//# sourceMappingURL=14.fc5eb85a64c979ff1a82.js.map