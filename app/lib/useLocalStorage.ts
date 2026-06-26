import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for using localStorage with type safety and SSR compatibility
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window === "undefined") {
        return;
      }

      const item = window.localStorage.getItem(key);
      const value = item ? (JSON.parse(item) as T) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key, initialValue]);

  // Set value to localStorage and state
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Return loading state as well for better UX
  return [storedValue, setValue];
}
