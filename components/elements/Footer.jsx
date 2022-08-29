import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useTina } from "tinacms/dist/edit-state";
import Logo from "../../public/Telesis_Logo_black_negativ_space.svg";
import { motion, useScroll } from "framer-motion";
import {
  useDisclosure,
  Button,
  Box,
  Flex,
  chakra,
  Heading,
  Text,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Spacer,
  List,
  ListItem,
} from "@chakra-ui/react";
import { bgColor, category, categoryHref, textColor } from "../Theme";

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout", "fill"].includes(prop),
});

export const Footer = (props) => {
  const allTags = props.props.data?.postConnection.edges.map((node) => {
    return node.node.tags;
  });

  const mergedTags = [].concat.apply([], allTags);

  const uniqueTags = [...new Set(mergedTags)];

  const bg = bgColor(props.props.data.post?.category);
  const textcol = textColor(props.props.data.post?.category);

  const { scrollYProgress } = useScroll();

  return (
    <Box top={0} zIndex={10} pt={'5rem'}>
      <Flex wrap={"wrap"} gap={150} pb={'3rem'}>
      <Link href="/">
          <Box fontSize={"xl"} >
            <Img
              bg={"whitecuba.100"}
              quality="100"
              width={"120"}
              height={"60"}
              objectFit="contain"
              src={Logo}
              alt={"Telesis Logo"}
            />
          </Box>
        </Link>
        <Spacer/>
        <Box>
          <Heading fontSize={"md"} >Company</Heading>
          <List>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link  href="/about_us/">About us</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/contact/">Contact</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/our_mission/">Our Mission</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/terms/">Terms</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/privacy/">Privacy</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/security/">Security</Link>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading fontSize={"md"}>Field of Work</Heading>
          <List>
          <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/geo_tech/">Geo Tech</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/data_sience/">Data Sience</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/knowledge_management/">Knowledge Management</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/ecosystem_service">Ecosystem Service</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/integral_technical_planning/">Integral Technical Planning</Link>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/sustainable_cities_and_living_spaces">Sustainable Cities & Living Spaces</Link>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading fontSize={"md"}>Contribute</Heading>
          <List>
          <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <a href="/">Documentation</a>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <a href="/">Github</a>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <Link href="/">Stack</Link>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading fontSize={"md"}>Social Media</Heading>
          <List>
          <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <a href="/">Youtube</a>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <a href="/">Facebook</a>
            </ListItem>
            <ListItem fontSize={"xs"} lineHeight={'1.5rem'}>
              <a href="/">Instagram</a>
            </ListItem>
          </List>
        </Box>
      </Flex>
      <Divider/>
      <Box pt={'2rem'}>
        <Text>© Telesis GmbH 2022</Text>
      </Box>
    </Box>
  );
};
