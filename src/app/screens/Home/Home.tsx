import { BooksList } from "@components/BooksList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@typings";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const goToSelectedBook = useCallback(
    (id) => {
      navigation.navigate("Reader", {
        bookId: id,
      });
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <BooksList onBookPressed={goToSelectedBook} />
    </SafeAreaView>
  );
};
