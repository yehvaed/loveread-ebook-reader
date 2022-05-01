import Constants from "expo-constants";

import appConfig from "../app.config";

type Constants = typeof appConfig.extra;
export const { isDevelopment } = Constants.manifest!.extra as Constants;

// test ids
export const BookCardTestId = "book-card";
