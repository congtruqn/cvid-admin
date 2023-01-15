<template>
  <div id="login">
    <form>
      <h1>Sign In</h1>
      <input type="text" v-model="email" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" class="btn btn-default" @click="handleSubmit">
        Sign in
      </button>
    </form>
  </div>
</template>
<script>

import axios from '../utils/AxiosInstance';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        axios
          .post(`admin/login`, {
            username: this.email,
            password: this.password,
          })
          .then(response => {
            return response.data;
          })
          .then(data => {
            if (data.token) {
              localStorage.setItem('token', data.token);
              this.$router.push('list-employee');
            }
          })

          .catch(function(error) {
            alert('Invalid username or password');
          });
      }
    },
  },
};
</script>
