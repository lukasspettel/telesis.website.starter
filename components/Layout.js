import Link from "next/link";
import Head from "next/head";
import { Box, Flex, Container } from "@chakra-ui/react";
import {Navbar} from "./elements/Navbar";



export const Layout = (props) => {

  return (
    <Box p={"5rem"}>
      <Head>
        <title>Telesis</title>
        <meta
          name="description"
          content="Telesis - Actively shaping the future"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar props={props}/>
      <main>{props.children}</main>
    </Box>
  );
};

