import config from "@config/config.json";
import theme from "@config/theme.json";
import { JsonContext } from "context/state";
import Head from "next/head";
import { useEffect, useState } from "react";
import "styles/style.scss";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }) => {
  // destructuring items from config object
  const { favicon } = config.site;
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  return (
    <ThemeProvider enableSystem={true} attribute="class">

    <JsonContext>
      <Head>
        {/* favicon */}
        <link rel="shortcut icon" href={favicon} />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </JsonContext>
    </ThemeProvider>
  );
};

export default App;
