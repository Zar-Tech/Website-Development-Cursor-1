import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromePath = process.env.CHROME_BIN || "/usr/local/bin/google-chrome";
const url = process.argv[2] || "http://127.0.0.1:8080/game-prototypes/tower-defense-lite/";
const port = 9333 + Math.floor(Math.random() * 400);
const profileDir = await mkdtemp(join(tmpdir(), "tdlite-chrome-"));

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();

    socket.addEventListener("message", (event) => {
      const payload = JSON.parse(event.data);

      if (!payload.id) {
        return;
      }

      const callbacks = this.pending.get(payload.id);
      this.pending.delete(payload.id);

      if (payload.error) {
        callbacks.reject(new Error(payload.error.message));
      } else {
        callbacks.resolve(payload.result);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;

    this.socket.send(JSON.stringify({ id, method, params }));

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed: ${endpoint} ${response.status}`);
  }

  return response.json();
}

async function waitForChrome() {
  const endpoint = `http://127.0.0.1:${port}/json/version`;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      return await fetchJson(endpoint);
    } catch {
      await sleep(100);
    }
  }

  throw new Error("Timed out waiting for Chrome DevTools endpoint.");
}

async function waitForPageTarget() {
  await waitForChrome();

  const endpoint = `http://127.0.0.1:${port}/json/list`;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const targets = await fetchJson(endpoint);
    const page = targets.find((target) => target.type === "page");

    if (page) {
      return page;
    }

    await sleep(100);
  }

  throw new Error("Timed out waiting for Chrome page target.");
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }

  return result.result.value;
}

async function waitFor(client, description, predicate, timeoutMs = 10000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const snapshot = await evaluate(client, "window.tdLiteDebug ? window.tdLiteDebug.snapshot() : null");

    if (predicate(snapshot)) {
      return snapshot;
    }

    await sleep(100);
  }

  throw new Error(`Timed out waiting for ${description}.`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function stopChrome(chromeProcess) {
  if (chromeProcess.exitCode !== null) {
    return;
  }

  chromeProcess.kill();

  await Promise.race([
    new Promise((resolve) => {
      chromeProcess.once("exit", resolve);
    }),
    sleep(2000),
  ]);
}

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "about:blank",
], {
  stdio: "ignore",
});

try {
  const pageTarget = await waitForPageTarget();
  const socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const client = new CdpClient(socket);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Page.navigate", { url });
  await waitFor(client, "prototype debug API", (snapshot) => Boolean(snapshot));

  const labels = await evaluate(client, "[...document.querySelectorAll('.tower-card small')].map((item) => item.textContent.trim())");
  assert(labels.includes("80 gold"), "Arrow cost label missing.");
  assert(labels.includes("120 gold"), "Cannon cost label missing.");
  assert(labels.includes("100 gold"), "Frost cost label missing.");

  await evaluate(client, `
    document.querySelector('[data-tower="arrow"]').click();
    window.__tapNode = (nodeIndex) => {
      const canvas = document.querySelector('#gameCanvas');
      const rect = canvas.getBoundingClientRect();
      const nodes = [
        { x: 154, y: 96 },
        { x: 292, y: 112 },
        { x: 166, y: 214 },
        { x: 316, y: 258 },
        { x: 64, y: 304 },
        { x: 204, y: 372 },
        { x: 304, y: 372 },
      ];
      const node = nodes[nodeIndex];
      canvas.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + (node.x / canvas.width) * rect.width,
        clientY: rect.top + (node.y / canvas.height) * rect.height,
      }));
    };
    window.__tapNode(0);
    document.querySelector('[data-tower="cannon"]').click();
    window.__tapNode(2);
  `);

  let snapshot = await evaluate(client, "window.tdLiteDebug.snapshot()");
  assert(snapshot.gold === 60, `Expected 60 gold after Arrow and Cannon, got ${snapshot.gold}.`);
  assert(snapshot.towerCount === 2, `Expected 2 towers, got ${snapshot.towerCount}.`);

  await evaluate(client, `
    document.querySelector('[data-tower="frost"]').click();
    window.__tapNode(4);
  `);
  snapshot = await evaluate(client, "window.tdLiteDebug.snapshot()");
  assert(snapshot.gold === 60, "Frost should not place before enough gold.");
  assert(snapshot.toast.includes("Need 100 gold"), "Expected insufficient-gold toast for Frost.");

  await evaluate(client, `
    document.querySelector('#adChestButton').click();
    window.__tapNode(4);
  `);
  snapshot = await evaluate(client, "window.tdLiteDebug.snapshot()");
  assert(snapshot.gold === 35, `Expected 35 gold after Ad Chest and Frost, got ${snapshot.gold}.`);
  assert(snapshot.towerCount === 3, `Expected 3 towers, got ${snapshot.towerCount}.`);

  await evaluate(client, "document.querySelector('#startWaveButton').click()");
  await waitFor(client, "Wave 1 enemies", (state) => state.waveActive && state.enemyCount > 0);
  await evaluate(client, "document.querySelector('#heroSkillButton').click()");
  await waitFor(client, "Wave 1 clear", (state) => !state.waveActive && state.waveIndex === 1, 15000);

  await evaluate(client, `
    document.querySelector('#starterPackButton').click();
    window.__tapNode(0);
    document.querySelector('#upgradeButton').click();
    document.querySelector('#startWaveButton').click();
  `);
  snapshot = await waitFor(client, "Wave 2 active enemies", (state) => state.waveActive && state.enemyCount > 0);
  await sleep(1000);
  snapshot = await evaluate(client, "window.tdLiteDebug.snapshot()");

  assert(snapshot.waveActive, "Wave 2 should still be active during the active-wave assertion.");
  assert(snapshot.enemyCount > 0, "Wave 2 should have active enemies during the active-wave assertion.");
  assert(!snapshot.toast.includes("Wave cleared"), `Wave 2 active toast should not be stale: ${snapshot.toast}`);

  console.log("Tower Defense Lite browser smoke test passed.");
  console.log(JSON.stringify(snapshot, null, 2));
  socket.close();
} finally {
  await stopChrome(chrome);
  await rm(profileDir, { recursive: true, force: true });
}
