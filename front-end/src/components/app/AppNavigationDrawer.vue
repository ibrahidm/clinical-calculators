<template>
   <v-navigation-drawer
      app
      clipped
   >
      <v-list
      >
         <v-list-item
            :to="{ name: 'Home' }"
            class="my-4"
         >
            Home
         </v-list-item>
         <v-divider
            class="mb-4"
         />
         <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="{ name: item }"
         >
            {{ item }}
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
</template>

<script>
export default {
   data: () => ({
      items: [
         'Creatinine Clearance'
      ]
   })
}
</script>
