webpackJsonp([5,31],{FhL7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-container"},[a("div",[a("div",{staticClass:"panel-body_modal"},[a("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(t){return e.$emit("close")}}})]),e._v(" "),a("b-table",{attrs:{striped:"",bordered:"",hover:"",items:e.items,fields:e.fields,filter:e.filter}}),e._v(" "),a("div",{staticClass:"panel-body_modal"},[a("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:e.handleSubmit}},[e._v("\n              Lưu\n            ")])])],1)])])])])},staticRenderFns:[]},l=a("VU/8")({name:"EditInvoiceType",data:function(){return{items:[{name:"Quản lí người lao động"},{name:"Quản lí vị trí tuyển dụng"},{name:"Quản lí hỗ trợ"},{name:"Quản lí thanh toán"}],fields:[{key:"name",label:"Quyền",sortable:!0,$isDisabled:!0},{key:"namex",label:"Thêm",sortable:!0,$isDisabled:!0},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"},{key:"status",label:"Sửa",sortable:!0,thClass:"text-center"}]}},methods:{handleSubmit:function(){}},props:["itemid"]},s,!1,null,null,null);t.default=l.exports},dork:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("FhL7"),l=a("WRiz"),o=a("IgUE"),r=a("RUzx"),i=a.n(r),c=a("bzuE").BASE_URL,n={data:function(){return{encodedURL:"?token="+encodeURIComponent(localStorage.getItem("token")),filter:null,isModalVisible:!1,isModalEdit:!1,isModalViewCv:!1,jobtitles:[],items:[],totalRows:1,perPage:20,pageOptions:[10,20,50,100],currentPage:Number(this.$route.query.page),page:Number(this.$route.query.page),itemid:"",options:[{key:"approved",label:"Trạng thái Cvid",sortable:!0,thClass:"text-center"},{key:"job.status",label:"Trạng thái tìm việc",sortable:!0,thClass:"text-center"},{key:"actions",label:"Thao tác",sortable:!1}],fields:[{key:"username",label:"Tên đăng nhập",sortable:!0,$isDisabled:!0},{key:"name",label:"Họ và tên",sortable:!0,$isDisabled:!0},{key:"status",label:"Kích hoạt",sortable:!0,thClass:"text-center"},{key:"show_details",label:"Kích hoạt",thClass:"text-center"},{key:"actions",label:"Thao tác",sortable:!1}]}},components:{editadmin:s.default,edituser:l.default,viewcv:o.default,Multiselect:i.a},methods:{showModal:function(){this.isModalVisible=!0},showisModalEdit:function(e){this.itemid=e,this.isModalEdit=!0},showisModalViewCv:function(e){this.itemid=e,this.isModalViewCv=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},closeModalViewCv:function(){this.isModalViewCv=!1},clickCallback:function(e){var t=this;this.items=this.employees.filter(function(a,s){return(e-1)*t.perPage<=s&&s<e*t.perPage})},updateMessage:function(e){this.items=e},makeQueryParams:function(e,t,a){return{sortBy:e[0].field,sortOrder:e[0].direction,pageNo:t,pageSize:a}},displayJobStatus:function(e){switch(e){case 1:return"Đang tìm việc";case 0:return"Tạm dừng tìm việc";default:return"Đang làm việc"}},displayCvidStatus:function(e){switch(e){case-1:return"Không được duyệt";case 0:return"Đang chờ duyệt";case 1:return"Đã duyệt lần 1";case 2:return"Đã duyệt lần 2";default:return"Chưa tạo CV"}},deleteItem:function(e,t){var a=this;this.$confirm({message:"Bạn có muốn xóa "+t,button:{yes:"Đồng ý"},callback:function(t){t&&a.$http.get(c+"/employee/delete/"+e,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){a.$http.get(c+"/employee/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){a.items=e.data,a.totalRows=e.data.length})}).catch(function(e){console.error(e.response)})}})}},created:function(){var e=this;this.$http.get(c+"/employee/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){e.items=t.data.filter(function(e){return-1!=e.approved}),e.totalRows=t.data.length,void 0===e.$route.query.page&&(e.currentPage=1)})}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("section",{staticClass:"panel panel-inverse"},[a("multiselect",{attrs:{options:e.options,multiple:!0,"close-on-select":!1,"clear-on-select":!1,"preserve-search":!0,placeholder:"Nhập từ khóa",label:"label","track-by":"key","preselect-first":!0},model:{value:e.fields,callback:function(t){e.fields=t},expression:"fields"}}),e._v(" "),a("div",{staticClass:"row"},[a("b-form",{staticClass:"m-b-5 m-t-5",attrs:{inline:""}},[a("b-form-select",{staticClass:"form-control",attrs:{options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" "),a("b-input-group",{staticStyle:{float:"right"},attrs:{size:"sm"}},[a("b-form-input",{attrs:{type:"search",placeholder:"Search terms"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)],1),e._v(" "),a("b-table",{attrs:{striped:"",bordered:"",hover:"","sort-by":"approved",items:e.items,fields:e.fields,filter:e.filter},scopedSlots:e._u([{key:"cell(show_details)",fn:function(t){return[a("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:t.toggleDetails}},[e._v("\n            "+e._s(t.detailsShowing?"Hide":"Show")+" Details\n          ")])]}},{key:"cell(job.status)",fn:function(t){var s=t.item;return[a("b",[e._v(e._s(s.job?e.displayJobStatus(s.job.status):""))])]}},{key:"cell(actions)",fn:function(t){var s=t.item;return[a("b-icon",{staticStyle:{margin:"auto 2px"},attrs:{icon:"pen",variant:"primary"},on:{click:function(t){return e.showisModalEdit(s)}}}),e._v(" "),a("b-icon",{staticStyle:{margin:"auto 2px"},attrs:{icon:"trash",variant:"danger"},on:{click:function(t){return e.deleteItem(s._id,s.name)}}})]}},{key:"row-details",fn:function(t){return[a("b-row",[a("b-col",{attrs:{cols:"12",md:"6"}},[a("b-form-group",{attrs:{label:"Nhóm chức năng NLĐ"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.ariaDescribedby;return[a("b-row",[a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1),e._v(" "),a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1),e._v(" "),a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1)],1)]}}],null,!0)})],1),e._v(" "),a("b-col",{attrs:{cols:"12",md:"6"}},[a("b-form-group",{attrs:{label:"Nhóm chức năng NLĐ"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.ariaDescribedby;return[a("b-row",[a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1),e._v(" "),a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1),e._v(" "),a("b-col",{attrs:{cols:"6",sm:"4",md:"4"}},[a("b-form-checkbox-group",{attrs:{id:"checkbox-group-2","aria-describedby":s,name:"flavour-2"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[a("b",[e._v("Quản lí NLĐ:")]),a("br"),e._v(" "),a("b-form-checkbox",{attrs:{value:"orange"}},[e._v("Thêm")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"apple"}},[e._v("Sửa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"pineapple"}},[e._v("Xóa")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 1")]),e._v(" "),a("b-form-checkbox",{attrs:{value:"grape"}},[e._v("Duyệt 2")])],1)],1)],1)]}}],null,!0)})],1)],1),e._v(" "),a("b-button",{attrs:{size:"sm"},on:{click:t.toggleDetails}},[e._v("Hide Details")])]}}])})],1),e._v(" "),a("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[a("paginate",{attrs:{"page-count":Math.ceil(e.totalRows/e.perPage),"page-range":3,"margin-pages":2,"click-handler":e.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),a("viewcv",{directives:[{name:"show",rawName:"v-show",value:e.isModalViewCv,expression:"isModalViewCv"}],attrs:{itemid:e.itemid},on:{close:e.closeModalViewCv}}),e._v(" "),a("edituser",{directives:[{name:"show",rawName:"v-show",value:e.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{itemid:e.itemid},on:{close:e.closeEditModal}}),e._v(" "),a("editadmin",{directives:[{name:"show",rawName:"v-show",value:e.isModalEdit,expression:"isModalEdit"}],attrs:{itemid:e.itemid},on:{close:e.closeEditModal}})],1),e._v(" "),a("vue-confirm-dialog")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"content-header"},[t("h1",[this._v("Quản lý người tìm việc")]),this._v(" "),t("ol",{staticClass:"breadcrumb"},[t("li",[t("a",[t("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),t("li",[t("a",[this._v("Danh sách người tìm việc")])])])])}]},d=a("VU/8")(n,u,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=5.b57f4440576dd606e93e.js.map