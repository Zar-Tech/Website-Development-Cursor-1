const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const hud = {
  lives: document.querySelector("#lives"),
  gold: document.querySelector("#gold"),
  gems: document.querySelector("#gems"),
  wave: document.querySelector("#wave"),
  toast: document.querySelector("#toast"),
  log: document.querySelector("#eventLog"),
  heroCooldown: document.querySelector("#heroCooldown"),
  startWave: document.querySelector("#startWaveButton"),
  upgrade: document.querySelector("#upgradeButton"),
  sell: document.querySelector("#sellButton"),
  hero: document.querySelector("#heroSkillButton"),
  adChest: document.querySelector("#adChestButton"),
  starterPack: document.querySelector("#starterPackButton"),
  removeAds: document.querySelector("#removeAdsButton"),
};

const towerCards = [...document.querySelectorAll(".tower-card")];

const path = [
  { x: -20, y: 86 },
  { x: 94, y: 86 },
  { x: 94, y: 184 },
  { x: 246, y: 184 },
  { x: 246, y: 306 },
  { x: 116, y: 306 },
  { x: 116, y: 424 },
  { x: 420, y: 424 },
];

const nodes = [
  { x: 154, y: 96 },
  { x: 292, y: 112 },
  { x: 166, y: 214 },
  { x: 316, y: 258 },
  { x: 64, y: 304 },
  { x: 204, y: 372 },
  { x: 304, y: 372 },
];

const towerTypes = {
  arrow: {
    name: "Arrow",
    cost: 80,
    damage: 20,
    range: 96,
    fireRate: 0.62,
    color: "#ffd166",
    projectile: "#fff1a8",
  },
  cannon: {
    name: "Cannon",
    cost: 120,
    damage: 34,
    range: 82,
    fireRate: 1.05,
    splash: 38,
    color: "#ff8a5c",
    projectile: "#ffc1a6",
  },
  frost: {
    name: "Frost",
    cost: 100,
    damage: 8,
    range: 88,
    fireRate: 0.82,
    slow: 0.48,
    color: "#68d8ff",
    projectile: "#c9f3ff",
  },
  sky: {
    name: "Sky",
    cost: 110,
    damage: 18,
    range: 116,
    fireRate: 0.45,
    color: "#b7ff7a",
    projectile: "#e3ffc8",
  },
};

const waves = [
  [{ type: "grunt", count: 8 }],
  [
    { type: "grunt", count: 10 },
    { type: "runner", count: 3 },
  ],
  [
    { type: "grunt", count: 8 },
    { type: "brute", count: 3 },
  ],
  [
    { type: "runner", count: 8 },
    { type: "grunt", count: 5 },
    { type: "brute", count: 2 },
  ],
  [
    { type: "boss", count: 1 },
    { type: "grunt", count: 8 },
  ],
];

const enemyTypes = {
  grunt: { hp: 64, speed: 38, reward: 12, color: "#ffcc66", radius: 11 },
  runner: { hp: 42, speed: 64, reward: 10, color: "#ff6b7a", radius: 9 },
  brute: { hp: 150, speed: 25, reward: 24, color: "#b58cff", radius: 14 },
  boss: { hp: 420, speed: 22, reward: 120, color: "#ff477e", radius: 19 },
};

const state = {
  lives: 20,
  gold: 260,
  gems: 25,
  waveIndex: 0,
  selectedTower: "arrow",
  selectedNode: null,
  towers: [],
  enemies: [],
  projectiles: [],
  spawnQueue: [],
  spawnTimer: 0,
  waveClearTimer: 0,
  waveActive: false,
  heroCooldown: 0,
  paused: false,
  won: false,
  lost: false,
  lastTime: performance.now(),
};

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  hud.log.prepend(item);

  while (hud.log.children.length > 8) {
    hud.log.lastElementChild.remove();
  }
}

function showToast(message) {
  hud.toast.textContent = message;
}

