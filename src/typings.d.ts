import { NavigationProp } from "@react-navigation/native";

type BookId = number;

export type RootStackParamList = {
  Home: undefined;
  Reader: {
    bookId: BookId;
  };
};

export type AppNavigationProps = NavigationProp<
  RootStackParamList,
  never,
  Readonly
>;

export interface Book {
  id: BookId;
  title: string;
  genre: string;
  coverUrl?: string;
}
