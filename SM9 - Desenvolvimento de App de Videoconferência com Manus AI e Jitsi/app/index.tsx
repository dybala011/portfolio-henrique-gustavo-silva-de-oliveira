import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useColors } from "@/hooks/use-colors";
import { useUser } from "@/lib/user-context";

export default function IndexScreen() {
  const { username, isLoading } = useUser();
  const colors = useColors();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!username) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
