import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@typings";

export const { Screen, Navigator } =
  createNativeStackNavigator<RootStackParamList>();
