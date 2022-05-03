import Constants from "expo-constants";

import { constants } from "../app.config";

type Constants = typeof constants;

export const { isDevelopment } = Constants.manifest!.extra as Constants;

// test ids
export const BookCardTestId = "book-card";
