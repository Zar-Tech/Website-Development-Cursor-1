# Tower Defense Lite MVP

## Product goal

Build a portrait-mode mobile tower defense game for iOS and Android with short sessions, clear strategy choices, rewarded ads, and fair in-app purchases.

## Target player

- Casual strategy players who enjoy 3 to 6 minute sessions.
- Players who like progression, heroes, unlockable towers, and optional rewarded ads.
- Mobile-first audience using one-hand portrait controls.

## MVP success criteria

The first prototype is successful when a player can:

1. Start one level from the lobby.
2. Place towers on fixed build nodes.
3. Survive multiple enemy waves.
4. Earn gold from kills and spend it on upgrades.
5. Use one hero skill during combat.
6. Win or lose and see a result screen.
7. Trigger mock rewarded ads and mock IAP buttons so monetization flow can be reviewed before store integration.

## Core loop

1. Select a level.
2. Place or upgrade towers before and during waves.
3. Start the next enemy wave.
4. Use hero skill during pressure moments.
5. Earn gold, stars, and account XP.
6. Upgrade towers or heroes in the lobby.
7. Return for daily missions, ad chests, and season pass rewards.

## MVP content

### Towers

| Tower | Role | Cost | Upgrade focus |
| --- | --- | ---: | --- |
| Arrow Tower | Reliable single-target damage | 80 gold | Fire rate and range |
| Cannon Tower | Area splash damage | 120 gold | Splash radius and damage |
| Frost Tower | Slow support | 100 gold | Slow strength and duration |
| Sky Tower | Anti-air and fast enemies | 110 gold | Target priority and speed |

### Enemies

| Enemy | Role | Behavior |
| --- | --- | --- |
| Grunt | Baseline enemy | Average speed and health |
| Runner | Pressure enemy | Low health, high speed |
| Brute | Tank enemy | High health, slow movement |
| Flyer | Target filter test | Should prefer anti-air towers in Unity version |
| Boss | End-wave threat | Very high health and reward |

### Level 1 wave plan

| Wave | Spawn mix | Design purpose |
| --- | --- | --- |
| 1 | 8 grunts | Teach basic placement |
| 2 | 10 grunts, 3 runners | Teach speed pressure |
| 3 | 8 grunts, 3 brutes | Teach upgrades |
| 4 | 8 runners, 5 grunts, 2 brutes | Teach mixed targeting |
| 5 | 1 boss, 8 grunts | Teach hero skill timing |

## UX screens

### Home

- Top bar: level, coins, gems, energy.
- Main action: Start Battle.
- Secondary buttons: Towers, Heroes, Missions, Shop, Pass.
- Monetization modules: starter pack card and ad chest card.

### Battle

- Top bar: lives, gold, gems, wave, pause.
- Center: path, build nodes, enemies, towers, projectiles.
- Bottom dock: four tower cards, upgrade button, sell button, hero skill.
- Post-wave prompt: next wave, rewarded bonus gold, victory, or defeat.

### Shop and pass

- Remove Ads as a permanent purchase.
- Starter Pack with gems and one hero unlock.
- Gem bundles for premium currency.
- Season Pass with free and premium lanes.
- Ad Chest as a rewarded ad entry point.

## Monetization rules

- Rewarded ads are opt-in and never interrupt active combat.
- Interstitial ads only appear after a completed level and only after multiple sessions.
- Remove Ads disables forced interstitials, not rewarded ad bonuses.
- IAP should focus on convenience, cosmetics, heroes, and bundles.
- Core campaign must remain completable without purchases.

## Technical direction

### Recommended production stack

- Engine: Unity.
- Language: C#.
- Mobile targets: iOS and Android.
- Ads: Google Mobile Ads SDK for AdMob.
- IAP: Unity IAP with Apple App Store and Google Play Billing.
- Analytics: Firebase Analytics, Crashlytics, and Remote Config.

### Prototype in this repo

This repository is currently a static website, so the first playable artifact is a standalone browser prototype in `game-prototypes/tower-defense-lite/`. It validates gameplay feel and UI flow before creating or importing a full Unity project.

## Unity implementation roadmap

1. Create a Unity 2D URP project in portrait orientation.
2. Build core prefabs: enemy, tower, build node, projectile, level path, HUD.
3. Implement data-driven ScriptableObjects for towers, enemies, waves, and levels.
4. Port the browser prototype's battle rules into Unity services:
   - `WaveSpawner`
   - `TowerPlacementController`
   - `TowerCombat`
   - `EnemyPathFollower`
   - `BattleEconomy`
   - `HeroSkillController`
5. Add local save data for stars, upgrades, unlocked heroes, and purchases.
6. Add test AdMob and Unity IAP products behind development flags.
7. Add Firebase analytics events:
   - `level_start`
   - `level_complete`
   - `level_fail`
   - `tower_place`
   - `tower_upgrade`
   - `hero_skill_used`
   - `rewarded_ad_started`
   - `rewarded_ad_completed`
   - `iap_purchase_started`
   - `iap_purchase_completed`
8. Soft launch with remote-configurable prices, rewards, cooldowns, and ad frequency.

## Next production milestone

The next build should be a Unity project with one playable level, four tower prefabs, five waves, one hero skill, basic save data, and mock AdMob/IAP services that can be replaced with store SDKs.
