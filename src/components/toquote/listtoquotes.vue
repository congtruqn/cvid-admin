
<template>
    <div>
    <section class="content-header">
            <h1>Quản lý báo giá</h1>
            <ol class="breadcrumb">
                <li><a><i class="fa fa-dashboard"></i>Trang chủ</a></li>
                <li><a>Danh sách báo giá</a></li>
            </ol>
        </section>
        <section class="panel panel-inverse">
			<div class="row">
				<div class="panel-body">
					<button class="btn btn-primary m-r-5 m-b-5"  @click="showModal">Thêm báo giá</button>
				</div>
				
					<table class="table">
						<thead>
		    				<tr>
		        				<th width="25px">STT</th>
		            			<th>Tên báo giá</th>
		            			<th>Thuộc dự án</th>
                      <th>Loại dự án</th>
                      <th>Quản lý hệ</th>
		            			<th>Ngày tạo</th>
                      <th>Deadline</th>
                      <th>Yêu cầu báo giá cho NCC</th>
                      <th>Chọn NCC</th>
                      <th>Chọn hệ số</th>
                      <th>Tải báo giá</th>
                      <th width="15px" class="functionicon"></th>
                      <th width="15px" class="functionicon"></th>
		        			</tr>
						</thead>
						<tbody>
		    			<tr v-for="(invoicetype, index) in listinvoicetypes" :key="index">
                <td>{{((page-1)*20)+index+1}}</td>
		        		<td><a v-bind:href="'/toquotedetail?id=' + invoicetype._id">{{invoicetype.toquote_name}}</a></td>
		        		<td>{{invoicetype.project_name}}</td>
                <td>{{displayProjectType(invoicetype.toquote_type)}}</td>
								<td>
									<span>
		                <a href="#" @click="showisModalProducttype(invoicetype)">
		                    Quản lý hệ
		                </a>
									</span>
		        		</td>                
		        		<td>{{todate(invoicetype.create_date)}}</td>
                <td>{{todate(invoicetype.deadline)}}</td>
                <td><a v-bind:href="'/suppliertoquotedetail?id=' + invoicetype._id">Tải báo giá NCC</a></td>
                <td><a v-bind:href="'/choisesupplier?id=' + invoicetype._id">Chọn NCC</a></td>
                <td><a v-bind:href="'/chooseprofit?toquote_id=' + invoicetype._id">Chọn hệ số</a></td>
                <td><a v-bind:href="'/viewtoquote?id=' + invoicetype._id">Tải báo giá</a></td>
								<td>
									<span>
		                <a href="#" @click="showisModalEditVisible(invoicetype)">
		                    <i class="fa fa-edit"></i>
		                </a>
									</span>
		        		</td>
								<td>
		            	<a href="#" @click="dellInvoiceType(invoicetype._id,invoicetype.toquote_name)">
		                <i class="fa fa-trash"></i>
		            	</a>
		        		</td>
		    			</tr>
						</tbody>
    				</table>
			</div>
			<div id="example2_paginate" class="dataTables_paginate paging_simple_numbers">
  <paginate
    v-model="page"
    :page-count="countinvoicetype/20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
    	</div>
    <addtoquote @inputData="updateMessage"
      v-show="isModalVisible"
      @close="closeModal"
    />
    <edittoquote
      :editid="editid"
      :projects = "projects"
      v-show="isModalEditVisible"
      @close="closeEditModal"
    />
    <addproducttype
      :editid="editid"
      v-show="isModalProducttypeVisible"
      @close="closeProductTypeModal"
    />
		</section>	
    <vue-confirm-dialog></vue-confirm-dialog>

    </div>
    
    		
</template>
<script>
import addtoquote from '@/components/toquote/addtoquote';
import edittoquote from '@/components/toquote/edittoquote';
import addproducttype from '@/components/toquote/addproducttype';
import lib from '@/plugins/lib.js'
export default {
  data() {
    return {
      isModalVisible: false,
      isModalEditVisible:false,
      isModalProducttypeVisible:false,
      listinvoicetypes:'',
      countinvoicetype:'',
      page:Number(this.$route.query.page),
      editid: '',
      projects: '',
    };
  },
	components: {
        addtoquote,
        edittoquote,
        addproducttype,
  },
  methods: {
      todate: function(item) {
					return lib.timestamptodate(item);
			},
      showModal() {
        this.isModalVisible = true;
      },
      showisModalEditVisible(id) {
        var projects = {
            project_name:id.project_name,
            project_id:id.project_id,
            toquote_type:id.toquote_type
        }
        this.editid = id;
        this.projects = projects;
        this.isModalEditVisible = true;
        
      },
      displayProjectType(id) {
        switch(id) {
          case 1:
            return 'Thương mại'
            break;
          case 2:
            return 'Thiết kế'
            break;
          default:
            return 'Thi công'
        }
      },
      showisModalProducttype(id) {
        console.log(id)
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
      clickCallback (pageNum){
        //this.$router.get('api/toquote/listinvoicetype?page='+pageNum)
        this.$http.get('api/toquote/getalltoquotes?page='+pageNum,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
        .then(response => (this.listinvoicetypes = response.data))
      },
      updateMessage(variable) {
        this.listinvoicetypes = variable;
      },
      dellInvoiceType(id,name){
        this.$confirm(
        {
          message:'Bạn có muốn xóa loại hóa đơn ' + name,
          button: {
            yes: 'Đồng ý'
          },
          callback: confirm => {
            if (confirm) {
              this.$http.post('api/toquote/delltoquote', {
                id:id,
              },
              {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
              ).then(response => {
                this.$http.get('api/toquote/getalltoquotes?page='+this.$route.query.page,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
                .then(response => (this.listinvoicetypes = response.data));
                    this.$http.get('api/toquote/getcounttoquote',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
                .then(response => (this.countinvoicetype = response.data));
              }).catch(function (error) {
                console.error(error.response);
              })
            }
          }
        })

      }
  },
  mounted () {
    if(this.$route.query.page==undefined){
      this.page =1;
    }
    this.$http.get('api/toquote/getalltoquotes?page='+this.$route.query.page,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
      .then(response => (this.listinvoicetypes = response.data));
      this.$http.get('api/toquote/getcounttoquotes',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
        .then(response => (this.countinvoicetype = response.data));
    },
};
</script>