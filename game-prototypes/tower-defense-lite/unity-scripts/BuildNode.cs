using UnityEngine;

namespace TowerDefenseLite
{
    public sealed class BuildNode : MonoBehaviour
    {
        public TowerInstance CurrentTower { get; private set; }
        public bool IsOccupied => CurrentTower != null;

        public void SetTower(TowerInstance tower)
        {
            CurrentTower = tower;
        }

        public void ClearTower()
        {
            CurrentTower = null;
        }
    }
}
