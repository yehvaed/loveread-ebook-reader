import { NavigationProp } from "@react-navigation/native";

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
