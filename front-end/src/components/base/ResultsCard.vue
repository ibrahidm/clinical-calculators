<template>
   <v-card
      v-bind="$attrs"
      min-height="350"
      class="mx-auto mt-8"
   >
      <v-card-title
         class="text-subtitle-1"
      >
         <v-spacer />
            Results
         <v-spacer />
      </v-card-title>
      <v-card-text>
         <v-row
            style="height: 20vh"
         >
            <v-col
               align-self="center"
            >
               <v-card
                  class="my-auto mx-auto"
                  flat
               >
                  <div
                     class="text-h2 text-center"
                     v-if="result"
                  >
                     {{ result.toFixed(2) }} {{ units }}
                  </div>
               </v-card>
            </v-col>
            <v-col
               align-self="center"
            >
               <v-card
                  class="overflow-y-auto my-auto mx-auto"
                  max-height="250"
                  flat
               >
                  <v-card
                     v-for="(step, index) in steps"
                     :key="index"
                     max-height="200"
                     class="overflow-y-auto text-body-1 ma-2"
                  >
                     <v-card-text>
                        <v-row>
                           <v-col
                              cols="3"
                              align-self="center"
                           >
                              <div
                                 class="my-auto text-overline"
                              >
                                 {{ step.substr(0, 6) }}
                              </div>
                           </v-col>
                           <v-col>
                              <div
                                 class="text-overline"
                              >
                                 {{ step.substr(8, step.length - 1) }}
                              </div>
                           </v-col>
                        </v-row>
                     </v-card-text>
                  </v-card>
               </v-card>
            </v-col>
         </v-row>
      </v-card-text>
   </v-card>
</template>

<script>
export default {
   props: {
      result: {
         type: Number,
         default: null
      },

      steps: {
         type: Array
      },

      units: {
         type: String
      }
   }
}
</script>
