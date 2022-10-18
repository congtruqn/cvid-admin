<template>
<div class="container-fluid">
  <div class="navbar-header">
    <a class="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar" id ="togglemenu"></a>
    <a href="/" class="navbar-brand1"><img src="@/assets/images/logo.jpg"></a>
  </div>
  <ul class="nav navbar-nav navbar-right">
    <li>
<form class="navbar-form full-width">
							<div class="form-group1">
								<input type="text" class="form-control" placeholder="Tìm hóa đơn">
								<button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
							</div>
						</form>
    </li>
    <li class="dropdown">
      <a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle f-s-14" @click="isShowLang = !isShowLang">
							<span class="hidden-xs">Language</span>
              <b class="caret"></b>
			</a>
      <ul class="dropdown-menu media-list pull-right animated fadeInDown" v-if="isShowLang">
          <li class="dropdown-header">Language</li>
          <li class="media">
            <a href="javascript:;">
              <div class="media-left"><img src="@/assets/images/vi.png"></div>
              <div class="media-body">
                  <h5 class="media-heading">Tiếng Việt</h5>
                  <div class="text-muted f-s-11">Vietnamese</div>
              </div>
            </a>
          </li>
          <li class="media">
            <a href="javascript:;">
              <div class="media-left"><img src="@/assets/images/en.png"></div>
              <div class="media-body">
                  <h5 class="media-heading">English</h5>
                  <div class="text-muted f-s-11">Tiếng anh</div>
              </div>
            </a>
          </li>
				</ul>
    </li>
    <li  id="root" class="dropdown navbar-user" @click="isShow = !isShow">
      <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false" >
        <img alt="" src="@/assets/images/user.png">
        <span class="hidden-xs"></span>
        <b class="caret"></b>
      </a>
      <ul class="dropdown-menu animated fadeInLeft" v-if="isShow">
        <li class="arrow"></li>
        <li><a href="/administrator/editprofile">Chỉnh sửa thông tin</a></li>
        <li class="divider"></li>
        <li><a onclick="Logout()" href="#">Thoát</a></li>
      </ul>
    </li>
  </ul>
</div>
</template>
<script>
  export default {
    name: 'AdminHeader',
    data () {
      return {
        isShow:false,
        isShowLang:false
      }
    }
  }
</script>