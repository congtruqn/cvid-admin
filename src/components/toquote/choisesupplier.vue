<template>
  <div>
    <section class="content-header">
      <h1>Quản lý báo giá</h1>
      <ol class="breadcrumb">
        <li>
          <a><i class="fa fa-dashboard"></i>Trang chủ</a>
        </li>
        <li><a>Chọn nhà cung cấp</a></li>
      </ol>
    </section>
    <section class="panel panel-inverse">
      <div class="row">
        <div class="panel-body">
          <button
            class="btn btn-primary m-r-5 m-b-5"
            @click="saveSupplierQuote"
          >
            Lưu
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th width="25px">STT</th>
              <th>Diễn giải</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Chọn nhà cung cấp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoicetype, index) in listproducts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                {{listproducts[index].name}}
              </td>
              <td>{{listproducts[index].unit}}</td>
              <td>{{listproducts[index].num}}</td>
              
              <td>
                <ul>
                  <li v-for="suppli in listproducts[index].suppliers" class="choise_supplier" v-if="suppli.supplier_price">
                    <p><input type="radio" id="suppli._id" :value="suppli._id" v-model="listproducts[index].choise"></p>
                    <p>{{suppli.supplier_name}}</p>
                    <p> - Đơn giá: {{suppli.supplier_price}}</p>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>
<script>
import addtoquote from "@/components/toquote/addtoquote";
import edittoquote from "@/components/toquote/edittoquote";
import addproducttype from "@/components/toquote/addproducttype";
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
    addtoquote,
    edittoquote,
    addproducttype
  },
  methods: {
    todate: function(item) {
      return lib.timestamptodate(item);
    },
    showModal() {
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
          "api/toquotedetails/savechoisesupplier",
          {
            toquotedetails:this.listproducts
          },
          {
            headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
          }
        )
        .then(response => {
          alert('Lưu thành công')
          window.location.href = '/toquote'
          toquote
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
            "api/toquotedetails/getalltoquotedetails?id=" +
              this.$route.query.id,
            {
              headers: {
                Authorization: `Basic ${localStorage.getItem("token")}`
              }
            }
          )
          .then(response => {
            for (var x in response.data) {
              var temp = {
                name: response.data[x].name,
                supplier: this.supplier_name,
                unit: response.data[x].unit,
                num: response.data[x].num
              };
              for(var y in response.data[x].suppliers) {
                if(response.data[x].suppliers[y].supplier_id==this.$route.query.supplier_id){

                  temp.supplier_price = response.data[x].suppliers[y].supplier_price;
                  temp.profit_margin = response.data[x].suppliers[y].profit_margin;
                }
              }
              this.json_data.push(temp);
            }
            this.listproducts = response.data;
          });
      });
  }
};
</script>
