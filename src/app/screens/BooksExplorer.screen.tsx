import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "@typings";
import * as _ from "lodash";
import * as React from "react";
import { FC, useCallback } from "react";

import { BooksExplorer } from "../components/BooksExplorer";

export const BooksExplorerScreen: FC = () => {
  const { navigate } = useNavigation<AppNavigationProps>();

  const goToBook = useCallback(
    (bookId: number) => {
      navigate("reader", {
        bookId,
      });
    },
    [navigate]
  );

  return <BooksExplorer onPressedBook={goToBook} />;
};
