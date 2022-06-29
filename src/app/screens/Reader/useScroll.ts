import { useState, useRef, useCallback } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export const useScroll = () => {
  const [offset, setOffset] = useState(0);
  const isScrolling = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout>();

  const scrollListener = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      // const direction = currentOffset > offset ? "down" : "up";

      setOffset(currentOffset);

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      scrollTimer.current = setTimeout(() => {
        isScrolling.current = false;
      }, 50);

      isScrolling.current = true;
    },
    [offset]
  );

  return { scrollListener, isScrolling: isScrolling.current };
};
