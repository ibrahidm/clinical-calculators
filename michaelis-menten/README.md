# Michaelis-Menten Pharmacokinetics

### Overview
A functional program for modelling Michaelis-Menten Pharmacokinetics (MMPK). 

The Michaelis-Menten equation (MME) provides a model for concentration-dependent enzymatic reactions. For metabolic processes wherein the metabolizing enzyme experiences saturation, the reaction proceeds in a non-linear fashion in proportion to the concentration of substrate and the catalytic capacity of the enzyme. When this principal is applied to drugs, it is most commonly modelled using the MME and is typically referred to as MMPK (or simply as Michaelis-Menten *Kinetics*). 

##

### Inputs

The following parameters are necessary to perform the calculation: 

* **vmax** // type: number -- maximum reaction rate
* **substrateConcentration** // type: number -- the specific substrate concentration for which you wish to know the reaction rate
* **km** // type: number -- the substrate concentration at 50% of the maximum rate (**vmax**)

Arguments are accepted as a single object and must contain the above inputs (*see example section below*)

Please note that, for now, you are responsible to ensure that the units you are entering are consistent across all three inputs. 

##

### Outputs

The module is currently accessible as a named export called `getMichMenReactionRate`. It outputs three parameters from an internal de-structured `params` object. These parameters are: 
* `reactionRate` // type: number -- rate of reaction (for given concentration)
* `reactionRateSteps` // type: array -- steps taken to achieve result
* `vals` // type: array -- array of 100 values for the given model

The `vals` output is unique as it is independent of the inputted **substrateConcentration**. Its purpose is to provide enough data to construct visuals and graphs based on the generated model relative to the **vmax** and the **km**. Please see the `front-end` folder for an example of simple implementation. 

##

### Example

Import using appropriate method from wherever file is saved:

```
import { getMichMenReactionRate } from './michaelis-menten.js'
```

Input variables can be defined using a custom class constructor, variables, or values can be directly entered into the function, depending on your implementation.

For readability, here we will define the variables and then plug them into the  `getMichMenReactionRate`  imported function.

```
const vmax = 20;
const substrateConcentration = 4;
const km = 8; 

const { reactionRate, reactionRateSteps, vals } = getMichMenReactionRate({ vmax, substrateConcentration, km });

console.log('rate:', reactionRate)
console.log('steps:', reactionRateSteps)
```
Based on the above entered parameters, here are the expected console.log() outputs (please note that `vals` has been omitted intentionally for the sake of space and readability). 
```
rate: 6.666666666666667
steps: ["Step 1: Vmax * [substrate]: 20 x 4 = 80", "Step 2: km + [substrate]: 8 + 4 = 12", "Step 3: Vmax * [substrate] / (km + [substrate]): 80 / 12 = 6.666666666666667"]
```
##

### Notes

Please feel free to reach out if you have any questions or concerns!