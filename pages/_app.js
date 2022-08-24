import { ChakraProvider } from "@chakra-ui/react";
import TinaProvider from "../.tina/components/TinaDynamicProvider";
import { Theme } from "../components/Theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={Theme} resetCSS>
      <TinaProvider>
          <Component {...pageProps} />
      </TinaProvider>
    </ChakraProvider>
  );
};

export default App;
