import { Text } from "@components/Text";
import { useNavigation } from "@react-navigation/native";
import * as _ from "lodash";
import * as React from "react";
import { FC, useLayoutEffect, useState } from "react";
import { Button, Pressable, View } from "react-native";

import { usePage } from "./usePage";

interface PageProps {
  bookId: number;
  pageNumber: number;
}

export const Page: FC<PageProps> = ({ bookId, pageNumber }) => {
  const content = usePage(bookId, pageNumber);

  const [showHeader, setShowHeader] = useState(false);
  const n = useNavigation();

  useLayoutEffect(() => {
    n.setOptions({
      headerShadowVisible: false,
      headerShown: showHeader,
      headerTitle: "",
      headerLeft: () => null,
      headerBackTitle: "",
      headerRight: () => <Button onPress={() => {}} title="Save" />,
    });
  }, [showHeader]);

  return (
    <Pressable onLongPress={() => setShowHeader(!showHeader)}>
      {content?.map((item, i) => {
        const isChapter = item?.includes("#");
        const text = item?.replace("# ", "");

        if (isChapter) {
          return (
            <View key={`${pageNumber}.${i}`}>
              <Text
                accessibilityRole="text"
                style={{
                  paddingTop: 50,
                  paddingRight: 0,
                  paddingBottom: 10,
                  paddingLeft: 0,
                  fontWeight: "bold",
                  fontSize: 27,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {text}
              </Text>
            </View>
          );
        }

        return (
          <View key={`${pageNumber}.${i}`}>
            <Text
              accessibilityRole="text"
              style={{
                paddingTop: 10,
                paddingRight: 25,
                paddingBottom: 10,
                paddingLeft: 25,
                lineHeight: 30,
                fontWeight: "400",
                fontSize: 19,
              }}
            >
              {text}
            </Text>
          </View>
        );
      })}
    </Pressable>
  );
};
