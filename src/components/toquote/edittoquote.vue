<template>
  <transition name="modal" ref="modalElement">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <button aria-label="Dismiss" class="ngdialog-close" @click="$emit('close')"></button>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Tên báo giá</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="editid.project_name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Thuộc dự án</label>
              <div class="col-sm-10">
                <select v-model="this.projects" class="form-control">
                  <option v-for="option in listprojects" v-bind:value="option">
                    {{ option.project_name }}
                  </option>
                </select>
              </div>
            </div>
        
            <div class="form-group">
              <label class="col-sm-2 control-label">Thẻ riêng</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="editid.project_id">
              </div>
            </div>
            <div class="panel-body_modal">
              <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'EditInvoiceType',
    data(){
      return {
        modalElement: null,
        listprojects:[],
      }
    },
    methods: {
        handleSubmit() {
                if (this.editid.project_name.length > 0) {
                  this.$emit('close');
                    this.$http.post('api/projects/editproject', {
                      
                        project_name: this.editid.project_name,
                        project_id: this.projects.project_id,
                        project_type:this.projects.project_type,
                        id:this.editid._id,
                    },
                    {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
                    )
                    .then(response => {
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
        }
        
    },
    props:['editid','projects'],
    
    mounted () {
      this.$http.get('api/projects/getallprojectnotpage',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
        .then(response => {
          for(var x in response.data){
            var temp = {
              project_name:response.data[x].project_name,
              project_id:response.data[x].project_id,
              toquote_type:response.data[x].project_type,
            }
            this.listprojects.push(temp)
          };
        });
    },
  };
</script>