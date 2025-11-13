import { StyleProp, ViewStyle } from "react-native";

export interface CardItem {
  title: string;
  backgroundColor: string;
  titleColor: string;
  countColor: string;
}

export interface CardProps {
  item: CardItem,
  style? : StyleProp<ViewStyle>,
  count : string
}