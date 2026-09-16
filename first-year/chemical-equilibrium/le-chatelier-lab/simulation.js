(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const BASE = {a: 16, b: 32, c: 16, volume: 1, temperature: 'reference', catalyst: 1, inert: 0};
  const colors = {a: '#2f6fed', b: '#ef8b2c', c: '#8a56d8', inert: '#9aa4b2'};
  const rules = {
    concentration: '<b>Rule:</b> Adding a reactant shifts equilibrium towards products; removing it shifts equilibrium towards reactants.',
    pressure: '<b>Rule:</b> Higher pressure favours the side with fewer gaseous particles. Pressure changes do not shift equilibria with equal gaseous moles.',
    temperature: '<b>Rule:</b> Treat heat as a reactant or product. Heating favours the endothermic direction; cooling favours the exothermic direction.',
    'no-shift': '<b>Rule:</b> A catalyst does not change equilibrium composition. An inert gas at constant volume does not change reacting-gas partial pressures.'
  };
  const ui = Object.fromEntries([
    'particleCanvas','vessel','piston','temperatureBadge','catalystBadge','vesselTitle','equilibriumStatus','reactionArrows','positionMarker','shiftAnnouncement',
    'resetButton','speedSelect','factorRule','stageStress','stageImbalance','stageResponse','stressText','imbalanceText','responseText','forwardBar','reverseBar',
    'forwardRate','reverseRate','rateMessage','volumeReadout','amountA','amountB','amountC','barA','barB','barC','historyCanvas','helpButton','helpModal','closeHelp'
  ].map(id => [id, $(id)]));
  const particleCtx = ui.particleCanvas.getContext('2d');
  const historyCtx = ui.historyCanvas.getContext('2d');

  let factor = 'concentration';
  let state = {...BASE};
  let startState = {...BASE};
  let targetState = {...BASE};
  let direction = 'none';
  let progress = 1;
  let shifting = false;
  let speed = 1;
  let position = 50;
  let startPosition = 50;
  let targetPosition = 50;
  let history = [];
  let historyTimer = 0;
  let lastTime = performance.now();
  let resultDetail = 'Choose a change to disturb the system.';

  function reset() {
    state = {...BASE};
    startState = {...BASE};
    targetState = {...BASE};
    direction = 'none';
    progress = 1;
    shifting = false;
    position = startPosition = targetPosition = 50;
    resultDetail = 'Choose a change to disturb the system.';
    history = Array.from({length: 10}, () => ({a: state.a, b: state.b, c: state.c}));
    setStages('initial', 'No stress applied', 'Forward and reverse rates are equal', 'Composition is constant');
    updateAnnouncement('none', 'Equilibrium has not shifted', resultDetail);
    updateStatus(false);
    updateUI();
  }

  function switchFactor(next) {
    factor = next;
    document.querySelectorAll('#factorTabs button').forEach(button => button.classList.toggle('active', button.dataset.factor === next));
    document.querySelectorAll('.factor-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === next));
    ui.factorRule.innerHTML = rules[next];
    const titles = {concentration: 'Change the concentration', pressure: 'Change pressure and volume', temperature: 'Change the temperature', 'no-shift': 'Test no-shift cases'};
    ui.vesselTitle.textContent = titles[next];
    reset();
  }

  function beginShift(shiftDirection, extent, texts) {
    if (shifting) return;
    direction = shiftDirection;
    startState = {...state};
    let allowed = extent;
    if (direction === 'right') allowed = Math.min(extent, Math.max(0, state.a - 1), Math.max(0, (state.b - 1) / 2));
    if (direction === 'left') allowed = Math.min(extent, Math.max(0, state.c - 1));
    targetState = {...state};
    if (direction === 'right') { targetState.a -= allowed; targetState.b -= 2 * allowed; targetState.c += allowed; }
    if (direction === 'left') { targetState.a += allowed; targetState.b += 2 * allowed; targetState.c -= allowed; }
    progress = 0;
    shifting = direction !== 'none';
    startPosition = position;
    targetPosition = direction === 'right' ? clamp(position + 18, 8, 92) : direction === 'left' ? clamp(position - 18, 8, 92) : position;
    resultDetail = texts.detail;
    setStages('stress', texts.stress, texts.imbalance, texts.response);
    updateAnnouncement(direction, direction === 'right' ? 'Equilibrium shifts towards products' : direction === 'left' ? 'Equilibrium shifts towards reactants' : 'No equilibrium shift', texts.detail);
    updateStatus(shifting);
    pushHistory();
    if (!shifting) {
      setStages('complete', texts.stress, texts.imbalance, texts.response);
      updateStatus(false);
    }
  }

  function applyAction(action) {
    if (shifting) {
      ui.rateMessage.textContent = 'Allow the system to establish its new equilibrium before applying another change.';
      return;
    }
    const actions = {
      'add-a': () => { state.a += 8; beginShift('right', 3, {stress: 'Reactant A added', imbalance: 'Forward rate becomes greater', response: 'A and B are consumed; C increases', detail: 'The system consumes some of the added reactant by favouring the forward reaction.'}); },
      'remove-a': () => { state.a = Math.max(3, state.a - 6); beginShift('left', 2.5, {stress: 'Reactant A removed', imbalance: 'Reverse rate becomes greater', response: 'C decomposes to replace A and B', detail: 'The system replaces some removed reactant by favouring the reverse reaction.'}); },
      'add-b': () => { state.b += 10; beginShift('right', 3, {stress: 'Reactant B added', imbalance: 'Forward rate becomes greater', response: 'A and B are consumed; C increases', detail: 'The system consumes some of the added B by producing more C.'}); },
      'remove-b': () => { state.b = Math.max(5, state.b - 10); beginShift('left', 2.5, {stress: 'Reactant B removed', imbalance: 'Reverse rate becomes greater', response: 'C decomposes to replace B', detail: 'The system opposes removal of B by shifting towards the reactants.'}); },
      'add-c': () => { state.c += 6; beginShift('left', 3, {stress: 'Product C added', imbalance: 'Reverse rate becomes greater', response: 'C is consumed; A and B increase', detail: 'The system consumes some added product by favouring the reverse reaction.'}); },
      'remove-c': () => { state.c = Math.max(3, state.c - 6); beginShift('right', 3, {stress: 'Product C removed', imbalance: 'Forward rate becomes greater', response: 'More C is produced', detail: 'The system replaces some removed product by favouring the forward reaction.'}); },
      compress: () => { state.volume = .64; beginShift('right', 4, {stress: 'Volume decreased; pressure increased', imbalance: 'Crowding favours fewer gas particles', response: 'System shifts to the one-particle side', detail: 'Compression favours the product side because it contains fewer gaseous particles.'}); },
      expand: () => { state.volume = 1.38; beginShift('left', 3.5, {stress: 'Volume increased; pressure decreased', imbalance: 'Expansion favours more gas particles', response: 'System shifts to the three-particle side', detail: 'Expansion favours the reactant side because it contains more gaseous particles.'}); },
      cool: () => { state.temperature = 'cool'; beginShift('right', 3.5, {stress: 'Heat removed from the system', imbalance: 'Exothermic direction is favoured', response: 'More C and heat are produced', detail: 'Cooling favours the exothermic forward reaction to replace some removed heat.'}); },
      heat: () => { state.temperature = 'warm'; beginShift('left', 3.5, {stress: 'Heat added to the system', imbalance: 'Endothermic direction is favoured', response: 'C and heat are consumed', detail: 'Heating favours the endothermic reverse reaction because heat is a product.'}); },
      catalyst: () => { state.catalyst = 2.2; beginShift('none', 0, {stress: 'Catalyst added', imbalance: 'Both rates increase equally', response: 'Equilibrium composition is unchanged', detail: 'A catalyst lowers both activation barriers. It reaches equilibrium faster but does not shift its position.'}); },
      'inert-volume': () => { state.inert += 12; beginShift('none', 0, {stress: 'Inert gas added at constant volume', imbalance: 'Reacting-gas partial pressures unchanged', response: 'No equilibrium shift', detail: 'At constant volume, adding an inert gas changes total pressure but not the partial pressures of A, B or C.'}); },
      'inert-pressure': () => { state.inert += 12; state.volume = 1.35; beginShift('left', 2.5, {stress: 'Inert gas added at constant pressure', imbalance: 'Vessel expands; partial pressures fall', response: 'More gaseous particles are favoured', detail: 'At constant pressure, adding inert gas expands the vessel and favours the side with more gaseous particles.'}); }
    };
    actions[action]?.();
    updateUI();
  }

  function setStages(stage, stress, imbalance, response) {
    ui.stressText.textContent = stress;
    ui.imbalanceText.textContent = imbalance;
    ui.responseText.textContent = response;
    [ui.stageStress, ui.stageImbalance, ui.stageResponse].forEach(item => item.classList.remove('active', 'complete'));
    if (stage === 'initial') ui.stageStress.classList.add('active');
    if (stage === 'stress') ui.stageStress.classList.add('active');
    if (stage === 'imbalance') { ui.stageStress.classList.add('complete'); ui.stageImbalance.classList.add('active'); }
    if (stage === 'response') { ui.stageStress.classList.add('complete'); ui.stageImbalance.classList.add('complete'); ui.stageResponse.classList.add('active'); }
    if (stage === 'complete') [ui.stageStress, ui.stageImbalance, ui.stageResponse].forEach(item => item.classList.add('complete'));
  }

  function updateAnnouncement(shiftDirection, title, detail) {
    ui.shiftAnnouncement.className = `shift-announcement ${shiftDirection === 'none' ? 'neutral' : shiftDirection}`;
    ui.shiftAnnouncement.querySelector(':scope > span').textContent = shiftDirection === 'right' ? '→' : shiftDirection === 'left' ? '←' : '⇌';
    ui.shiftAnnouncement.querySelector('strong').textContent = title;
    ui.shiftAnnouncement.querySelector('p').textContent = detail;
    ui.reactionArrows.className = `equilibrium-arrows ${shiftDirection === 'none' ? '' : shiftDirection}`;
  }

  function updateStatus(isShifting) {
    ui.equilibriumStatus.className = `equilibrium-status ${isShifting ? 'shifting' : 'stable'}`;
    ui.equilibriumStatus.querySelector('span').textContent = isShifting ? 'Responding to stress' : 'At equilibrium';
  }

  function rates() {
    const base = 4 * state.catalyst;
    if (!shifting) return {forward: base, reverse: base};
    const remaining = 1 - progress;
    if (direction === 'right') return {forward: base * (1 + 1.35 * remaining), reverse: base * (.68 + .32 * progress)};
    return {forward: base * (.68 + .32 * progress), reverse: base * (1 + 1.35 * remaining)};
  }

  function updateSimulation(dt) {
    if (!shifting) return;
    progress = Math.min(1, progress + dt * .27 * speed);
    const eased = 1 - Math.pow(1 - progress, 3);
    for (const key of ['a', 'b', 'c']) state[key] = startState[key] + (targetState[key] - startState[key]) * eased;
    position = startPosition + (targetPosition - startPosition) * eased;
    if (progress < .18) setStages('stress', ui.stressText.textContent, ui.imbalanceText.textContent, ui.responseText.textContent);
    else if (progress < .62) setStages('imbalance', ui.stressText.textContent, ui.imbalanceText.textContent, ui.responseText.textContent);
    else setStages('response', ui.stressText.textContent, ui.imbalanceText.textContent, ui.responseText.textContent);
    if (progress >= 1) {
      shifting = false;
      state = {...targetState};
      position = targetPosition;
      setStages('complete', ui.stressText.textContent, ui.imbalanceText.textContent, ui.responseText.textContent);
      updateStatus(false);
      ui.shiftAnnouncement.querySelector('strong').textContent = 'New equilibrium established';
      ui.rateMessage.textContent = 'Forward and reverse rates are equal again at the new equilibrium.';
    }
    historyTimer += dt;
    if (historyTimer > .16) { historyTimer = 0; pushHistory(); }
  }

  function pushHistory() {
    history.push({a: state.a, b: state.b, c: state.c});
    if (history.length > 85) history.shift();
  }

  function updateUI() {
    const currentRates = rates();
    const maxRate = Math.max(10, currentRates.forward, currentRates.reverse);
    ui.forwardRate.textContent = currentRates.forward.toFixed(1);
    ui.reverseRate.textContent = currentRates.reverse.toFixed(1);
    ui.forwardBar.style.width = `${currentRates.forward / maxRate * 100}%`;
    ui.reverseBar.style.width = `${currentRates.reverse / maxRate * 100}%`;
    if (shifting) ui.rateMessage.textContent = direction === 'right' ? 'Forward rate is temporarily greater, producing a net forward reaction.' : 'Reverse rate is temporarily greater, producing a net reverse reaction.';
    else if (state.catalyst > 1) ui.rateMessage.textContent = 'Both rates are faster but remain equal; equilibrium composition is unchanged.';
    else ui.rateMessage.textContent = 'Equal rates maintain dynamic equilibrium.';
    ui.amountA.textContent = state.a.toFixed(1);
    ui.amountB.textContent = state.b.toFixed(1);
    ui.amountC.textContent = state.c.toFixed(1);
    const amountMax = Math.max(40, state.a, state.b, state.c);
    ui.barA.style.width = `${state.a / amountMax * 100}%`;
    ui.barB.style.width = `${state.b / amountMax * 100}%`;
    ui.barC.style.width = `${state.c / amountMax * 100}%`;
    ui.volumeReadout.textContent = `Volume: ${state.volume.toFixed(2)} V`;
    ui.positionMarker.style.left = `${position}%`;
    const pistonTop = state.volume < .8 ? 28 : state.volume > 1.2 ? 8 : 14;
    ui.piston.style.top = `${pistonTop}%`;
    ui.temperatureBadge.style.top = `calc(${pistonTop}% + 25px)`;
    ui.temperatureBadge.className = `temperature-badge ${state.temperature === 'warm' ? 'warm' : state.temperature === 'cool' ? 'cool' : ''}`;
    ui.temperatureBadge.textContent = state.temperature === 'warm' ? 'Warmer system' : state.temperature === 'cool' ? 'Cooler system' : 'Reference temperature';
    ui.catalystBadge.hidden = state.catalyst === 1;
  }

  function fitCanvas(canvas, context) {
    const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr)), height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    return rect;
  }

  function hash(index, salt) {
    const value = Math.sin(index * 83.17 + salt * 47.31) * 43758.5453;
    return value - Math.floor(value);
  }

  function drawParticle(context, x, y, radius, color, label, alpha = 1) {
    const gradient = context.createRadialGradient(x - radius * .35, y - radius * .4, 1, x, y, radius);
    gradient.addColorStop(0, '#fff'); gradient.addColorStop(.25, color); gradient.addColorStop(1, shade(color, .55));
    context.save(); context.globalAlpha = alpha; context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fillStyle = gradient; context.fill(); context.strokeStyle = 'rgba(24,35,52,.45)'; context.stroke();
    if (label) { context.fillStyle = '#fff'; context.font = `bold ${Math.max(8, radius * .88)}px Arial`; context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText(label, x, y + .5); }
    context.restore();
  }

  function shade(hex, factor) {
    const value = parseInt(hex.slice(1), 16);
    return `rgb(${Math.round((value >> 16) * factor)},${Math.round(((value >> 8) & 255) * factor)},${Math.round((value & 255) * factor)})`;
  }

  function drawVessel(now) {
    const rect = fitCanvas(ui.particleCanvas, particleCtx), width = rect.width, height = rect.height;
    particleCtx.clearRect(0, 0, width, height);
    particleCtx.fillStyle = state.temperature === 'warm' ? 'rgba(255,224,211,.38)' : state.temperature === 'cool' ? 'rgba(215,241,255,.48)' : 'rgba(239,247,255,.28)';
    particleCtx.fillRect(0, 0, width, height);
    const topRatio = state.volume < .8 ? .31 : state.volume > 1.2 ? .11 : .17;
    const top = height * topRatio + 12, usableH = height - top - 16;
    const counts = {a: Math.round(state.a), b: Math.round(state.b), c: Math.round(state.c), inert: Math.round(state.inert)};
    let globalIndex = 0;
    for (const species of ['a', 'b', 'c', 'inert']) {
      for (let index = 0; index < counts[species]; index += 1) {
        const x = 18 + hash(globalIndex, 1) * (width - 36) + Math.sin(now * .00075 * state.catalyst + globalIndex) * 4;
        const y = top + hash(globalIndex, 2) * usableH + Math.cos(now * .0009 * state.catalyst + globalIndex) * 4;
        drawParticle(particleCtx, x, y, species === 'inert' ? 6 : 8, colors[species], species === 'inert' ? '' : species.toUpperCase(), species === 'inert' ? .7 : .96);
        globalIndex += 1;
      }
    }
    if (shifting) {
      particleCtx.save(); particleCtx.globalAlpha = .12 + .08 * Math.sin(now / 130); particleCtx.fillStyle = direction === 'right' ? '#23a36d' : '#d65b4c'; particleCtx.fillRect(0, top, width, usableH); particleCtx.restore();
      particleCtx.fillStyle = direction === 'right' ? '#18794e' : '#a83227'; particleCtx.font = 'bold 28px Arial'; particleCtx.textAlign = 'center'; particleCtx.fillText(direction === 'right' ? 'NET REACTION  →' : '←  NET REACTION', width / 2, top + 37);
    }
  }

  function drawHistory() {
    const rect = fitCanvas(ui.historyCanvas, historyCtx), width = rect.width, height = rect.height;
    historyCtx.clearRect(0, 0, width, height);
    const pad = {left: 34, right: 10, top: 10, bottom: 23}, plotW = width - 44, plotH = height - 33;
    const graphMaximum = Math.ceil(Math.max(40, ...history.flatMap(point => [point.a, point.b, point.c])) / 10) * 10;
    historyCtx.strokeStyle = '#e1e6ee'; historyCtx.fillStyle = '#748091'; historyCtx.font = '10px Arial'; historyCtx.textAlign = 'right';
    for (let i = 0; i <= 4; i += 1) { const y = pad.top + plotH * i / 4; historyCtx.beginPath(); historyCtx.moveTo(pad.left, y); historyCtx.lineTo(width - pad.right, y); historyCtx.stroke(); historyCtx.fillText(Math.round(graphMaximum * (1 - i / 4)), pad.left - 5, y + 3); }
    historyCtx.fillText('time →', width - 10, height - 5);
    for (const [key, color] of Object.entries({a: colors.a, b: colors.b, c: colors.c})) {
      historyCtx.beginPath();
      history.forEach((point, index) => { const x = pad.left + (history.length === 1 ? 0 : index / (history.length - 1) * plotW), y = pad.top + plotH - clamp(point[key] / graphMaximum, 0, 1) * plotH; if (index === 0) historyCtx.moveTo(x, y); else historyCtx.lineTo(x, y); });
      historyCtx.strokeStyle = color; historyCtx.lineWidth = 2.3; historyCtx.stroke();
    }
  }

  function frame(now) {
    const dt = Math.min(.06, (now - lastTime) / 1000);
    lastTime = now;
    updateSimulation(dt);
    updateUI();
    drawVessel(now);
    drawHistory();
    requestAnimationFrame(frame);
  }

  document.querySelectorAll('#factorTabs button').forEach(button => button.addEventListener('click', () => switchFactor(button.dataset.factor)));
  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => applyAction(button.dataset.action)));
  ui.resetButton.addEventListener('click', reset);
  ui.speedSelect.addEventListener('change', () => { speed = Number(ui.speedSelect.value); });
  ui.helpButton.addEventListener('click', () => { ui.helpModal.hidden = false; ui.closeHelp.focus(); });
  ui.closeHelp.addEventListener('click', () => { ui.helpModal.hidden = true; ui.helpButton.focus(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !ui.helpModal.hidden) ui.closeHelp.click(); });

  switchFactor('concentration');
  requestAnimationFrame(frame);
})();
