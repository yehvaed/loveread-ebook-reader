import * as _ from "lodash";
import * as React from "react";
import { FC, useMemo } from "react";
import { View } from "react-native";

import { Text } from "../Text";
import { usePage } from "./usePage";

interface PageProps {
  bookId: number;
  pageNumber: number;
}

const Chapter = ({ children }: React.PropsWithChildren<unknown>) => (
  <Text
    accessibilityRole="text"
    style={{
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 10,
      paddingLeft: 0,
      fontWeight: "bold",
      fontSize: 27,
      textAlign: "center",
      fontStyle: "italic",
    }}
  >
    {children}
  </Text>
);

const Paragraph = ({ children }: React.PropsWithChildren<unknown>) => (
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
    {children}
  </Text>
);

export const Page: FC<PageProps> = ({ bookId, pageNumber }) => {
  const content = usePage(bookId, pageNumber);

  const lines = useMemo(() => {
    return content?.map((line) => ({
      type: line.includes("#"),
      text: line.replace("# ", ""),
    }));
  }, [content]);

  return (
    <View style={{ marginTop: 50, marginBottom: 30 }}>
      {lines?.map(({ type, text }, index) => {
        const Line = type ? Chapter : Paragraph;
        return <Line key={`${pageNumber}.${index}`}>{text}</Line>;
      })}
    </View>
  );
};
