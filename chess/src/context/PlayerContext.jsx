import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PlayerContext = createContext(null);
const STORAGE_KEY = "checkmate-player-profile";
const DEFAULT_PROFILE = { displayName: "Guest Player", email: "" };

function readSavedProfile() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PROFILE;

    const parsed = JSON.parse(saved);
    return {
      displayName:
        typeof parsed.displayName === "string" && parsed.displayName.trim()
          ? parsed.displayName
          : DEFAULT_PROFILE.displayName,
      email: typeof parsed.email === "string" ? parsed.email : "",
    };
  } catch {
    // Storage may be unavailable or contain invalid JSON. Use safe defaults.
    return DEFAULT_PROFILE;
  }
}

export function PlayerProvider({ children }) {
  const [profile, setProfile] = useState(readSavedProfile);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // The app still works for the current session if storage is blocked.
    }
  }, [profile]);

  function updateProfile(nextProfile) {
    setProfile({
      displayName: nextProfile.displayName.trim(),
      email: nextProfile.email.trim(),
    });
  }

  function resetProfile() {
    setProfile(DEFAULT_PROFILE);
  }

  const value = useMemo(
    () => ({ profile, updateProfile, resetProfile }),
    [profile],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider.");
  }
  return context;
}
