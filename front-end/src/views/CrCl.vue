<template>
   <v-container>
      <v-row>
         <v-col
            cols="12"
         >
           <base-title-card
               title="Creatinine Clearance (Cockcroft-Gault Equation)"
               @on-click="dialog = true"
           />
         </v-col>

         <v-col
            cols="12"
         >
            <v-card
               class="mx-auto"
               max-width="950"
            >
               <v-card-title
                  class="text-subtitle-1"
               >
                  <v-spacer />
                     Patient Parameters
                  <v-spacer />
               </v-card-title>
               <v-card-text>
                  <v-form
                     v-model="valid"
                  >
                     <v-row>
                        <v-col
                           cols="3"
                        >
                           <v-text-field
                              v-model="data.age"
                              outlined
                              label="Age"
                              placeholder=" "
                              type="number"
                              suffix="years"
                              :rules="rules"
                           />
                        </v-col>
                        <v-col
                           cols="3"
                        >
                           <v-select
                              v-model="data.male"
                              label="Sex"
                              placeholder=" "
                              outlined
                              :items="items"
                              item-text="sex"
                              item-value="val"
                              :rules="[v => !null || 'Item is required']"
                           />
                        </v-col>
                        <v-col
                           cols="3"
                        >
                           <v-text-field
                              v-model="data.weight"
                              outlined
                              label="Weight"
                              placeholder=" "
                              type="number"
                              suffix="Kg"
                              :rules="rules"
                           />
                        </v-col>
                        <v-col
                           cols="3"
                        >
                           <v-text-field
                              v-model="data.srcr"
                              outlined
                              label="SrCr"
                              placeholder=" "
                              type="number"
                              suffix="mg/dL"
                              :rules="rules"
                           >
                           </v-text-field>
                        </v-col>

                        <v-col
                           cols="4"
                        >
                           <v-text-field
                              v-model="data.height"
                              outlined
                              label="Height"
                              placeholder=" "
                              type="number"
                              suffix="cm"
                              hint="Enter height to get an accurate CrCl based on the appropriate weight value"
                           />

                        </v-col>
                        <v-col
                           cols="4"
                        >
                           <v-text-field
                              v-model="calculateIBW"
                              outlined
                              label="Ideal Body Weight"
                              placeholder=" "
                              type="number"
                              suffix="Kg"
                              disabled
                           />
                        </v-col>
                        <v-col
                           cols="4"
                        >
                           <v-text-field
                              v-model="calculateABW"
                              outlined
                              label="Actual Body Weight"
                              placeholder=" "
                              type="number"
                              suffix="Kg"
                              disabled
                           />
                        </v-col>
                     </v-row>
                  </v-form>
               </v-card-text>
               <v-card-actions>
                  <v-btn
                     @click="calculate (data)"
                     text
                     color="success"
                     block
                     :disabled="!valid"
                  >
                     Submit
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>

         <v-col
            cols="12"
         >
            <base-results-card
               units="mg/dL"
               :result="crcl"
               :steps="steps"
               :color="!crcl ? 'rgba(0,0,0,0.2)' : ''"
               :disabled="!crcl"
               max-width="950"
            />
         </v-col>
      </v-row>
      <base-dialog
         v-model="dialog"
         title="Creatinine Clearance"
         width="600"
         :para1="para1"
         :para2="para2"
         :para3="para3"
      />
   </v-container>
</template>

<script>
import { getCrCl } from '@/model/crcl'

export default {
   name: 'CrCl',
   data: () => ({
      items: [{ sex: 'Male', val: true }, { sex: 'Female', val: false }],
      valid: false,
      rules: [
         v => !!v || 'This field cannot be blank!',
         v => typeof parseFloat(v) === 'number' || 'This field must be a number!'
      ],
      data: {
         age: null,
         male: null,
         weight: null,
         srcr: null,
         height: null
      },
      crcl: null,
      steps: null,
      dialog: false,
      para1: 'CrCl is a parameter that measures the approximate volume of plasma cleared of creatinine (by the kidney) per minute. It is measured in units of mL/min. This provides an objective measure in order to assess kidney function.',
      para2: 'While there are other methods of calculating CrCl and estimating renal function (e.g. eGFR), CrCl calculated using the Cockcroft-Gault equation remains the industry standard because the vast majority of drugs have been studied using this equation and are thereby dosed based on its output',
      para3: 'Here in this application you can optionally enter the height. This will perform a calculation for Ideal Body Weight (IBW) and Adjusted Body Weight (ABW). The appropriate weight will be used based on the patient\'s actual body weight in relation to his/her IBW.'
   }),

   computed: {
      calculateIBW () {
         if (this.data.height === null || this.data.male === null || this.data.height === '') return null
         const factor = (this.data.height / 2.54) - 60
         if (this.male) {
            return 50.0 + (2.3 * factor)
         } else {
            return 45.5 + (2.3 * factor)
         }
      },

      calculateABW () {
         if (this.calculateIBW === null || this.data.weight === null) return null
         return this.calculateIBW + 0.4 * (this.data.weight - this.calculateIBW)
      }
   },

   methods: {
      calculate ({ age, weight, srcr, male, height }) {
         age = parseFloat(age)
         weight = parseFloat(weight)
         srcr = parseFloat(srcr)
         height = parseFloat(height)

         if (weight < this.calculateIBW || !height) {
         } else if ((weight / this.calculateIBW) > 1.30) {
            // use abw
            weight = this.calculateABW
         } else {
            // use ibw
            weight = this.calculateIBW
         }

         const data = getCrCl({ age, weight, male, srcr })
         this.crcl = data.crcl
         this.steps = data.crclSteps
      }
   }
}
</script>
