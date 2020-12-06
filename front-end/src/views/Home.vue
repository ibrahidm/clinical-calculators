<template>
   <v-container
   >
      <v-row
         style="height: 65vh"
         align="center"
         justify="center"
      >
         <v-col
            align-self="center"
         >
            <v-card
               max-width="850"
               class="mx-auto"
            >
               <v-card-title
                  class="text-h5 pt-5"
               >
                  <v-spacer />
                     <span> Welcome to the <span class="font-italic"> Clinical Calculators </span> Front-End Web App! </span>
                  <v-spacer />
               </v-card-title>

               <v-card-text
                  class="text-h6 text-center"
               >
                  <div>
                     This simple application is intended to give you an easy-to-use playground in order to try-out the different
                     equations included in this repo!
                  </div>

                  <br>

                  <div>
                     This project was started in an effort to eventually develop an npm package that can be used for developing
                     healthcare applications! As more equations are added to the repo, this front-end application will also evolve to accomodate them.
                  </div>

                  <br>

                  <div>
                     Use the navigation bar on the left of the screen to select the equation you would like to experiment with.
                  </div>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>
