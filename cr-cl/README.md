# Creatinine Clearance Calculator (Cockcroft-Gault Equation)

### Overview

A functional program for calculating a patient's creatinine clearance (CrCl).

CrCl is a parameter that measures the approximate volume of plasma cleared of creatinine (by the kidney) per minute. It is measured in units of mL/min. This provides an objective measure in order to assess kidney function.

While there are other methods of calculating CrCl and estimating renal function (e.g. eGFR), CrCl calculated using the Cockcroft-Gault equation remains the industry standard because the vast majority of drugs have been studied using this equation and are thereby dosed based on its output.

##
  
### Inputs
The following patient parameters are necessary to perform the calculation: 
* **age** // type: number -- the patient's age in years 
* **male** // type: boolean -- the patient's biological sex as either male (`true`) or female (`false`)
* **weight** // type: number -- the patient's weight in **kg**
* **srcr**// type: number -- the patient's serum creatinine in **mg/dL**

Arguments are accepted as a single object and must contain the above inputs (*see example section below*). 

##

### Outputs 

The module is currently accessible as a named-export called `getCrCl`. It outputs two parameters from an internal de-structured patient object. These parameters are: 
* `crcl`
* `crclSteps`

where `crcl` is the numerical value in **mL/min** and `crclSteps` is an array of strings outlining each step taken in the calculation. 

##

### Example 
Import using appropriate method from wherever file is saved: 
```
const { getCrCl } = require("./cr-cl.js");
```

Input variables can be defined using a custom class constructor, variables, or values can be directly entered into the function, depending on your implementation.

For readability, here we will define the variables and then plug them into the `getCrCl` imported function. 

```
const age = 24; // years
const male = true;
const weight = 83; // kg
const srcr = 0.8; //mg/dL

const data = getCrCl({ 
	age,
	male, 
	weight, 
	srcr
});

const crcl = data.crcl;

console.log('CrCl:', data.crcl);
console.log('Steps:', data.crclSteps); 
```

Based on the above entered parameters, here are the expected `console.log()` outputs: 

```
CrCl: 167.15277777777777
Steps: ['Step 1: 140 - 24 (years) = 116','Step 2: 116 x 83 (kg) = 9628', 'Step 3: 9628 x 1/0.8 (mg/dL) = 12035', 'Step 4: 12035 x 1/72 = 167.153 mL/min']
```

##

### Notes 

* `crclSteps` will have an additional "Step 5" for female patients.
* For clinical accuracy, different patient weights are used depending on a few different factors. Here are some scenarios to consider based on the patient's weight:
	* Actual Weight (AW) < Ideal Body Weight (IBW) ---> use **AW**
	* AW > IBW ---> use **IBW**
	* AW/IBW > 1.3 ---> use Adjusted Body Weight (**ABW**)  

Please feel free to reach out if you have any questions or concerns! 