import { useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect } from "react";

interface UseHeaderProps {
  rightIcon: () => JSX.Element;
}

export const useHeader = ({ rightIcon }: UseHeaderProps, bookId: BookId) => {
  const [showHeader, setShowHeader] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
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
