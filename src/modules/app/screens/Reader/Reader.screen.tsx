import { Reader } from "@components/Reader";
import { SaveBook } from "@components/SaveBook";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@typings";
import * as _ from "lodash";
import * as React from "react";
import { FC, useCallback, useRef, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { useHeader } from "./useHeader";

interface UseScrollDirectionProps {
  onScrollBottom?: (direction: "down" | "up") => void;
}

const useScrollDirection = ({ onScrollBottom }: UseScrollDirectionProps) => {
  const [offset, setOffset] = useState(0);
  const previousDirection = useRef(null);

  const detectDirection = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const direction = currentOffset > offset ? "down" : "up";

      if (previousDirection.current !== direction) {
        onScrollBottom?.(direction);
      }

      setOffset(currentOffset);
    },
    [offset]
  );

  return { detectDirection };
};

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

  const { detectDirection } = useScrollDirection({
    onScrollBottom: () => isVisible && toggle(),
  });

  return (
    <SafeAreaView
      forceInset={{ bottom: "never", top: "never" }}
      style={{
        backgroundColor: "white",
        marginTop: isVisible ? -30 : 0,
        paddingTop: isVisible ? 40 : 50,
      }}
    >
      <Reader
        bookId={bookId}
        onLongPress={toggle}
        onScroll={(event) => {
          detectDirection(event);
        }}
      />
    </SafeAreaView>
  );
};
