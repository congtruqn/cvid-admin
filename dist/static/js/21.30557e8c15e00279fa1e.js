webpackJsonp([21],{DNBb:function(t,n){},v5cT:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"modal-confirm"},[i("b-button",{attrs:{variant:"secondary"},on:{click:function(n){return t.$emit("close")}}},[t._v("Bỏ qua")]),t._v(" "),i("b-button",{attrs:{variant:"success"},on:{click:t.confirm}},[t._v("Duyệt")]),t._v(" "),i("b-button",{attrs:{variant:"danger"},on:{click:t.notConfirm}},[t._v("Không duyệt")]),t._v(" "),i("b-button",{attrs:{variant:"info"},on:{click:t.cancelConfirm}},[t._v("Chờ duyệt")])],1)},staticRenderFns:[]};var o=i("VU/8")({name:"ConfirmModal",data:function(){return{}},methods:{confirm:function(){this.itemid.status=1,this.$emit("close")},notConfirm:function(){this.itemid.status=-1,this.$emit("close")},cancelConfirm:function(){this.itemid.status=0,this.$emit("close")}},props:["itemid"]},e,!1,function(t){i("DNBb")},"data-v-1f260578",null);n.default=o.exports}});
//# sourceMappingURL=21.30557e8c15e00279fa1e.js.map