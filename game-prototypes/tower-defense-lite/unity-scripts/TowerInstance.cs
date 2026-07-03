using UnityEngine;

namespace TowerDefenseLite
{
    public sealed class TowerInstance : MonoBehaviour
    {
        public TowerDefinition Definition { get; private set; }
        public int Level { get; private set; } = 1;

        public float Damage { get; private set; }
        public float Range { get; private set; }
        public float FireInterval { get; private set; }

        public void Initialize(TowerDefinition definition)
        {
            Definition = definition;
            Damage = definition.damage;
            Range = definition.range;
            FireInterval = definition.fireInterval;
        }

        public int UpgradeCost => Definition.baseUpgradeCost * Level;
        public int SellValue => Mathf.RoundToInt(Definition.buildCost * Definition.sellRefundRate * Level);

        public void Upgrade()
        {
            Level += 1;
            Damage *= 1.35f;
            Range += 0.25f;
            FireInterval = Mathf.Max(0.25f, FireInterval * 0.92f);
        }
    }
}
