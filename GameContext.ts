import { createContext } from "react";
import type { StackScreenProps } from "@react-navigation/stack";
import type { ScoreStackParams } from "./components/navigation/Stacks";

type ScoreStackProps = StackScreenProps<ScoreStackParams, 'Extended Game'>;

// Context's value is navigation prop from react-navigation/stack
export type ContextInterface = ScoreStackProps['navigation'];
export const ScreenNavContext = createContext<ContextInterface | null>(null);
