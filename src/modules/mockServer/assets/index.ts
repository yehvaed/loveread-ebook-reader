import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const loadAsset = async (virtualAssetModule: number | string) => {
  const fromModule = Asset.fromModule(virtualAssetModule);
  const downloadedAsset = await fromModule.downloadAsync();

  const assetContent = await FileSystem.readAsStringAsync(
    downloadedAsset.localUri!
  );

  return assetContent;
};

const assets = {
  books: loadAsset(require("./books.mock.html")),
  book: loadAsset(require("./book.mock.html")),
  details: loadAsset(require("./book-details.mock.html")),
};

export const getAsset = (assetKey: keyof typeof assets) => {
  return assets[assetKey];
};
