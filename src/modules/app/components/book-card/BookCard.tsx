import { Text } from "@components/Text";
import { TestId } from "@shared/tests";
import { BookId } from "@typings";
import { FC, useCallback } from "react";
import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";

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

  const { title, genre, coverUrl } = details;

  return (
    <TouchableOpacity testID={TestId.BookCard} onPress={handlerPress}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            ...shadowBox,
            flex: 0.8,
          }}
        >
          <Image
            style={{
              height: 200,
              margin: 10,
              borderRadius: 5,
            }}
            source={{ uri: coverUrl }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {title}
          </Text>
          <Text>{genre}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
