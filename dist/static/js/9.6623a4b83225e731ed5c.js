webpackJsonp([9],{BGxc:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("X08x"),a=i("J7vS"),s=i("MWS/"),n=i("XW0x"),c=i.n(n),l={data:function(){return{isModalVisible:!1,isModalEditVisible:!1,isModalProducttypeVisible:!1,listinvoicetypes:"",countinvoicetype:"",page:Number(this.$route.query.page),editid:"",projects:""}},components:{addtoquote:o.default,edittoquote:a.default,addproducttype:s.default},methods:{todate:function(t){return c.a.timestamptodate(t)},showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(t){var e={project_name:t.project_name,project_id:t.project_id,toquote_type:t.toquote_type};this.editid=t,this.projects=e,this.isModalEditVisible=!0},displayProjectType:function(t){switch(t){case 1:return"Thương mại";case 2:return"Thiết kế";default:return"Thi công"}},showisModalProducttype:function(t){console.log(t),this.editid=t,this.isModalProducttypeVisible=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},closeProductTypeModal:function(){this.isModalProducttypeVisible=!1},clickCallback:function(t){var e=this;this.$http.get("api/toquote/getalltoquotes?page="+t,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return e.listinvoicetypes=t.data})},updateMessage:function(t){this.listinvoicetypes=t},dellInvoiceType:function(t,e){var i=this;this.$confirm({message:"Bạn có muốn xóa loại hóa đơn "+e,button:{yes:"Đồng ý"},callback:function(e){e&&i.$http.post("api/toquote/delltoquote",{id:t},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){i.$http.get("api/toquote/getalltoquotes?page="+i.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.listinvoicetypes=t.data}),i.$http.get("api/toquote/getcounttoquote",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return i.countinvoicetype=t.data})}).catch(function(t){console.error(t.response)})}})}},mounted:function(){var t=this;void 0==this.$route.query.page&&(this.page=1),this.$http.get("api/toquote/getalltoquotes?page="+this.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return t.listinvoicetypes=e.data}),this.$http.get("api/toquote/getcounttoquotes",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){return t.countinvoicetype=e.data})}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("div",{staticClass:"panel-body"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.showModal}},[t._v("Thêm báo giá")])]),t._v(" "),i("table",{staticClass:"table"},[t._m(1),t._v(" "),i("tbody",t._l(t.listinvoicetypes,function(e,o){return i("tr",{key:o},[i("td",[t._v(t._s(20*(t.page-1)+o+1))]),t._v(" "),i("td",[i("a",{attrs:{href:"/toquotedetail?id="+e._id}},[t._v(t._s(e.toquote_name))])]),t._v(" "),i("td",[t._v(t._s(e.project_name))]),t._v(" "),i("td",[t._v(t._s(t.displayProjectType(e.toquote_type)))]),t._v(" "),i("td",[i("span",[i("a",{attrs:{href:"#"},on:{click:function(i){return t.showisModalProducttype(e)}}},[t._v("\n\t\t                    Quản lý hệ\n\t\t                ")])])]),t._v(" "),i("td",[t._v(t._s(t.todate(e.create_date)))]),t._v(" "),i("td",[t._v(t._s(t.todate(e.deadline)))]),t._v(" "),i("td",[i("a",{attrs:{href:"/suppliertoquotedetail?id="+e._id}},[t._v("Tải báo giá NCC")])]),t._v(" "),i("td",[i("a",{attrs:{href:"/choisesupplier?id="+e._id}},[t._v("Chọn NCC")])]),t._v(" "),i("td",[i("a",{attrs:{href:"/chooseprofit?toquote_id="+e._id}},[t._v("Chọn hệ số")])]),t._v(" "),i("td",[i("a",{attrs:{href:"/viewtoquote?id="+e._id}},[t._v("Tải báo giá")])]),t._v(" "),i("td",[i("span",[i("a",{attrs:{href:"#"},on:{click:function(i){return t.showisModalEditVisible(e)}}},[i("i",{staticClass:"fa fa-edit"})])])]),t._v(" "),i("td",[i("a",{attrs:{href:"#"},on:{click:function(i){return t.dellInvoiceType(e._id,e.toquote_name)}}},[i("i",{staticClass:"fa fa-trash"})])])])}),0)])]),t._v(" "),i("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[i("paginate",{attrs:{"page-count":t.countinvoicetype/20,"page-range":3,"margin-pages":2,"click-handler":t.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),t._v(" "),i("addtoquote",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],on:{inputData:t.updateMessage,close:t.closeModal}}),t._v(" "),i("edittoquote",{directives:[{name:"show",rawName:"v-show",value:t.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{editid:t.editid,projects:t.projects},on:{close:t.closeEditModal}}),t._v(" "),i("addproducttype",{directives:[{name:"show",rawName:"v-show",value:t.isModalProducttypeVisible,expression:"isModalProducttypeVisible"}],attrs:{editid:t.editid},on:{close:t.closeProductTypeModal}})],1),t._v(" "),i("vue-confirm-dialog")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý báo giá")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Danh sách báo giá")])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("th",{attrs:{width:"25px"}},[t._v("STT")]),t._v(" "),i("th",[t._v("Tên báo giá")]),t._v(" "),i("th",[t._v("Thuộc dự án")]),t._v(" "),i("th",[t._v("Loại dự án")]),t._v(" "),i("th",[t._v("Quản lý hệ")]),t._v(" "),i("th",[t._v("Ngày tạo")]),t._v(" "),i("th",[t._v("Deadline")]),t._v(" "),i("th",[t._v("Yêu cầu báo giá cho NCC")]),t._v(" "),i("th",[t._v("Chọn NCC")]),t._v(" "),i("th",[t._v("Chọn hệ số")]),t._v(" "),i("th",[t._v("Tải báo giá")]),t._v(" "),i("th",{staticClass:"functionicon",attrs:{width:"15px"}}),t._v(" "),i("th",{staticClass:"functionicon",attrs:{width:"15px"}})])])}]},r=i("VU/8")(l,d,!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=9.6623a4b83225e731ed5c.js.map