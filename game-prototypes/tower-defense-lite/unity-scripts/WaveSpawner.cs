using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace TowerDefenseLite
{
    public sealed class WaveSpawner : MonoBehaviour
    {
        [SerializeField] private Transform spawnPoint;
        [SerializeField] private List<WaveDefinition> waves = new List<WaveDefinition>();

        public int CurrentWaveIndex { get; private set; }
        public bool IsSpawning { get; private set; }

        public void StartNextWave()
        {
            if (IsSpawning || CurrentWaveIndex >= waves.Count)
            {
                return;
            }

            StartCoroutine(SpawnWave(waves[CurrentWaveIndex]));
            CurrentWaveIndex += 1;
        }

        private IEnumerator SpawnWave(WaveDefinition wave)
        {
            IsSpawning = true;

            foreach (WaveGroup group in wave.groups)
            {
                for (int index = 0; index < group.count; index += 1)
                {
                    Instantiate(group.enemy.enemyPrefab, spawnPoint.position, Quaternion.identity);
                    yield return new WaitForSeconds(group.spawnInterval);
                }
            }

            IsSpawning = false;
        }
    }
}
