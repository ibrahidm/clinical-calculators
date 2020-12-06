<template>
   <v-app>
      <app-bar/>
      <app-navigation-drawer />

      <v-main class="grey lighten-5">
         <router-view />
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: 'App',

   components: {
      AppBar: () => import('@/components/app/AppBar.vue'),
      AppNavigationDrawer: () => import('@/components/app/AppNavigationDrawer.vue')
   },

   data: () => ({
      //
   })
}
</script>
