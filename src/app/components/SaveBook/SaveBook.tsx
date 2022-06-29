import * as _ from "lodash";
import * as React from "react";
import { FC, useState } from "react";
import { Pressable, Text } from "react-native";

interface SaveBookProps {
  bookId: number;
}

const SAVED_BOOK = "♥";
const NOT_SAVED_BOOK = "♡";

export const SaveBook: FC<SaveBookProps> = ({ bookId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const currentIcon = isSaved ? SAVED_BOOK : NOT_SAVED_BOOK;

  return (
    <Pressable onPress={() => setIsSaved(!isSaved)}>
      <Text style={{ fontSize: 34, paddingRight: 5 }}>{currentIcon}</Text>
    </Pressable>
  );
};
