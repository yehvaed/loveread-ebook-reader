declare module "*.html" {
  const value: string;
  export default value;
}

declare module "*.jpg";

type Nullable<T> = T | null | undefined;
