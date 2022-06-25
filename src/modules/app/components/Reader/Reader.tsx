import { Page } from "@components/Page";
import { SaveBook } from "@components/SaveBook";
import { useNavigation } from "@react-navigation/native";
import * as _ from "lodash";
import * as React from "react";
import { FC, useLayoutEffect, useState } from "react";
import { FlatList as List, Pressable } from "react-native";

import { usePageCount } from "./usePageCount";

interface ReaderProps {
  bookId: number;
}

interface UseHeaderProps {
  rightIcon: () => JSX.Element;
}

const useHeader = ({ rightIcon }: UseHeaderProps, bookId: BookId) => {
  const [showHeader, setShowHeader] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerShown: showHeader,
      headerTitle: "",
      headerLeft: () => null,
      headerBackTitle: "",
      headerRight: rightIcon,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: showHeader,
    });
  }, [navigation, showHeader]);

  return {
    toggle: () => {
      setShowHeader(!showHeader);
    },
    isVisible: showHeader,
  };
};

export const Reader: FC<ReaderProps> = ({ bookId }) => {
  const pageNumber = usePageCount(bookId);
  const { toggle } = useHeader(
    {
      rightIcon: () => <SaveBook bookId={bookId} />,
    },
    bookId
  );

  return (
    <List
      style={{
        backgroundColor: "white",
      }}
      renderItem={({ item: pageNumber }) => (
        <Pressable onLongPress={() => toggle()}>
          <Page
            key={`${bookId}-${pageNumber}`}
            bookId={bookId}
            pageNumber={pageNumber}
          />
        </Pressable>
      )}
      keyExtractor={(pageNumber) => `${bookId}-${pageNumber}`}
      data={pageNumber}
    />
  );
};
