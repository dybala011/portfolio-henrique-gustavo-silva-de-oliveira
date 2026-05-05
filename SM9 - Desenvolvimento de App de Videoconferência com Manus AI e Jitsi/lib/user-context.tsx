import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const USER_STORAGE_KEY = "@techconnect:username";

interface UserContextType {
  username: string | null;
  setUsername: (name: string) => Promise<void>;
  clearUsername: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: async () => {},
  clearUsername: async () => {},
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE_KEY)
      .then((name) => {
        if (name) setUsernameState(name);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const setUsername = useCallback(async (name: string) => {
    await AsyncStorage.setItem(USER_STORAGE_KEY, name);
    setUsernameState(name);
  }, []);

  const clearUsername = useCallback(async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUsernameState(null);
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, clearUsername, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
