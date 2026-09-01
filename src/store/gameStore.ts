import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACHIEVEMENTS, PROJECTS, type WorldId } from "../data/content";

const XP_PER_WORLD = 150;
const XP_PER_MISSION = 75;
const XP_PER_LEVEL = 200;

interface AchievementToastData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface GameState {
  introComplete: boolean;
  activeWorld: WorldId | "home" | "contact";
  exploredWorlds: WorldId[];
  missionsRead: string[];
  unlockedAchievements: string[];
  xp: number;
  toastQueue: AchievementToastData[];
  activeProjectId: string | null;
  activeBehanceId: string | null;

  completeIntro: () => void;
  replayIntro: () => void;
  setActiveWorld: (id: WorldId | "home" | "contact") => void;
  exploreWorld: (id: WorldId) => void;
  completeMission: (projectId: string) => void;
  dismissToast: () => void;
  unlockAchievement: (id: keyof typeof ACHIEVEMENTS) => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  openBehanceProject: (id: string) => void;
  closeBehanceProject: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      introComplete: false,
      activeWorld: "home",
      exploredWorlds: [],
      missionsRead: [],
      unlockedAchievements: [],
      xp: 0,
      toastQueue: [],
      activeProjectId: null,
      activeBehanceId: null,

      openProject: (id) => set({ activeProjectId: id }),
      closeProject: () => set({ activeProjectId: null }),
      openBehanceProject: (id) => set({ activeBehanceId: id }),
      closeBehanceProject: () => set({ activeBehanceId: null }),

      completeIntro: () => {
        set({ introComplete: true });
        get().unlockAchievement("spawn");
      },

      replayIntro: () => set({ introComplete: false, activeWorld: "home", activeProjectId: null }),

      setActiveWorld: (id) => set({ activeWorld: id }),

      exploreWorld: (id) => {
        const { exploredWorlds } = get();
        if (exploredWorlds.includes(id)) return;
        set({ exploredWorlds: [...exploredWorlds, id], xp: get().xp + XP_PER_WORLD });
        get().unlockAchievement(id);
      },

      completeMission: (projectId) => {
        const { missionsRead } = get();
        if (missionsRead.includes(projectId)) return;
        const nextMissionsRead = [...missionsRead, projectId];
        set({ missionsRead: nextMissionsRead, xp: get().xp + XP_PER_MISSION });
        get().unlockAchievement("mission");

        if (nextMissionsRead.length === PROJECTS.length) {
          get().unlockAchievement("explorer");
        }
      },

      unlockAchievement: (id) => {
        const { unlockedAchievements } = get();
        if (unlockedAchievements.includes(id)) return;
        const def = ACHIEVEMENTS[id];
        if (!def) return;
        set({
          unlockedAchievements: [...unlockedAchievements, id],
          toastQueue: [...get().toastQueue, def],
        });
      },

      dismissToast: () => {
        set({ toastQueue: get().toastQueue.slice(1) });
      },
    }),
    {
      name: "portfolio-game-state",
      version: 1,
      migrate: (persistedState) => {
        const migratedState = { ...(persistedState as Partial<GameState>) };
        delete migratedState.introComplete;
        return migratedState as GameState;
      },
      partialize: (state) => ({
        exploredWorlds: state.exploredWorlds,
        missionsRead: state.missionsRead,
        unlockedAchievements: state.unlockedAchievements,
        xp: state.xp,
      }),
    },
  ),
);

export function levelFromXp(xp: number): { level: number; progress: number; xpIntoLevel: number } {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const progress = xpIntoLevel / XP_PER_LEVEL;
  return { level, progress, xpIntoLevel };
}

export { XP_PER_LEVEL };
