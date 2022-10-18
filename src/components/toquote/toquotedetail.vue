<template>
  <div>
    <section class="content-header">
      <h1>Quản lý báo giá</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Danh sách báo giá</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit()">
            Lưu
          </button>
          <button class="btn btn-primary m-r-5 m-b-5" @click="addSupplier(id)">
            Thêm NCC
          </button>
          <button
            class="btn btn-primary m-r-5 m-b-5"
            @click="addBrand"
          >
            Thêm nhãn hiệu
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
              <tr
                v-for="(invoicetype, newindex) in listproducts"
                :key="newindex"
                v-if="index == invoicetype.index"
              >
                <td>{{ invoicetype.count }}</td>
                <td>
                  <v-autocomplete
                    :items="items"
                    v-model="listproducts[newindex].name"
                    :get-label="getLabel"
                    :component-item="template"
                    @update-items="updateItems"
                    ref="autocomplete"
                    @blur="event => changeLabel(event, newindex)"
                    @change="event => onChange(event, newindex)"
                    @item-clicked ="event => selectLabel(event, newindex)"
                  >
                  </v-autocomplete>
                </td>
                <td>
                  <multiselect
                  v-model="listproducts[newindex].suppliers"
                  :options="options"
                  :searchable="true"
                  :multiple="true"
                  label="supplier_name"
                  track-by="supplier_name"
                  
                  >
                  </multiselect>
                </td>
                <td>
                  <multiselect
                  v-model="listproducts[newindex].brand"
                  :options="brands"
                  :searchable="true"
                  :multiple="false"
                  label="brand_name"
                  track-by="brand_name"
                  
                  >
                  </multiselect>
                </td>
                <td>
                  <input
                    class="form-control"
                    placeholder="Đơn vi tính"
                    v-model="listproducts[newindex].unit"
                    required="false"
                  />
                </td>
                <td>
                  <input
                    class="form-control"
                    placeholder="Số lượng"
                    v-model="listproducts[newindex].num"
                    type="number"
                  />
                </td>

                <td>
                  <a href="#">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td colspan="7">
                  <button
                    class="btn btn-primary m-r-5 m-b-5"
                    @click="addQuote(index)"
                  >
                    Thêm dòng
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
      brands:[]
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
        }
        console.log(this.listproducts)
    });
    this.updateSupplier();
    this.updateBrand();
  },
  created() {
    
  },
};
</script>
