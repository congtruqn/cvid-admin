<template>
  <div>
    <section class="content-header">
      <h1>Quản lý báo giá</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Yêu cầu báo giá cho nhà cung cấp</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button
            class="btn btn-primary m-r-5 m-b-5"
            @click="saveSupplierQuote"
          >
            Import báo giá
          </button>
          <button
            class="btn btn-primary m-r-5 m-b-5"
            @click="saveSupplierQuote"
          >
            Lưu báo giá
          </button>
          <export-excel
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="supplierquote.xls"
          >
            Download Excel
          </export-excel>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th width="25px">STT</th>
              <th>Diễn giải</th>
              <th>NCC</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoicetype, index) in listproducts" :key="index">
              <td>{{ index + 1 }}</td>
              <td><p class="item_list_1">{{listproducts[index].name}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].supplier_name}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].unit}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].num}}</p></td>
              <td>
                <input
                  class="form-control"
                  placeholder="Đơn giá"
                  v-model="listproducts[index].supplier_price"
                  type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <addbrand @inputData="updateMessage"
        v-if="supplierid&&suppliername"
        v-show="isModalVisible"
        @close="closeModal"
        :supplierid="supplierid"
        :suppliername="suppliername"
      />
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import addbrand from "@/components/brands/addbrand";
import lib from "@/plugins/lib.js";
export default {
  data() {
    return {
      isModalVisible: false,
      isModalEditVisible: false,
      isModalProducttypeVisible: false,
      listproducts: "",
      countinvoicetype: "",
      page: Number(this.$route.query.page),
      editid: "",
      supplierid:"",
      suppliername:"",
      projects: "",
      supplier_name: "",
      json_fields: {
        "Tên sản phẩm": "name",
        "Nhà cung cấp": "supplier",
        "Đơn vị tính": "unit",
        "Số lượng": "num"
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  components: {
    addbrand,
  },
  methods: {
    todate: function(item) {
      return lib.timestamptodate(item);
    },
    addBrand() {
      this.supplierid = this.$route.query.supplier_id;
      this.suppliername = this.supplier_name;
      this.isModalVisible = true;
    },
    showisModalProducttype(id) {
      console.log(id);
      this.editid = id;
      this.isModalProducttypeVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeEditModal() {
      this.isModalEditVisible = false;
    },
    closeProductTypeModal() {
      this.isModalProducttypeVisible = false;
    },
    saveSupplierQuote() {
      this.$http
        .post(
          "api/toquotedetails/savesupplierquote",
          {
            supplier_id:this.$route.query.supplier_id,
            supplier_name:this.supplier_name,
            toquotes:this.listproducts
          },
          {
            headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
          }
        )
        .then(response => {
            if (confirm("Lưu thành công, quay về trang trước!")) {
              window.location.href = '/suppliertoquotedetail?id='+this.$route.query.toquote_id
            } else {
              
            }
        })
        .catch(function(error) {
          console.error(error.response);
        });
    },
    updateMessage(variable) {
      this.listinvoicetypes = variable;
    }
  },
  mounted() {
    this.$http
      .get(
        "api/suppliers/getsuppliertypebyid?id=" + this.$route.query.supplier_id,
        { headers: { Authorization: `Basic ${localStorage.getItem("token")}` } }
      )
      .then(response => {
        this.supplier_name = response.data.supplier_name;
        this.$http
          .get(
            "api/toquotedetails/gettoquotefromsupplier?supplier_id=" +
              this.$route.query.supplier_id +
              "&toquote_id=" +
              this.$route.query.toquote_id,
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem("token")}`
              }
            }
          )
          .then(response => {
            for (var x in response.data) {
              var temp = {
                id: response.data[x]._id,
                name: response.data[x].name,
                supplier: this.supplier_name,
                unit: response.data[x].unit,
                num: response.data[x].num
              };
              for(var y in response.data[x].suppliers) {
                if(response.data[x].suppliers[y].supplier_id==this.$route.query.supplier_id){
                  temp.supplier_price = response.data[x].suppliers[y].supplier_price;
                }
              }
              this.json_data.push(temp);
            }
            this.listproducts = this.json_data;
          });
      });
  }
};
</script>
