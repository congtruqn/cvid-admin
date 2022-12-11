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
              <label class="col-sm-3 control-label">Họ và Tên</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="itemid.name">
              </div>
            <div class="panel-body_modal">
              <button class="btn btn-primary m-r-5 m-b-5" @click="handleSubmit">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'EditItem',
    data(){
      return {
        
      }
    },
    methods: {
        handleSubmit() {

        }
    },
    props:['itemid'],
    
  };
</script>