using UnityEngine;

namespace TowerDefenseLite
{
    [CreateAssetMenu(menuName = "Tower Defense Lite/Enemy Definition")]
    public sealed class EnemyDefinition : ScriptableObject
    {
        public string id = "grunt";
        public string displayName = "Grunt";
        public GameObject enemyPrefab;
        public float health = 64f;
        public float speed = 1.8f;
        public int goldReward = 12;
        public int lifeDamage = 1;
    }
}
