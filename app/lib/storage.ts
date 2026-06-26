import type { Participant, Contribution } from "./types";

export const STORAGE_KEYS = {
  participant: "acuareforma-participant",
  contributions: "acuareforma-contributions",
};

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
}

// Domain-specific storage operations
export function getParticipant(): Participant | null {
  return loadJson<Participant | null>(STORAGE_KEYS.participant, null);
}

export function saveParticipant(participant: Participant): void {
  saveJson(STORAGE_KEYS.participant, participant);
}

export function clearParticipant(): void {
  removeItem(STORAGE_KEYS.participant);
}

export function getContributions(): Contribution[] {
  const contributions = loadJson<Contribution[]>(STORAGE_KEYS.contributions, []);
  // Return sorted by newest first
  return contributions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addContribution(contribution: Contribution): void {
  const contributions = getContributions();
  contributions.push(contribution);
  saveJson(STORAGE_KEYS.contributions, contributions);
}

export function clearContributions(): void {
  removeItem(STORAGE_KEYS.contributions);
}
