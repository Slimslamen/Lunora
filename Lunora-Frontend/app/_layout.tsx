// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Amplify } from "aws-amplify";
import outputs from "../assets/amplify_outputs.json";
import { ThemeProvider } from "@/Context/Theme/ThemeProvider";
import { UserProvider } from "@/Context/User/UserProvider";
import { WorkoutProvider } from "@/Context/Workout/WorkoutProvider";

Amplify.configure(outputs);

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <UserProvider>
      <WorkoutProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen name="index" />
            {/* <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </WorkoutProvider>
    </UserProvider>
  );
}
