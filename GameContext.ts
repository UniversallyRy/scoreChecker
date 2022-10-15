import { createContext } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface ContextInterface {
  navigation: StackNavigationProp<ParamListBase>;
}

export const ScreenNavContext = createContext<ContextInterface | null>(null);
