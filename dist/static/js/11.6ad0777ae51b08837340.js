webpackJsonp([11],{WiDh:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("X08x"),a=i("J7vS"),o=i("MWS/"),n=i("XW0x"),r=i.n(n),u={data:function(){return{isModalVisible:!1,isModalEditVisible:!1,isModalProducttypeVisible:!1,listproducts:"",countinvoicetype:"",page:Number(this.$route.query.page),editid:"",projects:"",supplier_name:"",json_fields:{"Tên sản phẩm":"name","Nhà cung cấp":"supplier","Đơn vị tính":"unit","Số lượng":"num"},json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]]}},components:{addtoquote:s.default,edittoquote:a.default,addproducttype:o.default},methods:{todate:function(t){return r.a.timestamptodate(t)},showModal:function(){this.isModalVisible=!0},showisModalProducttype:function(t){console.log(t),this.editid=t,this.isModalProducttypeVisible=!0},closeModal:function(){this.isModalVisible=!1},closeEditModal:function(){this.isModalEditVisible=!1},closeProductTypeModal:function(){this.isModalProducttypeVisible=!1},saveSupplierQuote:function(){this.$http.post("api/toquotedetails/savechoisesupplier",{toquotedetails:this.listproducts},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){alert("Lưu thành công"),window.location.href="/toquote",toquote}).catch(function(t){console.error(t.response)})},updateMessage:function(t){this.listinvoicetypes=t}},mounted:function(){var t=this;this.$http.get("api/suppliers/getsuppliertypebyid?id="+this.$route.query.supplier_id,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){t.supplier_name=e.data.supplier_name,t.$http.get("api/toquotedetails/getalltoquotedetails?id="+t.$route.query.id,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){for(var i in e.data){var s={name:e.data[i].name,supplier:t.supplier_name,unit:e.data[i].unit,num:e.data[i].num};for(var a in e.data[i].suppliers)e.data[i].suppliers[a].supplier_id==t.$route.query.supplier_id&&(s.supplier_price=e.data[i].suppliers[a].supplier_price,s.profit_margin=e.data[i].suppliers[a].profit_margin);t.json_data.push(s)}t.listproducts=e.data})})}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("section",{staticClass:"panel panel-inverse"},[i("div",{staticClass:"row"},[i("div",{staticClass:"panel-body"},[i("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.saveSupplierQuote}},[t._v("\n          Lưu\n        ")])]),t._v(" "),i("table",{staticClass:"table"},[t._m(1),t._v(" "),i("tbody",t._l(t.listproducts,function(e,s){return i("tr",{key:s},[i("td",[t._v(t._s(s+1))]),t._v(" "),i("td",[t._v("\n              "+t._s(t.listproducts[s].name)+"\n            ")]),t._v(" "),i("td",[t._v(t._s(t.listproducts[s].unit))]),t._v(" "),i("td",[t._v(t._s(t.listproducts[s].num))]),t._v(" "),i("td",[i("ul",t._l(t.listproducts[s].suppliers,function(e){return e.supplier_price?i("li",{staticClass:"choise_supplier"},[i("p",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.listproducts[s].choise,expression:"listproducts[index].choise"}],attrs:{type:"radio",id:"suppli._id"},domProps:{value:e._id,checked:t._q(t.listproducts[s].choise,e._id)},on:{change:function(i){return t.$set(t.listproducts[s],"choise",e._id)}}})]),t._v(" "),i("p",[t._v(t._s(e.supplier_name))]),t._v(" "),i("p",[t._v(" - Đơn giá: "+t._s(e.supplier_price))])]):t._e()}),0)])])}),0)])])]),t._v(" "),i("vue-confirm-dialog")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý báo giá")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Chọn nhà cung cấp")])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("th",{attrs:{width:"25px"}},[t._v("STT")]),t._v(" "),i("th",[t._v("Diễn giải")]),t._v(" "),i("th",[t._v("Đơn vị tính")]),t._v(" "),i("th",[t._v("Số lượng")]),t._v(" "),i("th",[t._v("Chọn nhà cung cấp")])])])}]},p=i("VU/8")(u,l,!1,null,null,null);e.default=p.exports}});
//# sourceMappingURL=11.6ad0777ae51b08837340.js.map