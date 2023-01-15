<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <div class="panel-body_modal">
              <h2 class="text-center">{{ itemid.companyName }}</h2>
              <button
                aria-label="Dismiss"
                class="ngdialog-close"
                @click="$emit('close')"
              ></button>
            </div>
            <div>
              <div></div>
              <img class="imgGPKD" :src="itemid.businessLicense" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const { BASE_URL } = require('../../utils/config')
export default {
  name: 'viewGPKD',
  data () {
    return {
   
    }
  },
  methods: {
  },
  props: ['itemid']
}
</script>
<style scoped>
.imgGPKD {
  width: 100%;
}

.modal-container {
  overflow: scroll;
  max-height: 80vh;
}
</style>
