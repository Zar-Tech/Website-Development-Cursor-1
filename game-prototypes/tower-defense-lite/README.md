# Tower Defense Lite Prototype

This folder contains a mobile-first browser prototype for the Tower Defense Lite MVP. It is not the final production engine; it is a fast validation build for gameplay feel, UI layout, and monetization entry points before moving the design into Unity.

## Run locally

From the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/game-prototypes/tower-defense-lite/
```

## What it demonstrates

- Portrait mobile HUD.
- Four tower cards with different cost, range, and attack behavior.
- Fixed build nodes.
- Wave spawning and enemy path movement.
- Gold economy.
- Tower upgrades and selling.
- Hero skill cooldown.
- Mock rewarded ad chest.
- Mock Remove Ads and starter pack buttons.

## Unity port notes

Use this prototype as the interaction reference for a Unity 2D project. The browser prototype keeps the first system names close to the expected Unity services:

- Wave spawning maps to `WaveSpawner`.
- Build nodes map to `BuildNode` prefabs.
- Tower cards map to tower ScriptableObjects.
- Enemy movement maps to `EnemyPathFollower`.
- Battle state maps to `BattleController`.
- Rewarded ad and IAP buttons map to mocked service interfaces before production SDK integration.
