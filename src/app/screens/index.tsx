import { View, Text } from "react-native";
import { Link } from "expo-router";
import { httpClient } from "../../libs/httpClient/httpClient";
import { useEffect } from "react";
import { Stack } from "expo-router";

import { useQuery } from '@tanstack/react-query';

export default function Index() {
  const { data } = useQuery(["asd"], () => httpClient.get("/index_book.php"))
  useEffect(() => {
    console.log(data?.data);
  }, [data]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Overview" }} />
      <Text>Home Screen</Text>
      <Link href="/">Go to Details</Link>
    </View>
  );
}