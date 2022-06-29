import { LOVEREAD_URL } from "@consts";
import axios from "@services/httpClient";
import { encode } from "base64-arraybuffer";
import * as React from "react";
import { useMemo } from "react";
import { Image } from "react-native";
import { useQuery } from "react-query";

export interface CoverProps {
  bookId: number;
}

const RATIO = 160 / 230;

export const Cover = ({ bookId }: CoverProps) => {
  return (
    <Image
      style={{
        height: 200,
        width: 200 * RATIO,
        margin: 10,
        borderRadius: 10,
      }}
      source={{ uri: `${LOVEREAD_URL}/img/photo_books/${bookId}.jpg` }}
    />
  );
};