function updateHud() {
  hud.lives.textContent = state.lives;
  hud.gold.textContent = state.gold;
  hud.gems.textContent = state.gems;
  hud.wave.textContent = `${state.waveIndex}/${waves.length}`;
  hud.heroCooldown.textContent = state.heroCooldown > 0 ? `${Math.ceil(state.heroCooldown)}s` : "Ready";
  hud.startWave.disabled = state.waveActive || state.won || state.lost;
  hud.upgrade.disabled = !getSelectedTower();
  hud.sell.disabled = !getSelectedTower();
  hud.hero.disabled = state.heroCooldown > 0 || state.enemies.length === 0 || state.lost || state.won;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getSelectedTower() {
  return state.towers.find((tower) => tower.nodeIndex === state.selectedNode);
}

function createSpawnQueue(wave) {
  const queue = [];

  wave.forEach((group) => {
    for (let i = 0; i < group.count; i += 1) {
      queue.push({ type: group.type, delay: queue.length === 0 ? 0.1 : 0.7 });
    }
  });

  return queue;
}

function startWave() {
  if (state.waveActive || state.waveIndex >= waves.length) {
    return;
  }

  state.spawnQueue = createSpawnQueue(waves[state.waveIndex]);
  state.spawnTimer = 0;
  state.waveClearTimer = 0;
  state.waveActive = true;
  state.waveIndex += 1;
  addLog(`Wave ${state.waveIndex} started.`);
  showToast("Enemies incoming. Upgrade towers between shots.");
  updateHud();
}

function spawnEnemy(type) {
  const config = enemyTypes[type];
  state.enemies.push({
    ...config,
    type,
    x: path[0].x,
    y: path[0].y,
    hp: config.hp + state.waveIndex * 10,
    maxHp: config.hp + state.waveIndex * 10,
    pathIndex: 1,
    slowTimer: 0,
    slowFactor: 1,
  });
}

function placeOrSelectNode(nodeIndex) {
  const existingTower = state.towers.find((tower) => tower.nodeIndex === nodeIndex);
  state.selectedNode = nodeIndex;

  if (existingTower) {
    showToast(`${existingTower.name} selected. Upgrade or sell it.`);
    updateHud();
    return;
  }

  const type = towerTypes[state.selectedTower];

  if (state.gold < type.cost) {
    showToast(`Need ${type.cost} gold for ${type.name}.`);
    updateHud();
    return;
  }

  const node = nodes[nodeIndex];
  state.gold -= type.cost;
  state.towers.push({
    ...type,
    nodeIndex,
    x: node.x,
    y: node.y,
    level: 1,
    cooldown: 0,
  });
  addLog(`${type.name} Tower placed for ${type.cost}g.`);
  showToast(`${type.name} Tower ready.`);
  updateHud();
}

function upgradeTower() {
  const tower = getSelectedTower();

  if (!tower) {
    showToast("Select a placed tower first.");
    return;
  }

  const cost = 70 * tower.level;

  if (state.gold < cost) {
    showToast(`Need ${cost} gold to upgrade ${tower.name}.`);
    return;
  }

  state.gold -= cost;
  tower.level += 1;
  tower.damage = Math.round(tower.damage * 1.35);
  tower.range += 8;
  tower.fireRate = Math.max(0.25, tower.fireRate * 0.92);
  addLog(`${tower.name} upgraded to level ${tower.level}.`);
  showToast(`${tower.name} level ${tower.level}.`);
  updateHud();
}

function sellTower() {
  const tower = getSelectedTower();

  if (!tower) {
    showToast("Select a placed tower first.");
    return;
  }

  const refund = Math.round(tower.cost * 0.6 * tower.level);
  state.gold += refund;
  state.towers = state.towers.filter((candidate) => candidate !== tower);
  addLog(`${tower.name} sold for ${refund}g.`);
  showToast("Tower sold.");
  state.selectedNode = null;
  updateHud();
}

function useHeroSkill() {
  if (state.heroCooldown > 0 || state.enemies.length === 0) {
    return;
  }

  state.enemies.forEach((enemy) => {
    enemy.hp -= 95;
  });
  state.heroCooldown = 18;
  addLog("Hero meteor hit all enemies.");
  showToast("Hero skill launched.");
  updateHud();
}

function grantAdChest() {
  if (state.lost || state.won) {
    showToast("Start a new prototype run to claim more rewards.");
    return;
  }

  state.gold += 75;
  addLog("Rewarded ad chest granted +75g.");
  showToast("Mock AdMob reward granted: +75 gold.");
  updateHud();
}

function grantStarterPack() {
  state.gems += 80;
  state.gold += 180;
  addLog("Mock starter pack granted +80 gems and +180g.");
  showToast("Mock IAP complete: starter pack added.");
  updateHud();
}

function removeAds() {
  addLog("Mock Remove Ads purchase completed.");
  showToast("Mock IAP complete: forced ads removed.");
}

function updateSpawning(delta) {
  if (!state.waveActive || state.spawnQueue.length === 0) {
    return;
  }

  state.spawnTimer -= delta;

  if (state.spawnTimer <= 0) {
    const next = state.spawnQueue.shift();
    spawnEnemy(next.type);
    state.spawnTimer = next.delay;
  }
}

function updateEnemies(delta) {
  state.enemies.forEach((enemy) => {
    if (enemy.slowTimer > 0) {
      enemy.slowTimer -= delta;
    } else {
      enemy.slowFactor = 1;
    }

    const target = path[enemy.pathIndex];
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const distanceToTarget = Math.hypot(dx, dy);
    const step = enemy.speed * enemy.slowFactor * delta;

    if (distanceToTarget <= step) {
      enemy.x = target.x;
      enemy.y = target.y;
      enemy.pathIndex += 1;

      if (enemy.pathIndex >= path.length) {
        enemy.reachedGoal = true;
        state.lives -= enemy.type === "boss" ? 4 : 1;
      }
    } else {
      enemy.x += (dx / distanceToTarget) * step;
      enemy.y += (dy / distanceToTarget) * step;
    }
  });

  const defeated = state.enemies.filter((enemy) => enemy.hp <= 0);
  defeated.forEach((enemy) => {
    state.gold += enemy.reward;
  });

  if (defeated.length > 0) {
    addLog(`${defeated.length} enemy defeated. +${defeated.reduce((sum, enemy) => sum + enemy.reward, 0)}g.`);
  }

  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0 && !enemy.reachedGoal);
}

