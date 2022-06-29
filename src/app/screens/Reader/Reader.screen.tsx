import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@typings";
import * as _ from "lodash";
import * as React from "react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { isCallChain } from "typescript";

import { Reader } from "../../components/Reader";
import { SaveBook } from "../../components/SaveBook";
import { useHeader } from "./useHeader";
import { useScroll } from "./useScroll";

export const ReaderScreen: FC = () => {
  const {
    params: { bookId },
  } = useRoute<RouteProp<RootStackParamList, "reader">>();

  const { toggle, isVisible } = useHeader(
    {
      rightIcon: () => <SaveBook bookId={bookId} />,
    },
    bookId
  );

  const { scrollListener, isScrolling } = useScroll();

  useEffect(() => {
    isVisible && isScrolling && toggle();
  }, [isVisible, isScrolling]);

  return (
    <SafeAreaView
      forceInset={{ bottom: "never", top: "never" }}
      style={{
        backgroundColor: "white",
        marginTop: isVisible ? -30 : 0,
        paddingTop: isVisible ? 40 : 50,
      }}
    >
      <Reader bookId={bookId} onLongPress={toggle} onScroll={scrollListener} />
    </SafeAreaView>
  );
};
