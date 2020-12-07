<template>
    <v-card
         class="mx-auto"
         max-width="950"
      >
         <v-card-title
            class="text-h5"
         >
            <v-spacer />
            {{ title }}
            <v-btn
               icon
               class="ml-1"
               @click.stop="$emit('on-click')"
            >
               <v-icon>
                  mdi-information-outline
               </v-icon>
            </v-btn>
            <v-spacer />
         </v-card-title>
      </v-card>
</template>

<script>
export default {
   props: {
      title: {
         type: String
      }
   }
}
</script>
