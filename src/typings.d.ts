import { NavigationProp } from "@react-navigation/native";

type BookId = number;

export type RootStackParamList = {
  "book-explorer": undefined;
  reader: {
    bookId: BookId;
  };
};

export type AppNavigationProps = NavigationProp<
  RootStackParamList,
  never,
  Readonly
>;

type Nullable<T> = T | null | undefined;

export interface Book {
  id: BookId;
  title: string;
  genre?: string;
  coverUrl?: string;
}
