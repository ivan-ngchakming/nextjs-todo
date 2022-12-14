import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Navbar } from "../lib/shared/components";
import TodoProvider from "../lib/todo/contexts/TodoContext";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TodoProvider>
          <Navbar />
          <Component {...pageProps} />
        </TodoProvider>
      </ThemeProvider>
    </>
  );
}
