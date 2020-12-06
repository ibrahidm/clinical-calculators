// Created by Dr. Daniel M. Ibrahim, PharmD

const compose = (f, g) => (...args) => f(g(...args))

const patient = {
   age: null,
   male: null,
   weight: null,
   srcr: null,
   crcl: null,
   crclSteps: []
}

const getCrCl = function ({ age, male, weight, srcr }) {
   console.log(age, male, weight, srcr)
   return calculateCreatinineClearance(
      outputResult,
      performDivision,
      performSerumCreatinineMultiplication,
      performBodyWeightMultiplication,
      performAgeSubtraction,
      getParams
   )({ patient, age, male, weight, srcr })
}

function calculateCreatinineClearance (...fns) {
   return fns.reduce(compose)
}

function getParams ({ patient, age, male, weight, srcr }) {
   return { ...patient, age, male, weight, srcr }
}

function performAgeSubtraction (patient) {
   const value = 140 - patient.age
   const updateStep = patient.crclSteps.concat(`Step 1: 140 - ${patient.age} (years) = ${value}`)
   return { ...patient, crcl: value, crclSteps: updateStep }
}

function performBodyWeightMultiplication (patient) {
   const value = patient.crcl * patient.weight
   const updateStep = patient.crclSteps.concat(`Step 2: ${patient.crcl} x ${patient.weight} (kg) = ${value}`)
   return { ...patient, crcl: value, crclSteps: updateStep }
}

function performSerumCreatinineMultiplication (patient) {
   const value = patient.crcl * (1 / patient.srcr)
   const updateStep = patient.crclSteps.concat(`Step 3: ${patient.crcl} x 1/${patient.srcr} (mg/dL) = ${value}`)
   return { ...patient, crcl: value, crclSteps: updateStep }
}

function performDivision (patient) {
   const value = patient.crcl / 72
   const updateStep = patient.crclSteps.concat(`Step 4: ${patient.crcl} x 1/72 = ${value.toFixed(3)} mL/min`)
   return { ...patient, crcl: value, crclSteps: updateStep }
}

function outputResult ({ male, crcl, crclSteps }) {
   if (male) {
      return { crcl, crclSteps }
   } else {
      const value = crcl * 0.85
      const updateStep = crclSteps.concat(`Step 5: ${crcl} x 0.85 (female adjustment) = ${value}`)
      return { crcl: value, crclSteps: updateStep }
   }
}

module.exports = {
   getCrCl
}
