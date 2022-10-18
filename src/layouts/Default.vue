<template>
    <div class="wrapper" id="wrapper">
      <header class="header navbar navbar-default navbar-fixed-top ng-scope" id="header">
        <AdminHeader />
      </header>
      <div class="sidebar ng-scope leftmenu1" ng-class="{ 'sidebar-transparent': setting.layout.pageSidebarTransparent }" id="sidebar">
        <AdminMenu />
      </div>
      <div class="content content1">
        <router-view />
      </div>
    </div>
</template>
<script>
import AdminHeader from '@/components/partials/AdminHeader'
import AdminMenu from '@/components/partials/AdminMenu'
  export default {
    name: 'defaultLayout',
    components: {
        AdminHeader,
        AdminMenu
    }
  }
</script>