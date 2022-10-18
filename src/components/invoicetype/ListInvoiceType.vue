
<template>
    <div>
    <section class="content-header">
            <h1>Quản lý dự án</h1>
            <ol class="breadcrumb">
                <li><a><i class="fa fa-dashboard"></i>Trang chủ</a></li>
                <li><a>Danh sách dự án</a></li>
            </ol>
        </section>
        <section class="panel panel-inverse">
			<div class="row">
				<div class="panel-body">
					<button class="btn btn-primary m-r-5 m-b-5"  @click="showModal">Thêm dự án</button>
				</div>
				
					<table class="table">
						<thead>
		    				<tr>
		        				<th width="25px">STT</th>
		            			<th>Tên dự án</th>
		            			<th>Mã dự án</th>
                      <th>Loại dự án</th>
		            			<th>Ngày tạo</th>
                      <th width="15px" class="functionicon"></th>
                      <th width="15px" class="functionicon"></th>
		        			</tr>
						</thead>
						<tbody>
		    			<tr v-for="(invoicetype, index) in listinvoicetypes" :key="index">
                <td>{{((page-1)*20)+index+1}}</td>
		        				<td>{{invoicetype.project_name}}</td>
		        				<td>{{invoicetype.project_id}}</td>
                    <td>{{displayProjectType(invoicetype.project_type)}}</td>
                    
		        				<td>{{todate(invoicetype.create_date)}}</td>	
								<td>
									<span>
		                <a href="#" @click="showisModalEditVisible(invoicetype)">
		                    <i class="fa fa-edit"></i>
		                </a>
									</span>
		        		</td>
								<td>
		            	<a href="#" @click="dellInvoiceType(invoicetype._id,invoicetype.project_name)">
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
    <AddInvoiceType @inputData="updateMessage"
      v-show="isModalVisible"
      @close="closeModal"
    />
    <EditInvoiceType
      :editid="editid"
      v-show="isModalEditVisible"
      @close="closeEditModal"
    />
		</section>	
    <vue-confirm-dialog></vue-confirm-dialog>
    </div>
    
    		
</template>
<script>
import AddInvoiceType from '@/components/invoicetype/AddInvoiceType';
import EditInvoiceType from '@/components/invoicetype/EditInvoiceType';
import lib from '@/plugins/lib.js'
export default {
  data() {
    return {
      isModalVisible: false,
      isModalEditVisible:false,
      listinvoicetypes:'',
      countinvoicetype:'',
      project_date:'',
      page:Number(this.$route.query.page),
      editid: '',
    };
  },
	components: {
        AddInvoiceType,
        EditInvoiceType,
  },
  methods: {
    	todate: function(item) {
					return lib.timestamptodate(item);
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
      showModal() {
        this.isModalVisible = true;
      },
      showisModalEditVisible(id) {
        this.editid = id;
        this.isModalEditVisible = true;
        
      },
      closeModal() {
        this.isModalVisible = false;
      },
      closeEditModal() {
        this.isModalEditVisible = false;
      },
      clickCallback (pageNum){
        //this.$router.get('api/projects/listinvoicetype?page='+pageNum)
        this.$http.get('api/projects/getallprojects?page='+pageNum,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
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
              this.$http.post('api/projects/dellproject', {
                id:id,
              },
              {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
              ).then(response => {
                this.$http.get('api/projects/getallprojects?page='+this.$route.query.page,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
                .then(response => (this.listinvoicetypes = response.data));
                    this.$http.get('api/projects/getcountprojects',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
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
    this.$http.get('api/projects/getallprojects?page='+this.$route.query.page,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
      .then(response => {this.listinvoicetypes = response.data});
    this.$http.get('api/projects/getcountprojects',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
        .then(response => (this.countinvoicetype = response.data));
  }
};
</script>