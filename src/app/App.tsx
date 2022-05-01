import { Home } from "@screens/Home";
import { Reader } from "@screens/Reader";
import { Screen } from "@utils/navigator";
import React from "react";

import { Screens } from "./Screens";

export default function App() {
  return (
    <Screens>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen
        name="Reader"
        component={Reader}
        options={{ headerShown: false }}
      />
    </Screens>
  );
}
