webpackJsonp([13],{tG0K:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("s5/5"),a=i("WRiz"),r=i("IgUE"),s=i("RUzx"),o=i.n(s),l=i("eVRm"),c=i("bzuE").BASE_URL,u={data:function(){return{encodedURL:"?token="+encodeURIComponent(localStorage.getItem("token")),filter:null,isModalVisible:!1,isModalEditVisible:!1,isModalViewCv:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),isBusy:!0,itemid:"",fields:[{key:"name",label:"Họ và tên",sortable:!0,value:""},{key:"viewcv",label:"Thông tin CV",sortable:!0,class:"text-center",value:""},{key:"confirm1.confirmed",label:"Trạng thái duyệt 1",sortable:!0,thClass:"text-center",value:"nldC1"},{key:"confirm1.confirmAt",label:"Thời gian duyệt 1",sortable:!0,thClass:"text-center",value:"nldC1"},{key:"confirm1.confirmBy",label:"Người duyệt 1",sortable:!0,thClass:"text-center",value:"nldC1"},{key:"confirm2.confirmed",label:"Trạng thái duyệt 2",sortable:!0,thClass:"text-center",value:"nldC2"},{key:"confirm2.confirmAt",label:"Thời gian duyệt 2",sortable:!0,thClass:"text-center",value:"nldC2"},{key:"confirm2.confirmBy",label:"Người duyệt 2",sortable:!0,thClass:"text-center",value:"nldC2"}]}},components:{adduser:n.default,edituser:a.default,viewcv:r.default,Multiselect:o.a},methods:{showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(e){this.itemid=e,this.isModalEditVisible=!0},showisModalViewCv:function(e){this.itemid=e,this.isModalViewCv=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},closeModalViewCv:function(){this.isModalViewCv=!1},clickCallback:function(e){var t=this;this.items=this.employees.filter(function(i,n){return(e-1)*t.perPage<=n&&n<e*t.perPage})},updateMessage:function(e){this.items=e},makeQueryParams:function(e,t,i){return{sortBy:e[0].field,sortOrder:e[0].direction,pageNo:t,pageSize:i}},getStatusConfirm:function(e){switch(e){case-1:return"Không được duyệt";case 0:return"Đang chờ duyệt";case 1:return"Đã được duyệt"}},displayCvidStatus:function(e){switch(e){case-1:return"Không được duyệt";case 0:return"Đang chờ duyệt";case 1:return"Đã duyệt lần 1";case 2:return"Đã duyệt lần 2";default:return"Chưa tạo CV"}},deleteItem:function(e,t){var i=this;this.$confirm({message:"Bạn có muốn xóa "+t,button:{yes:"Đồng ý"},callback:function(t){t&&i.$http.get(c+"/employee/delete/"+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){i.$http.get(c+"/employee/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){i.items=e.data.filter(function(e){return!0===e.confirmPhone}),i.totalRows=i.items.length})}).catch(function(e){console.error(e.response)})}})}},created:function(){var e=this;l.a.get("employee/get-all").then(function(e){return e.data.data}).then(function(t){e.items=t.filter(function(e){return!0===e.confirmPhone}),e.totalRows=e.items.length,void 0===e.$route.query.page&&(e.currentPage=1),e.isBusy=!1})}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e._m(0),e._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[i("b-form-select",{staticClass:"form-control",attrs:{options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" "),i("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[i("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)],1),e._v(" "),i("b-table",{attrs:{busy:e.isBusy,striped:"",bordered:"",hover:"",items:e.items,fields:e.fields,filter:e.filter},scopedSlots:e._u([{key:"table-busy",fn:function(){return[i("div",{staticClass:"text-center text-danger my-2"},[i("b-spinner",{staticClass:"align-middle"}),e._v(" "),i("strong",[e._v("Loading...")])],1)]},proxy:!0},{key:"cell(viewcv)",fn:function(t){var n=t.item;return[i("b",[i("a",{attrs:{href:"https://cvidpro.net/job-resume/"+n._id+e.encodedURL,target:"_blank"}},[e._v("\n    Xem CV\n            ")])])]}},{key:"cell(job.status)",fn:function(t){var n=t.item;return[i("b",[e._v(e._s(n.job?e.displayJobStatus(n.job.status):""))])]}},{key:"cell(comfirm1)",fn:function(t){return t.item,[i("td",[e._v("sxc")]),i("td",[e._v("s")])]}},{key:"cell(confirm1.confirmed)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(e.getStatusConfirm(i.confirm1.confirmed))+"\n        ")]}},{key:"cell(confirm1.confirmAt)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(i.confirm1&&0!==i.confirm1.confirmed?new Date(i.confirm1.confirmAt):"")+"\n        ")]}},{key:"cell(confirm1.confirmBy)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(i.confirm1&&0!==i.confirm1.confirmed&&i.adminConfirm1?i.adminConfirm1.name:"")+"\n        ")]}},{key:"cell(confirm2.confirmed)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(e.getStatusConfirm(i.confirm2.confirmed))+"\n        ")]}},{key:"cell(confirm2.confirmAt)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(i.confirm2&&0!==i.confirm2.confirmed?new Date(i.confirm2.confirmAt):"")+"\n        ")]}},{key:"cell(confirm2.confirmBy)",fn:function(t){var i=t.item;return[e._v("\n         "+e._s(i.confirm2&&0!==i.confirm2.confirmed&&i.adminConfirm2?i.adminConfirm2.name:"")+"\n        ")]}},{key:"cell(actions)",fn:function(t){var n=t.item;return[i("b-icon",{staticStyle:{margin:"auto"},attrs:{icon:"trash",variant:"danger"},on:{click:function(t){return e.deleteItem(n._id,n.name)}}})]}}])})],1),e._v(" "),i("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[i("paginate",{attrs:{"page-count":Math.ceil(e.totalRows/e.perPage),"page-range":3,"margin-pages":2,"click-handler":e.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),i("viewcv",{directives:[{name:"show",rawName:"v-show",value:e.isModalViewCv,expression:"isModalViewCv"}],attrs:{itemid:e.itemid},on:{close:e.closeModalViewCv}}),e._v(" "),i("adduser",{directives:[{name:"show",rawName:"v-show",value:e.isModalVisible,expression:"isModalVisible"}],on:{inputData:e.updateMessage,close:e.closeModal}}),e._v(" "),i("edituser",{directives:[{name:"show",rawName:"v-show",value:e.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{itemid:e.itemid},on:{close:e.closeEditModal}})],1),e._v(" "),i("vue-confirm-dialog")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"content-header"},[t("h1",[this._v("Quản lý CVID")]),this._v(" "),t("ol",{staticClass:"breadcrumb"},[t("li",[t("a",[t("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),t("li",[t("a",[this._v("Danh sách CVID")])])])])}]},m=i("VU/8")(u,d,!1,null,null,null);t.default=m.exports}});
//# sourceMappingURL=13.5031fba7f8a84637debb.js.map