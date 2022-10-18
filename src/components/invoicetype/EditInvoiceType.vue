<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <button aria-label="Dismiss" class="ngdialog-close" @click="$emit('close')"></button>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Tên dự án</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="editid.project_name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Mã dự án</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="editid.project_id">
              </div>
            </div>
        
            <div class="form-group">
              <label class="col-sm-2 control-label">Loại dự án</label>
              <div class="col-sm-10">
                <select v-model="editid.project_type" class="form-control">
                  <option v-for="option in projects" v-bind:value="option.value">
                    {{ option.text }}
                  </option>
                </select>
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
          projects: [
            { text: 'Thương mại', value: 1 },
            { text: 'Thiết kế', value: 2 },
            { text: 'Thi công', value: 3 }
          ]
      }
    },
    methods: {
        handleSubmit() {
                if (this.editid.project_name.length > 0) {
                  this.$emit('close');
                    this.$http.post('api/projects/editproject', {
                        project_name: this.editid.project_name,
                        project_id: this.editid.project_id,
                        project_type:this.editid.project_type,
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
    props:['editid']
  };
</script>