function updateTowers(delta) {
  state.towers.forEach((tower) => {
    tower.cooldown -= delta;

    if (tower.cooldown > 0) {
      return;
    }

    const target = state.enemies
      .filter((enemy) => distance(tower, enemy) <= tower.range)
      .sort((a, b) => b.pathIndex - a.pathIndex || a.hp - b.hp)[0];

    if (!target) {
      return;
    }

    target.hp -= tower.damage;

    if (tower.splash) {
      state.enemies.forEach((enemy) => {
        if (enemy !== target && distance(enemy, target) <= tower.splash) {
          enemy.hp -= Math.round(tower.damage * 0.45);
        }
      });
    }

    if (tower.slow) {
      target.slowFactor = tower.slow;
      target.slowTimer = 1.25;
    }

    state.projectiles.push({
      x: tower.x,
      y: tower.y,
      tx: target.x,
      ty: target.y,
      life: 0.18,
      maxLife: 0.18,
      color: tower.projectile,
    });

    tower.cooldown = tower.fireRate;
  });
}

function updateProjectiles(delta) {
  state.projectiles.forEach((projectile) => {
    projectile.life -= delta;
  });
  state.projectiles = state.projectiles.filter((projectile) => projectile.life > 0);
}

function updateBattleState(delta) {
  if (state.lives <= 0 && !state.lost) {
    state.lost = true;
    state.waveActive = false;
    showToast("Defeat. In Unity this opens the retry screen.");
    addLog("Level failed.");
  }

  if (state.waveActive && state.spawnQueue.length === 0 && state.enemies.length === 0) {
    state.waveClearTimer += delta;

    if (state.waveClearTimer < 0.4) {
      return;
    }

    state.waveActive = false;
    state.waveClearTimer = 0;

    if (state.waveIndex >= waves.length) {
      state.won = true;
      state.gems += 5;
      showToast("Victory! +5 gems earned.");
      addLog("Level complete. Victory reward granted.");
    } else {
      state.gold += 45;
      showToast("Wave cleared. +45 bonus gold.");
      addLog(`Wave ${state.waveIndex} cleared.`);
    }
  } else {
    state.waveClearTimer = 0;
  }
}

function keepWaveStatusFresh() {
  const staleClearMessage = hud.toast.textContent.startsWith("Wave cleared");

  if (state.waveActive && state.enemies.length > 0 && staleClearMessage) {
    showToast(`Wave ${state.waveIndex} active. Defend the path.`);
  }
}

