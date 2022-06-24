import { Text } from "@components/Text";
import * as _ from "lodash";
import * as React from "react";
import { FC } from "react";
import { View } from "react-native";

import { usePage } from "./usePage";

interface PageProps {
  bookId: number;
  pageNumber: number;
}

export const Page: FC<PageProps> = ({ bookId, pageNumber }) => {
  const content = usePage(bookId, pageNumber);

  return (
    <>
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
    </>
  );
};
