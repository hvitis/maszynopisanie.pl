import TwSizeIndicator from "@components/TwSizeIndicator";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="pl" className="h-full">
      <Head />
      <body className="h-full">
        <Main />
        <TwSizeIndicator />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