function update(delta) {
  if (state.paused) {
    return;
  }

  updateSpawning(delta);
  updateTowers(delta);
  updateEnemies(delta);
  updateProjectiles(delta);
  state.heroCooldown = Math.max(0, state.heroCooldown - delta);
  updateBattleState(delta);
  keepWaveStatusFresh();
  updateHud();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#17345d");
  gradient.addColorStop(1, "#0b1a34");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(126, 242, 157, 0.08)";
  for (let i = 0; i < 16; i += 1) {
    ctx.beginPath();
    ctx.arc((i * 67) % 420, 40 + ((i * 101) % 460), 38, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPath() {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 44;
  ctx.strokeStyle = "#7a5337";
  ctx.beginPath();
  path.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();

  ctx.lineWidth = 28;
  ctx.strokeStyle = "#c58b52";
  ctx.stroke();
}

function drawNodes() {
  nodes.forEach((node, index) => {
    const occupied = state.towers.some((tower) => tower.nodeIndex === index);
    const selected = state.selectedNode === index;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
    ctx.fillStyle = occupied ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)";
    ctx.fill();
    ctx.lineWidth = selected ? 4 : 2;
    ctx.strokeStyle = selected ? "#ffd166" : "rgba(255,255,255,0.36)";
    ctx.stroke();
  });
}

function drawTowers() {
  state.towers.forEach((tower) => {
    if (state.selectedNode === tower.nodeIndex) {
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 209, 102, 0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 209, 102, 0.28)";
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = tower.color;
    ctx.fill();
    ctx.strokeStyle = "#081224";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#07101f";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(tower.name.charAt(0), tower.x, tower.y + 5);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(`L${tower.level}`, tower.x, tower.y + 34);
  });
}

function drawEnemies() {
  state.enemies.forEach((enemy) => {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fillStyle = enemy.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = enemy.slowFactor < 1 ? "#68d8ff" : "#07101f";
    ctx.stroke();

    const barWidth = enemy.radius * 2.4;
    const hpPercent = Math.max(0, enemy.hp / enemy.maxHp);
    ctx.fillStyle = "rgba(0,0,0,0.52)";
    ctx.fillRect(enemy.x - barWidth / 2, enemy.y - enemy.radius - 12, barWidth, 5);
    ctx.fillStyle = hpPercent > 0.45 ? "#7ef29d" : "#ff6b7a";
    ctx.fillRect(enemy.x - barWidth / 2, enemy.y - enemy.radius - 12, barWidth * hpPercent, 5);
  });
}

function drawProjectiles() {
  state.projectiles.forEach((projectile) => {
    const progress = 1 - projectile.life / projectile.maxLife;
    const x = projectile.x + (projectile.tx - projectile.x) * progress;
    const y = projectile.y + (projectile.ty - projectile.y) * progress;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = projectile.color;
    ctx.fill();
  });
}

function draw() {
  drawBackground();
  drawPath();
  drawNodes();
  drawTowers();
  drawEnemies();
  drawProjectiles();

  if (state.paused) {
    ctx.fillStyle = "rgba(5, 10, 22, 0.68)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
  }
}

function tick(now) {
  const delta = Math.min(0.05, (now - state.lastTime) / 1000);
  state.lastTime = now;

  update(delta);
  draw();
  requestAnimationFrame(tick);
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const source = event.touches ? event.touches[0] : event;

  return {
    x: ((source.clientX - rect.left) / rect.width) * canvas.width,
    y: ((source.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function handleCanvasTap(event) {
  event.preventDefault();
  const point = canvasPoint(event);
  const nodeIndex = nodes.findIndex((node) => distance(point, node) < 34);

  if (nodeIndex >= 0) {
    placeOrSelectNode(nodeIndex);
  } else {
    state.selectedNode = null;
    showToast("Pick a tower, then tap a build node.");
    updateHud();
  }
}

towerCards.forEach((card) => {
  card.addEventListener("click", () => {
    state.selectedTower = card.dataset.tower;
    towerCards.forEach((candidate) => candidate.classList.toggle("active", candidate === card));
    showToast(`${towerTypes[state.selectedTower].name} selected. Tap a build node.`);
  });
});

canvas.addEventListener("click", handleCanvasTap);
canvas.addEventListener("touchstart", handleCanvasTap, { passive: false });
hud.startWave.addEventListener("click", startWave);
hud.upgrade.addEventListener("click", upgradeTower);
hud.sell.addEventListener("click", sellTower);
hud.hero.addEventListener("click", useHeroSkill);
hud.adChest.addEventListener("click", grantAdChest);
hud.starterPack.addEventListener("click", grantStarterPack);
hud.removeAds.addEventListener("click", removeAds);
document.querySelector("#pauseButton").addEventListener("click", () => {
  state.paused = !state.paused;
  showToast(state.paused ? "Battle paused." : "Battle resumed.");
});

updateHud();
window.tdLiteDebug = {
  snapshot() {
    return {
      lives: state.lives,
      gold: state.gold,
      gems: state.gems,
      waveIndex: state.waveIndex,
      waveActive: state.waveActive,
      spawnQueueLength: state.spawnQueue.length,
      enemyCount: state.enemies.length,
      towerCount: state.towers.length,
      toast: hud.toast.textContent,
      log: [...hud.log.querySelectorAll("li")].map((item) => item.textContent),
    };
  },
};
requestAnimationFrame(tick);
