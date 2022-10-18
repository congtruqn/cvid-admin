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
            @click="saveUpdateProfit"
          >
            Lưu lại
          </button>
        
        </div>
        <table class="table">
          <thead>
            <tr>
              <th width="25px">STT</th>
              <th>Diễn giải</th>
              <th>NCC</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Giá nhập</th>
              <th>Hệ số lợi nhuận</th>
              <th>Giá bán</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoicetype, index) in listproducts" :key="index">
              <td>{{ index + 1 }}</td>
              <td><p class="item_list_1">{{listproducts[index].name}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].supplier_choise}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].unit}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].num}}</p></td>
              <td><p class="item_list_1">{{listproducts[index].price.toLocaleString('en-US')}}</p></td>
              <td>
                <input
                  class="form-control"
                  placeholder="Hệ số lợi nhuận"
                  v-model="listproducts[index].profit_margin"
                  type="number"
                  @input="event => onChange(index)"
                />
              </td>
              <td>
                {{listproducts[index].sale_price.toLocaleString('en-US')}}
              </td>
              <td>
                {{listproducts[index].total.toLocaleString('en-US')}}
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
    onChange(index) {
      this.listproducts[index].sale_price = this.listproducts[index].price/this.listproducts[index].profit_margin
      this.listproducts[index].total = this.listproducts[index].sale_price*this.listproducts[index].num
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
    saveUpdateProfit() {
      this.$http
        .post(
          "api/toquotedetails/updateprofit",
          {
            toquotedetails:this.listproducts
          },
          {
            headers: { Authorization: `Basic ${localStorage.getItem("token")}` }
          }
        )
        .then(response => {
            if (confirm("Lưu thành công, quay về trang trước!")) {
              window.location.href = '/toquote'
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
      .get("api/toquotedetails/getalltoquotedetails?id="+this.$route.query.toquote_id, {
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
  }
};
</script>
