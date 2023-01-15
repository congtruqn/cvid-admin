<template>
  <div style="position: relative;width: auto; height: 100%;" id="left_menu">
    <div
      data-height="100%"
      data-scrollbar="true"
      style="width: auto; height: 100%;"
      data-init="true"
    >
      <ul class="nav">
        <li class="has-sub active" v-if="nld">
          <a href="#">
            <i class="fa fa-gears"></i>
            <span>Quản lý NLD</span>
            <b class="caret pull-right"></b>
          </a>
          <ul class="sub-menu">
            <li><a href="/list-employee">Danh sách NLĐ đăng kí</a></li>
            <li><a href="/list-cvid">Danh sách CVID</a></li>
          </ul>
        </li>

        <li class="has-sub" v-if="ntd">
          <a href="#">
            <i class="fa fa-gears"></i>
            <span>Quản lý NTD</span>
            <b class="caret pull-right"></b>
          </a>
          <ul class="sub-menu">
            <li>
              <a href="/list-registered-businesses">Danh sách NTD đăng kí</a>
            </li>
            <li><a href="/businesses">Quản lý nhà tuyển dụng</a></li>
            <li><a href="/businesses/position">Quản lý tin tuyển dụng</a></li>
          </ul>
        </li>
        <li class="has-sub">
          <a href="#">
            <i class="fa fa-gears"></i>
            <span>Quản lý danh mục</span>
            <b class="caret pull-right"></b>
          </a>
          <ul class="sub-menu">
            <li><a href="/jobtitles">Chức danh công việc</a></li>
            <li><a href="/environments">Môi trường làm việc</a></li>
            <li><a href="/typebusiness">Loại hình doanh nghiệp</a></li>
            <li><a href="/schools">Danh sách trường</a></li>
            <li><a href="/positions">Danh sách chức vụ</a></li>
            <li><a href="/majors">Danh sách chuyên nghành</a></li>
            <li><a href="/industries">Nghành công nghiệp</a></li>
            <li><a href="/a">Câu hỏi đánh giá</a></li>
          </ul>
        </li>
        <li class="has-sub" v-if="admin">
          <a href="#">
            <i class="fa fa-gears"></i>
            <span>Quản lý danh mục</span>
            <b class="caret pull-right"></b>
          </a>
          <ul class="sub-menu">
            <li>
              <a href="/administrator/listgroupuser">Quản lí Nhóm Quyền</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from '../../utils/AxiosInstance';
const { BASE_URL } = require('../../utils/config');
export default {
  data() {
    return {
      nld: false,
      ntd: false,
      admin: false
    }
  },
  created() {
    axios
      .get(`admin/get-role`)
      .then(response => {
        console.log(response);
        if (response.data) {
          let admin = response.data;
          admin.roles.forEach(role => {
            if (['nldC1', 'nldC2'].includes(role)){
              this.nld = true
            }
            if (['ntdC1', 'ntdC2'].includes(role)){
              this.ntd = true
            }
            if (['admin'].includes(role)){
              this.admin = true
            }
          });
        }
      });
  }
};
</script>
