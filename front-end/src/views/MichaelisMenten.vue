<template>
   <v-container>
      <v-row>
         <v-col
            cols="12"
         >
            <base-title-card
               title="Michaelis-Menten Elimination"
               @on-click="dialog = true"
               class="mb-3"
            />
         </v-col>
         <v-col
            cols="4"
            align-self="center"
         >
            <v-card
               class="mx-auto"
               max-width="450"
            >
               <v-card-title
                  class="text-subtitle-1"
               >
                  <v-spacer />
                     Parameters
                  <v-spacer />
               </v-card-title>
               <v-card-text>
                  <v-form
                     v-model="valid"
                  >
                     <v-row>
                        <v-col
                           cols="12"
                        >
                           <v-text-field
                              v-model="params.vmax"
                              outlined
                              label="Vmax"
                              placeholder=" "
                              type="number"
                              :rules="rules"
                           />
                        </v-col>
                        <v-col
                           cols="12"
                        >
                           <v-text-field
                              v-model="params.substrateConcentration"
                              outlined
                              label="Substrate Concentration"
                              placeholder=" "
                              type="number"
                              :rules="rules"
                           />
                        </v-col>
                        <v-col
                           cols="12"
                        >
                           <v-text-field
                              v-model="params.km"
                              outlined
                              label="Km"
                              placeholder=" "
                              type="number"
                              :rules="rules"
                           />
                        </v-col>
                     </v-row>
                  </v-form>
               </v-card-text>
               <v-card-actions
                  class="mt-n5"
               >
                  <v-btn
                     text
                     block
                     @click="calculate (params)"
                     :disabled="!valid"
                  >
                     Calculate
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>
         <v-col
            cols="8"
            align-self="center"
         >
            <v-row
               no-gutters
            >
               <v-col
                  cols="12"
               >
                  <v-card
                     max-width="900"
                     min-height="300"
                     class="mx-auto text-center"
                     :color="vals.length === 0 ? 'rgba(0,0,0,0.2)' : ''"
                     :disabled="vals.length === 0"
                  >
                     <v-card-title
                        class="text-body-1"
                     >
                        <v-spacer />
                           Graph
                        <v-spacer />
                     </v-card-title>
                     <v-card-text>
                        <v-sheet
                           class="v-sheet--offset mx-auto"
                           elevation="3"
                           height="190"
                        >
                           <v-sparkline
                              class="mx-10"
                              :value="vals"
                              :smooth="radius || false"
                              :padding="padding"
                              :line-width="width"
                              :stroke-linecap="lineCap"
                              :gradient-direction="gradientDirection"
                              :gradient="gradient"
                              :fill="fill"
                              :type="type"
                              :auto-line-width="autoLineWidth"
                              auto-draw
                           />
                        </v-sheet>
                     </v-card-text>
                     <v-card-text>
                        <div
                           class="overline font-weight-thin"
                        >
                           Elimination Rate (y-axis) vs. Concentration (x-axis) Plot
                        </div>
                     </v-card-text>
                  </v-card>
               </v-col>
               <v-col
                  cols="12"
               >
                  <base-results-card
                     :result="eliminationRate"
                     :steps="steps"
                     :color="vals.length === 0 ? 'rgba(0,0,0,0.2)' : ''"
                     :disabled="vals.length === 0"
                     :max-width="900"
                  />
               </v-col>
            </v-row>
         </v-col>
      </v-row>
      <base-dialog
         title="Michaelis-Menten Elimination"
         :para1="para1"
         v-model="dialog"
         width="600"
      />
   </v-container>
</template>

<script>
import { getMichMenEliminationRate } from '@/model/michaelis-menten.js'

export default {
   data: () => ({
      dialog: false,
      valid: false,
      rules: [
         v => !!v || 'You must enter a numerical value!'
      ],
      params: {
         vmax: null,
         substrateConcentration: null,
         km: null
      },

      eliminationRate: null,
      steps: null,
      vals: [],
      vals2: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,
      radius: 0,
      gradient: ['#f72047', '#ffd200', '#1feaea'],
      gradientDirection: 'top',
      padding: 10,
      lineCap: 'round',
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      para1: 'Information about MME will go here.'
   }),

   methods: {
      calculate ({ vmax, substrateConcentration, km }) {
         this.vals = []
         km = parseFloat(km)
         const { eliminationRate, eliminationRateSteps, vals } = getMichMenEliminationRate({ vmax, substrateConcentration, km })
         this.eliminationRate = eliminationRate
         this.steps = eliminationRateSteps
         this.vals = [...vals]
      }
   }
}
</script>
