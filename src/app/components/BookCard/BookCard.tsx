import { Cover } from "@components/Cover";
import { TestId } from "@consts";
import { FC, useCallback } from "react";
import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "../Text";
import { useBookMetadata } from "./useBookMetadata";

export interface BookCardProps {
  id: number;
  onPress?: (bookId: BookId) => void;
}

const shadowBox = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.46,
  shadowRadius: 11.14,

  elevation: 17,
};

export const BookCard: FC<BookCardProps> = ({ id, onPress }) => {
  const details = useBookMetadata(id);

  const handlerPress = useCallback(() => {
    onPress?.(id);
  }, [id]);

  if (!details) {
    return null;
  }

  const { title, genre } = details;

  return (
    <TouchableOpacity testID={TestId.BookCard} onPress={handlerPress}>
      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
        <View
          style={{
            ...shadowBox,
            flex: 0.7,
          }}
        >
          <Cover bookId={id} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 24,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 10,
            }}
          >
            {genre}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
