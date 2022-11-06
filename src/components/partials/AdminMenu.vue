<template>
<div style="position: relative;width: auto; height: 100%;" id="left_menu">
  <div data-height="100%" data-scrollbar="true" style="width: auto; height: 100%;" data-init="true">
    <ul class="nav">
      <li class="has-sub active">
        <a href="#">
          <i class="fa fa-gears"></i>
            <span>Quản lý khách hàng</span>
          <b class="caret pull-right"></b>
        </a>
        <ul class="sub-menu">
          <li><a href="/listproject">Quản lý dự án</a></li>
          <li><a href="/toquote">Quản lý báo giá</a></li> 
        </ul>
      </li>
      
      <li class="has-sub">
        <a href="#">
          <i class="fa fa-gears"></i>
            <span>Quản lý tài khoản</span>
          <b class="caret pull-right"></b>
        </a>
        <ul class="sub-menu">
          <li><a href="/employees">Quản lý người tìm việc</a></li>
          <li><a href="/employees/notbrowse">Danh sách CV không được duyệt</a></li>
          <li><a href="/businesses">Quản lý nhà tuyển dụng</a></li>
          <li><a href="/businesses/position">Quản lý tin tuyển dụng</a></li>
          <li><a href="/administrator/listuseraction">Quản lí tác vụ</a></li>
          <li><a href="/administrator/listgroupuser">Quản lí Nhóm Quyền</a></li>
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
          <li><a href="/">Môi trường làm việc</a></li>
          <li><a href="/">Loại hình doanh nghiệp</a></li>
          <li><a href="/schools">Danh sách trường</a></li>
          <li><a href="/">Danh sách chức vụ</a></li>
          <li><a href="/">Danh sách chuyên nghành</a></li>
          <li><a href="/">Nghành công nghiệp</a></li>
          <li><a href="/a">Câu hỏi đánh giá</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>