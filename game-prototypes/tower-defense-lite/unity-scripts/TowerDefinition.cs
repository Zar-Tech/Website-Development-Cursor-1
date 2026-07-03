using UnityEngine;

namespace TowerDefenseLite
{
    [CreateAssetMenu(menuName = "Tower Defense Lite/Tower Definition")]
    public sealed class TowerDefinition : ScriptableObject
    {
        [Header("Identity")]
        public string id = "arrow";
        public string displayName = "Arrow Tower";
        public Sprite icon;
        public GameObject towerPrefab;

        [Header("Economy")]
        public int buildCost = 80;
        public int baseUpgradeCost = 70;
        [Range(0f, 1f)] public float sellRefundRate = 0.6f;

        [Header("Combat")]
        public float damage = 20f;
        public float range = 3.5f;
        public float fireInterval = 0.6f;
        public float splashRadius = 0f;
        [Range(0f, 1f)] public float slowFactor = 1f;
        public float slowDuration = 0f;
    }
}
