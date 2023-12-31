﻿using HarmonyLib;
using Game.Common;
using ZonePlacementMod.Systems;
using Game;
using ZoningToolkitMod.Systems;

namespace ZoningToolkitMod.Patches {
    [HarmonyPatch(typeof(SystemOrder))]
    public static class SystemOrderPatch {
        [HarmonyPatch("Initialize")]
        [HarmonyPostfix]
        public static void Postfix(UpdateSystem updateSystem) {
            // Add our defined VehicleCounterSystem to the update system which makes it part of
            // the game loop. Make sure it runs at the Phase `PostSimulation`
            updateSystem.UpdateAt<EnableZoneSystem>(SystemUpdatePhase.Modification4B);
            // updateSystem.UpdateAt<ZoningToolkitModSystem>(SystemUpdatePhase.Modification4B);
            updateSystem.UpdateAt<ZonePlacementModUISystem>(SystemUpdatePhase.UIUpdate);
        }
    }
}