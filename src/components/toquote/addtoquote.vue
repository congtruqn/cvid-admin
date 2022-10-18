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
              <label class="col-sm-2 control-label">Tên báo giá</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="toquote_name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Thuộc dự án</label>
              <div class="col-sm-10">
                <select v-model="project" class="form-control">
                  <option v-for="option in listprojects" v-bind:value="option">
                    {{ option.project_name }}
                  </option>
                </select>
              </div>
            </div>
        
            <div class="form-group1">
              <label class="col-sm-2 control-label">Ngày deadline</label>
              <div class="col-sm-10">
                <datepicker v-model="deadline" format="dd/MM/yyyy" ></datepicker>
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
import lib from '@/plugins/lib.js'
import Datepicker from 'vuejs-datepicker';
  export default {
    name: 'addtoquote',
    components: {
      Datepicker
    },
    data(){
      return {
          toquote_name : "",
          project_id : "",
          project_name : "",
          project_type: "",
          deadline:"",
          project:"",
          listprojects:[],
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      handleSubmit(e){
                e.preventDefault()
                if (this.toquote_name.length > 1) {
                  //var date = lib.datetotimestamp(this.deadline)
                  var myDate = this.deadline
                  console.log(myDate)
                  var newDate = new Date(myDate);
                  //console.log(newDate.getTime());
                  var date =  newDate.getTime();
                  //console.log(date)
                  this.$emit('close');
                    this.$http.post('api/toquote/addtoquote', {
                        toquote_name: this.toquote_name,
                        project_id: this.project.project_id,
                        project_name:this.project.project_name,
                        project_type:this.project.project_type,
                        deadline:date
                    },
                    {headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }}
                    )
                    .then(response => {
                        this.toquote_name="",
                        this.project_id="",
                        this.project_name="",
                        this.project_type="",
                      this.$http.get('api/toquote/getalltoquotes?page='+this.$route.query.page,{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
                        .then(response => (this.$emit("inputData", response.data)))
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
                else{
                  alert("Vui lòng nhập tên dự án")
                }
            }
    },
    mounted () {
      this.$http.get('api/projects/getallprojectnotpage',{headers: {'Authorization': `Basic ${localStorage.getItem('token')}` }})
        .then(response => (this.listprojects = response.data));
    },
  };
</script>