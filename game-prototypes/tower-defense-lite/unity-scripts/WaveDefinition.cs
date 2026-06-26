using System;
using System.Collections.Generic;
using UnityEngine;

namespace TowerDefenseLite
{
    [CreateAssetMenu(menuName = "Tower Defense Lite/Wave Definition")]
    public sealed class WaveDefinition : ScriptableObject
    {
        public List<WaveGroup> groups = new List<WaveGroup>();
    }

    [Serializable]
    public sealed class WaveGroup
    {
        public EnemyDefinition enemy;
        public int count = 8;
        public float spawnInterval = 0.7f;
    }
}
