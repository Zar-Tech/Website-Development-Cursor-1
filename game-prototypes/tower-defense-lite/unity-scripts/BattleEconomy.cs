using System;
using UnityEngine;

namespace TowerDefenseLite
{
    public sealed class BattleEconomy : MonoBehaviour
    {
        [SerializeField] private int startingGold = 260;
        [SerializeField] private int startingLives = 20;

        public int Gold { get; private set; }
        public int Lives { get; private set; }

        public event Action EconomyChanged;
        public event Action Defeated;

        private void Awake()
        {
            Gold = startingGold;
            Lives = startingLives;
            EconomyChanged?.Invoke();
        }

        public bool SpendGold(int amount)
        {
            if (Gold < amount)
            {
                return false;
            }

            Gold -= amount;
            EconomyChanged?.Invoke();
            return true;
        }

        public void AddGold(int amount)
        {
            Gold += amount;
            EconomyChanged?.Invoke();
        }

        public void DamageLives(int amount)
        {
            Lives = Mathf.Max(0, Lives - amount);
            EconomyChanged?.Invoke();

            if (Lives == 0)
            {
                Defeated?.Invoke();
            }
        }
    }
}
