<template>
   <v-dialog
      v-bind="$attrs"
      v-on="$listeners"
   >
      <v-card>
         <v-card-title
            class="text-h4"
         >
            <v-spacer />
               {{ title }}
            <v-spacer />
         </v-card-title>

         <v-card-text
            class="text-center text-body-1"
         >
            <v-divider
               class="mb-3"
            />
            <div
               v-if="para1"
            >
               {{ para1 }}
            </div>
            <br
               v-if="para1"
            >
            <div
               v-if="para2"
            >
               {{ para2 }}
            </div>
            <br
               v-if="para2"
            >
            <div
               v-if="para3"
            >
               {{ para3 }}
            </div>
         </v-card-text>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   props: {
      title: {
         type: String
      },
      para1: {
         type: String,
         default: null
      },
      para2: {
         type: String,
         default: null
      },
      para3: {
         type: String,
         default: null
      }
   }
}
</script>
