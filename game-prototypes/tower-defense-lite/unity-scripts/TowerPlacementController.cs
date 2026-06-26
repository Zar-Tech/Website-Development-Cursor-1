using UnityEngine;

namespace TowerDefenseLite
{
    public sealed class TowerPlacementController : MonoBehaviour
    {
        [SerializeField] private BattleEconomy economy;
        [SerializeField] private TowerDefinition selectedTower;

        private BuildNode selectedNode;

        public void SelectTower(TowerDefinition definition)
        {
            selectedTower = definition;
        }

        public void SelectNode(BuildNode node)
        {
            selectedNode = node;

            if (!node.IsOccupied && selectedTower != null)
            {
                TryBuildSelectedTower(node);
            }
        }

        public void UpgradeSelectedTower()
        {
            if (selectedNode == null || !selectedNode.IsOccupied)
            {
                return;
            }

            TowerInstance tower = selectedNode.CurrentTower;

            if (!economy.SpendGold(tower.UpgradeCost))
            {
                return;
            }

            tower.Upgrade();
        }

        public void SellSelectedTower()
        {
            if (selectedNode == null || !selectedNode.IsOccupied)
            {
                return;
            }

            TowerInstance tower = selectedNode.CurrentTower;
            economy.AddGold(tower.SellValue);
            selectedNode.ClearTower();
            Destroy(tower.gameObject);
        }

        private void TryBuildSelectedTower(BuildNode node)
        {
            if (!economy.SpendGold(selectedTower.buildCost))
            {
                return;
            }

            GameObject instance = Instantiate(selectedTower.towerPrefab, node.transform.position, Quaternion.identity);
            TowerInstance tower = instance.GetComponent<TowerInstance>();
            tower.Initialize(selectedTower);
            node.SetTower(tower);
        }
    }
}
