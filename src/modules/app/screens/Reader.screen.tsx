import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@typings";
import * as _ from "lodash";
import * as React from "react";
import { FC } from "react";

import { Reader } from "../components/reader";

export const ReaderScreen: FC = () => {
  const {
    params: { bookId },
  } = useRoute<RouteProp<RootStackParamList, "reader">>();

  return <Reader bookId={bookId} />;
};
