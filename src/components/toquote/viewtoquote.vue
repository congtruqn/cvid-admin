<template>
  <div>
    <section class="content-header">
      <h1>Tải báo giá</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Tải báo giá</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit()">
            Lưu về máy
          </button>
        </div>
        <div class="product_detail">
          <table
            v-for="(producttype, index) in listproducttypes"
            :key="index"
            class="table call_hostory"
          >
            <tbody>
              <tr>
                <td colspan="7">Hệ : {{ producttype.name }}</td>
              </tr>
              <tr v-for="(invoicetype, newindex) in listproducts"
                :key="newindex"
                v-if="index == invoicetype.index && listproducts[newindex].total">
                <td class="to_count">{{ invoicetype.count }}</td>
                <td class="to_name"><p>{{listproducts[newindex].name}}</p></td>
                <td class="to_brand"><p>{{listproducts[newindex].brand[0].brand_name}}</p></td>
                <td class="to_unit"><p>{{listproducts[newindex].unit}}</p></td>
                <td class="to_num"><p>{{listproducts[newindex].num}}</p></td>
                <td class="to_price"><p>{{listproducts[newindex].sale_price.toLocaleString('en-US')}}</p></td>
                <td class="to_total"><p>{{listproducts[newindex].total.toLocaleString('en-US')}}</p></td>
              </tr>
            </tbody>
          </table>
          <p>Tổng tiền: {{total.toLocaleString('en-US')}}</p>
        </div>
      </div>
    </section>
    <addsupplier
      @inputData="updateSupplier"
      v-show="isModalVisible"
      @close="closeModal"
    />
    <addbrand @inputData="updateBrand"
        v-show="isAddBrandVisible"
        @close="closeAddBrand"
    />
  </div>

</template>
<script>
import lib from "@/plugins/lib.js";
import Datepicker from "vuejs-datepicker";
import itemTemplate from "@/components/addon/ItemTemplate.vue";
import addsupplier from '@/components/supplier/addsupplier.vue';
import addbrand from "@/components/brands/addbrand";
export default {
  name: "addtoquote",
  components: {
    Datepicker,
    addsupplier,
    addbrand
  },
  data() {
    return {
      isModalVisible:false,
      listproducttypes: [],
      listproducts: [],
      item: null,
      items: [],
      template: itemTemplate,
      id:'',
      tag: '',
      tag1: 'aa',
      tags:[],
      options: [],
      optionsc: [{
        supplier_name: "tru",
        _id: "616ed4677a989f311c1ebad5"
      }],
      isAddBrandVisible: false,
      brands:[],
      total:0
    };
  },
  methods: {
    addBrand() {
      this.isAddBrandVisible = true;
    },
    closeAddBrand(){
      this.isAddBrandVisible = false;
    },
    addSupplier(index){
      this.isModalVisible = true;
    },
    closeModal(){
      this.isModalVisible = false;
    },
    onChange(queryString, index) {
      this.$nextTick(() => {
        this.listproducts[index].name = queryString;
      });
    },
    editTag(newTags) {
      console.log(newTags)
    },
    addQuote(index) {
      var a = this.listproducts.filter(number => number.index == index);
      if (a.length == 0) {
        this.listproducts.push({
          index: index,
          count: 1,
          detail_id:this.$route.query.id
        });
      } else {
        let temp = a[a.length - 1];
        if (temp) {
          let count = temp.count + 1;
          this.listproducts.push({
            index: index,
            count: count,
            detail_id:this.$route.query.id
          });
        }
      }
    },
    getLabel(item) {
      return item;
    },
    selectLabel(item, newindex) {
      this.listproducts[newindex].is_select = 1;
    },
    changeLabel(item, index) {
      this.listproducts[index].name = item;
    },
    updateItems(text) {
      this.items = [];
      this.$http
        .get("api/products/getallproductsnotpage", {
          headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
        })
        .then(response => {
          for (var x in response.data) {
            this.items.push(response.data[x].product_name);
          }
        });
    },
    handleSubmit(e) {
      this.$http
        .post(
          "api/toquotedetails/addtoquotedetail",
          this.listproducts,
          {
            headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
          }
        )
        .then(response => {
          window.location.href = '/toquote'
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    updateSupplier(){
      this.$http
        .get("api/suppliers/getallsuppliersnotpage", {
          headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
        })
        .then(response => {
          this.options = response.data;
          
          console.log(this.options)
      });
    },
    updateBrand(){
      this.$http
        .get("api/brands/getallbrandsnotpage", {
          headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
        })
        .then(response => {
          this.brands = response.data;
          //console.log(this.options)
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id,
    this.$http
      .get("api/toquote/getproducttypebyid?id=" + this.$route.query.id, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
      })
      .then(response => {
        this.listproducttypes = response.data;
        for (var x in response.data) {
          this.listproducttypes[x].data = [];
        }
    });
    this.$http
      .get("api/toquotedetails/getalltoquotedetails?id="+this.$route.query.id, {
        headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
      })
      .then(response => {
        this.listproducts = response.data
        for (var x in response.data) {
          this.listproducts[x].detail_id = response.data[x].toquote_id;
          this.listproducts[x].change = 1;
          if(response.data[x].total){
            this.total = this.total+ parseFloat(response.data[x].total)
          }
        }
    });
    this.updateSupplier();
    this.updateBrand();
  },
  created() {
    
  },
};
</script>
