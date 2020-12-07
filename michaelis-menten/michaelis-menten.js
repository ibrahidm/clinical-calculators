// Created by Dr. Daniel Ibrahim, PharmD

const params = {
    vmax: null,
    substrateConcentration: null,
    km: null,
    eliminationRate: null,
    eliminationRateSteps: [],
    vals: [],
    temp: null
  };
  
  const compose = (f, g) => (...args) => f(g(...args));
  
  const getMichMenEliminationRate = function ({ vmax, substrateConcentration, km }) {
    return calculateEliminationRate(
      outputResult,
      populateChartData,
      performDivision,
      calculateDenominator,
      calculateNumerator,
      getParams
    )({ ... params, vmax, substrateConcentration, km });
  };
  
  function calculateEliminationRate (...fns) {
    return fns.reduce(compose);
  }
  
  function getParams ({ vmax, substrateConcentration, km }) {
    return { ...params, vmax, substrateConcentration, km };
  }
  
  function calculateNumerator (params) {
    const value = params.vmax * params.substrateConcentration;
    const updateStep = params.eliminationRateSteps.concat(`Step 1: Vmax * [substrate]: ${params.vmax} x ${params.substrateConcentration} = ${value}`);
    return { ...params, eliminationRate: value, eliminationRateSteps: updateStep };
  }
  
  function calculateDenominator (params) {
    const value = params.km + params.substrateConcentration;
    const updateStep = params.eliminationRateSteps.concat(`Step 2: km + [substrate]: ${params.km} + ${params.substrateConcentration} = ${value}`);
    return { ...params, temp: value, eliminationRateSteps: updateStep };
  }
  
  function performDivision (params) {
    const value = params.eliminationRate / params.temp;
    const updateStep = params.eliminationRateSteps.concat(`Step 3: Vmax * [substrate] / (km + [substrate]): ${params.eliminationRate} / ${params.temp} = ${value}`)
    return { ...params, eliminationRate: value, eliminationRateSteps: updateStep };
  }
  
  function populateChartData (params) {
    let num = 0;
    const arr = [];
    for (var i = 0; i < 100; i++) {
       num = num + (params.vmax * (1 / 50));
       const value = (params.vmax * num) / (params.km + num);
       arr.push(value);
    };
    return { ...params, vals: arr };
  };
  
  function outputResult ({ eliminationRate, eliminationRateSteps, vals }) {
    return { eliminationRate, eliminationRateSteps, vals };
  }
