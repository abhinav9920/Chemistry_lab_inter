(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const TOTAL = 60;
  const systems = {
    'solid-vapour': {
      label: 'SOLID ⇌ VAPOUR', title: 'Sublimation–Deposition Equilibrium', a: 'Solid', b: 'Vapour',
      forward: 'Sublimation', reverse: 'Deposition', initialB: 0, targets: {cool: 6, reference: 14, warm: 25},
      sample: 'Iodine-like solid and vapour', equation: 'Solid ⇌ Vapour', colors: ['#7357d8', '#28a8b5'],
      initial: 'Initially, solid particles sublime while very few vapour particles are available for deposition.',
      equilibrium: 'Sublimation and deposition continue at equal rates. The solid and vapour amounts now fluctuate around constant values.',
      notes: {cool: 'Cooling lowers the equilibrium vapour amount and favours deposition.', reference: 'At the reference temperature, sublimation and deposition establish dynamic equilibrium.', warm: 'Warming increases the equilibrium vapour amount and favours sublimation.'}
    },
    'liquid-vapour': {
      label: 'LIQUID ⇌ VAPOUR', title: 'Vaporization–Condensation Equilibrium', a: 'Liquid', b: 'Vapour',
      forward: 'Vaporization', reverse: 'Condensation', initialB: 2, targets: {cool: 8, reference: 18, warm: 31},
      sample: 'Water-like liquid and vapour', equation: 'Liquid ⇌ Vapour', colors: ['#2476d2', '#27a9a1'],
      initial: 'Liquid particles vaporize from the surface. As vapour collects, condensation becomes more frequent.',
      equilibrium: 'Vaporization and condensation continue at equal rates. Liquid and vapour amounts remain macroscopically constant.',
      notes: {cool: 'Cooling lowers equilibrium vapour pressure and favours condensation.', reference: 'In a sealed vessel, vaporization and condensation can establish dynamic equilibrium.', warm: 'Warming raises equilibrium vapour pressure and favours vaporization.'}
    },
    'solid-liquid': {
      label: 'SOLID ⇌ LIQUID', title: 'Melting–Freezing Equilibrium', a: 'Solid', b: 'Liquid',
      forward: 'Melting', reverse: 'Freezing', initialB: 9, targets: {cool: 2, reference: 30, warm: 58},
      sample: 'Ice-like solid and liquid', equation: 'Solid ⇌ Liquid', colors: ['#6857cf', '#238fc1'],
      initial: 'At the melting point, particles leave the crystal while liquid particles can also join it again.',
      equilibrium: 'At the melting point, melting and freezing continue at equal rates. Both phases coexist without net change.',
      notes: {cool: 'Below the melting point, freezing is favoured and almost all material becomes solid.', reference: 'At the melting point and constant pressure, solid and liquid can coexist in dynamic equilibrium.', warm: 'Above the melting point, melting is favoured and almost all material becomes liquid.'}
    }
  };

  const ui = Object.fromEntries([
    'particleCanvas','chamber','systemLabel','systemTitle','equilibriumStatus','phaseALabel','phaseBLabel','forwardFlash','reverseFlash','observation',
    'runButton','resetButton','speedValue','temperatureValue','temperatureNote','disturbButton','sampleName','sampleEquation','forwardName','reverseName',
    'forwardRate','reverseRate','forwardMeter','reverseMeter','balance','amountAName','amountBName','amountA','amountB','amountABar','amountBBar',
    'amountMessage','amountLegendA','amountLegendB','rateCanvas','amountCanvas','helpButton','helpModal','closeHelp'
  ].map(id => [id, $(id)]));
  const particleCtx = ui.particleCanvas.getContext('2d');
  const rateCtx = ui.rateCanvas.getContext('2d');
  const amountCtx = ui.amountCanvas.getContext('2d');

  let systemKey = 'solid-vapour';
  let temperature = 'reference';
  let speed = 1;
  let running = false;
  let states = [];
  let elapsed = 0;
  let lastTime = performance.now();
  let forwardAccumulator = 0;
  let reverseAccumulator = 0;
  let displayForward = 0;
  let displayReverse = 0;
  let equilibriumHold = 0;
  let equilibriumReached = false;
  let graphTimer = 0;
  let rateHistory = [];
  let amountHistory = [];
  let trails = [];
  let flashTimers = {forward: 0, reverse: 0};

  function scenario() { return systems[systemKey]; }
  function countB() { return states.reduce((sum, value) => sum + (value ? 1 : 0), 0); }
  function targetB() { return scenario().targets[temperature]; }

  function rates() {
    const b = countB(), a = TOTAL - b, target = targetB();
    const thermalFactor = temperature === 'warm' ? 1.18 : temperature === 'cool' ? .86 : 1;
    const equilibriumRate = 4.6 * thermalFactor;
    return {
      forward: equilibriumRate / Math.max(1, TOTAL - target) * a,
      reverse: equilibriumRate / Math.max(1, target) * b
    };
  }

  function resetExperiment() {
    const s = scenario();
    states = Array.from({length: TOTAL}, (_, index) => index < s.initialB);
    elapsed = 0;
    forwardAccumulator = 0;
    reverseAccumulator = 0;
    displayForward = 0;
    displayReverse = 0;
    equilibriumHold = 0;
    equilibriumReached = false;
    graphTimer = 0;
    rateHistory = [{forward: 0, reverse: 0}];
    amountHistory = [{a: TOTAL - s.initialB, b: s.initialB}];
    trails = [];
    flashTimers = {forward: 0, reverse: 0};
    running = false;
    ui.runButton.textContent = '▶ Start';
    ui.observation.textContent = s.initial;
    setStatus('waiting', 'Ready to begin');
    updateReadouts();
  }

  function switchSystem(next) {
    systemKey = next;
    temperature = 'reference';
    document.querySelectorAll('#phenomenonTabs button').forEach(button => button.classList.toggle('active', button.dataset.system === next));
    document.querySelectorAll('#temperatureButtons button').forEach(button => button.classList.toggle('active', button.dataset.temperature === 'reference'));
    updateScenarioText();
    resetExperiment();
  }

  function updateScenarioText() {
    const s = scenario();
    ui.systemLabel.textContent = s.label;
    ui.systemTitle.textContent = s.title;
    ui.phaseALabel.textContent = s.a;
    ui.phaseBLabel.textContent = s.b;
    ui.forwardName.textContent = s.forward;
    ui.reverseName.textContent = s.reverse;
    ui.forwardFlash.textContent = `${s.forward} →`;
    ui.reverseFlash.textContent = `${s.reverse} ←`;
    ui.amountAName.textContent = s.a;
    ui.amountBName.textContent = s.b;
    ui.amountLegendA.textContent = s.a;
    ui.amountLegendB.textContent = s.b;
    ui.sampleName.textContent = s.sample;
    ui.sampleEquation.textContent = s.equation;
    ui.temperatureValue.textContent = 'Reference';
    ui.temperatureNote.textContent = s.notes.reference;
    document.documentElement.style.setProperty('--phase-a', s.colors[0]);
    document.documentElement.style.setProperty('--phase-b', s.colors[1]);
  }

  function setTemperature(next, disturbed = false) {
    temperature = next;
    equilibriumHold = 0;
    equilibriumReached = false;
    document.querySelectorAll('#temperatureButtons button').forEach(button => button.classList.toggle('active', button.dataset.temperature === next));
    const labels = {cool: 'Cooler', reference: 'Reference', warm: 'Warmer'};
    ui.temperatureValue.textContent = labels[next];
    ui.temperatureNote.textContent = scenario().notes[next];
    if (disturbed) ui.observation.textContent = `Temperature changed to ${labels[next].toLowerCase()}. The two rates are no longer equal, so the phase amounts begin changing.`;
    setStatus('approaching', 'Adjusting to new conditions');
    if (!running) toggleRunning(true);
  }

  function toggleRunning(forceOn) {
    running = typeof forceOn === 'boolean' ? forceOn : !running;
    ui.runButton.textContent = running ? 'Ⅱ Pause' : elapsed > 0 ? '▶ Continue' : '▶ Start';
    if (running && elapsed === 0) setStatus('approaching', 'Approaching equilibrium');
    if (!running && elapsed > 0) setStatus(equilibriumReached ? 'equilibrium' : 'waiting', equilibriumReached ? 'Dynamic equilibrium' : 'Paused');
  }

  function setStatus(className, text) {
    ui.equilibriumStatus.className = `status ${className}`;
    ui.equilibriumStatus.querySelector('span').textContent = text;
  }

  function makeEvent(direction) {
    const desiredState = direction === 'forward';
    const candidates = [];
    states.forEach((state, index) => { if (state !== desiredState) candidates.push(index); });
    if (!candidates.length) return;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    states[pick] = desiredState;
    trails.push({direction, born: performance.now(), seed: Math.random()});
    flashTimers[direction] = .22;
  }

  function simulate(dt) {
    if (!running) return;
    const step = Math.min(dt, .06) * speed;
    elapsed += step;
    const current = rates();
    forwardAccumulator += current.forward * step;
    reverseAccumulator += current.reverse * step;
    while (forwardAccumulator >= 1) { makeEvent('forward'); forwardAccumulator -= 1; }
    while (reverseAccumulator >= 1) { makeEvent('reverse'); reverseAccumulator -= 1; }
    const updated = rates();
    const smooth = Math.min(1, step * 3.2);
    displayForward += (updated.forward - displayForward) * smooth;
    displayReverse += (updated.reverse - displayReverse) * smooth;
    const b = countB();
    const nearTarget = Math.abs(b - targetB()) <= 2;
    const nearRates = Math.abs(updated.forward - updated.reverse) / Math.max(1, updated.forward, updated.reverse) < .13;
    if (nearTarget && nearRates) equilibriumHold += step; else equilibriumHold = Math.max(0, equilibriumHold - step * .6);
    if (equilibriumHold > 2.4 && !equilibriumReached) {
      equilibriumReached = true;
      ui.observation.textContent = scenario().equilibrium;
    }
    setStatus(equilibriumReached ? 'equilibrium' : 'approaching', equilibriumReached ? 'Dynamic equilibrium established' : 'Approaching equilibrium');
    graphTimer += step;
    if (graphTimer >= .42) {
      graphTimer = 0;
      rateHistory.push({forward: displayForward, reverse: displayReverse});
      amountHistory.push({a: TOTAL - b, b});
      if (rateHistory.length > 70) rateHistory.shift();
      if (amountHistory.length > 70) amountHistory.shift();
    }
    flashTimers.forward = Math.max(0, flashTimers.forward - step);
    flashTimers.reverse = Math.max(0, flashTimers.reverse - step);
  }

  function updateReadouts() {
    const b = countB(), a = TOTAL - b;
    ui.forwardRate.textContent = displayForward.toFixed(1);
    ui.reverseRate.textContent = displayReverse.toFixed(1);
    const scale = Math.max(7, displayForward, displayReverse);
    ui.forwardMeter.style.width = `${Math.min(100, displayForward / scale * 100)}%`;
    ui.reverseMeter.style.width = `${Math.min(100, displayReverse / scale * 100)}%`;
    ui.amountA.textContent = a;
    ui.amountB.textContent = b;
    ui.amountABar.style.width = `${a / TOTAL * 100}%`;
    ui.amountBBar.style.width = `${b / TOTAL * 100}%`;
    ui.balance.classList.toggle('equal', equilibriumReached);
    ui.balance.querySelector('span').textContent = equilibriumReached ? '=' : '≠';
    ui.balance.querySelector('small').textContent = equilibriumReached ? 'Rates equal' : 'Not equal';
    ui.amountMessage.textContent = equilibriumReached
      ? 'The amounts are now approximately constant, although particles continue to exchange.'
      : 'The amounts change while the forward and reverse rates are unequal.';
    ui.forwardFlash.classList.toggle('show', flashTimers.forward > 0);
    ui.reverseFlash.classList.toggle('show', flashTimers.reverse > 0);
  }

  function fitCanvas(canvas, context) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    return rect;
  }

  function hash(n, salt = 0) {
    const value = Math.sin(n * 91.73 + salt * 47.11) * 43758.5453;
    return value - Math.floor(value);
  }

  function particlePosition(index, stateB, order, width, height, time) {
    if (systemKey === 'solid-vapour') {
      if (!stateB) { const col = order % 10, row = Math.floor(order / 10); return [42 + col * (width - 84) / 9, height - 29 - row * 22]; }
      return [25 + hash(index, 1) * (width - 50) + Math.sin(time * .0008 + index) * 5, 28 + hash(index, 2) * height * .53 + Math.cos(time * .001 + index) * 5];
    }
    if (systemKey === 'liquid-vapour') {
      if (!stateB) return [25 + hash(index, 3) * (width - 50) + Math.sin(time * .0013 + index) * 3, height * .62 + hash(index, 4) * height * .31 + Math.cos(time * .0017 + index) * 3];
      return [25 + hash(index, 5) * (width - 50) + Math.sin(time * .0009 + index) * 5, 28 + hash(index, 6) * height * .48 + Math.cos(time * .0012 + index) * 5];
    }
    if (!stateB) { const col = order % 6, row = Math.floor(order / 6); return [35 + col * Math.max(19, width * .055), height - 30 - row * 22]; }
    return [width * .57 + hash(index, 7) * width * .37 + Math.sin(time * .0014 + index) * 3, height * .54 + hash(index, 8) * height * .38 + Math.cos(time * .0018 + index) * 3];
  }

  function drawParticle(context, x, y, radius, color, alpha = 1) {
    const gradient = context.createRadialGradient(x - radius * .35, y - radius * .4, 1, x, y, radius);
    gradient.addColorStop(0, '#fff'); gradient.addColorStop(.2, color); gradient.addColorStop(1, shade(color, .58));
    context.save(); context.globalAlpha = alpha; context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fillStyle = gradient; context.fill(); context.strokeStyle = 'rgba(22,35,55,.46)'; context.lineWidth = 1.2; context.stroke(); context.restore();
  }

  function shade(hex, factor) {
    const value = parseInt(hex.slice(1), 16);
    return `rgb(${Math.round((value >> 16) * factor)},${Math.round(((value >> 8) & 255) * factor)},${Math.round((value & 255) * factor)})`;
  }

  function drawParticles(now) {
    const rect = fitCanvas(ui.particleCanvas, particleCtx), width = rect.width, height = rect.height;
    particleCtx.clearRect(0, 0, width, height);
    const s = scenario();
    if (systemKey === 'liquid-vapour') {
      particleCtx.fillStyle = 'rgba(62,143,210,.16)'; particleCtx.fillRect(0, height * .59, width, height * .41);
      particleCtx.beginPath(); particleCtx.moveTo(0, height * .59); for (let x = 0; x <= width; x += 12) particleCtx.lineTo(x, height * .59 + Math.sin(x * .04 + now * .0015) * 3); particleCtx.strokeStyle = 'rgba(36,118,210,.65)'; particleCtx.lineWidth = 2; particleCtx.stroke();
    } else if (systemKey === 'solid-liquid') {
      particleCtx.fillStyle = 'rgba(35,143,193,.14)'; particleCtx.fillRect(width * .52, height * .5, width * .48, height * .5);
      particleCtx.setLineDash([5, 5]); particleCtx.beginPath(); particleCtx.moveTo(width * .51, height * .47); particleCtx.lineTo(width * .51, height - 10); particleCtx.strokeStyle = 'rgba(60,80,110,.45)'; particleCtx.stroke(); particleCtx.setLineDash([]);
    }
    let orderA = 0, orderB = 0;
    states.forEach((stateB, index) => {
      const order = stateB ? orderB++ : orderA++;
      const [x, y] = particlePosition(index, stateB, order, width, height, now);
      drawParticle(particleCtx, x, y, stateB ? 8.5 : 9, stateB ? s.colors[1] : s.colors[0], .97);
    });
    trails = trails.filter(trail => now - trail.born < 650);
    trails.forEach(trail => {
      const progress = Math.min(1, (now - trail.born) / 650);
      let from, to;
      if (systemKey === 'solid-liquid') { from = [width * .43, height * .7]; to = [width * .66, height * .7]; }
      else { from = [width * (.42 + trail.seed * .16), height * .78]; to = [width * (.25 + trail.seed * .5), height * .28]; }
      if (trail.direction === 'reverse') [from, to] = [to, from];
      const eased = .5 - Math.cos(progress * Math.PI) / 2;
      const x = from[0] + (to[0] - from[0]) * eased, y = from[1] + (to[1] - from[1]) * eased - Math.sin(progress * Math.PI) * 22;
      drawParticle(particleCtx, x, y, 7, trail.direction === 'forward' ? '#e26b2d' : '#2878cf', 1 - progress * .25);
    });
  }

  function drawGraph(canvas, context, history, keys, colors, maximum) {
    const rect = fitCanvas(canvas, context), width = rect.width, height = rect.height;
    context.clearRect(0, 0, width, height);
    const pad = {left: 34, right: 10, top: 10, bottom: 25}, plotW = width - pad.left - pad.right, plotH = height - pad.top - pad.bottom;
    context.strokeStyle = '#e2e7ef'; context.lineWidth = 1; context.font = '10px Arial'; context.fillStyle = '#7b8797'; context.textAlign = 'right';
    for (let i = 0; i <= 4; i += 1) { const y = pad.top + plotH * i / 4; context.beginPath(); context.moveTo(pad.left, y); context.lineTo(width - pad.right, y); context.stroke(); context.fillText(Math.round(maximum * (1 - i / 4)), pad.left - 6, y + 3); }
    context.fillText('time →', width - pad.right, height - 6);
    keys.forEach((key, seriesIndex) => {
      if (!history.length) return;
      context.beginPath();
      history.forEach((point, index) => { const x = pad.left + (history.length === 1 ? 0 : index / (history.length - 1) * plotW), y = pad.top + plotH - Math.min(1, point[key] / maximum) * plotH; if (index === 0) context.moveTo(x, y); else context.lineTo(x, y); });
      context.strokeStyle = colors[seriesIndex]; context.lineWidth = 2.4; context.stroke();
    });
  }

  function drawGraphs() {
    const rateMax = Math.max(8, ...rateHistory.flatMap(point => [point.forward, point.reverse])) * 1.12;
    drawGraph(ui.rateCanvas, rateCtx, rateHistory, ['forward', 'reverse'], ['#e26b2d', '#2878cf'], rateMax);
    drawGraph(ui.amountCanvas, amountCtx, amountHistory, ['a', 'b'], scenario().colors, TOTAL);
  }

  function frame(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    simulate(dt);
    updateReadouts();
    drawParticles(now);
    drawGraphs();
    requestAnimationFrame(frame);
  }

  document.querySelectorAll('#phenomenonTabs button').forEach(button => button.addEventListener('click', () => switchSystem(button.dataset.system)));
  document.querySelectorAll('#speedButtons button').forEach(button => button.addEventListener('click', () => {
    speed = Number(button.dataset.speed);
    document.querySelectorAll('#speedButtons button').forEach(item => item.classList.toggle('active', item === button));
    ui.speedValue.textContent = button.textContent;
  }));
  document.querySelectorAll('#temperatureButtons button').forEach(button => button.addEventListener('click', () => setTemperature(button.dataset.temperature, elapsed > 0)));
  ui.runButton.addEventListener('click', () => toggleRunning());
  ui.resetButton.addEventListener('click', resetExperiment);
  ui.disturbButton.addEventListener('click', () => {
    const next = temperature === 'warm' ? 'cool' : temperature === 'cool' ? 'warm' : Math.random() < .5 ? 'cool' : 'warm';
    setTemperature(next, true);
  });
  ui.helpButton.addEventListener('click', () => { ui.helpModal.hidden = false; ui.closeHelp.focus(); });
  ui.closeHelp.addEventListener('click', () => { ui.helpModal.hidden = true; ui.helpButton.focus(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !ui.helpModal.hidden) ui.closeHelp.click(); });

  updateScenarioText();
  resetExperiment();
  requestAnimationFrame(frame);
})();
