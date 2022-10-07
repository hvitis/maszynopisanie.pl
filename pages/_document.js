import TwSizeIndicator from "@components/TwSizeIndicator";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" class="h-full">
      <Head />
      <body class="h-full">
        <Main />
        <TwSizeIndicator />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
