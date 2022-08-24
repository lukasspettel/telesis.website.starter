import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useTina } from "tinacms/dist/edit-state";
import Logo from "../../public/Telesis_Logo_black_negativ_space.svg";
import {
  useDisclosure,
  Button,
  Box,
  Flex,
  chakra,
  Heading,
  Text,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import { bgColor, category, categoryHref, textColor } from "../Theme";

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export const Navbar = (props) => {
  const allTags = props.props.data?.postConnection.edges.map((node) => {
    return node.node.tags;
  });

  const mergedTags = [].concat.apply([], allTags);

  const uniqueTags = [...new Set(mergedTags)];

  const bg = bgColor(props.props.data.post?.category)
  const textcol = textColor(props.props.data.post?.category)
  const href = categoryHref( props.props.data.post?.category)


  return (
    <Box pos={"sticky"} top={0} zIndex={10}>
      <Flex justify="space-between" align={"center"}>
        <Link href="/">
          <Box fontSize={"xl"} color={"whitecuba.100"} flexGrow={1}>
            <Img
              quality="100"
              width={"160"}
              height={"80"}
              objectFit="contain"
              src={Logo}
              alt={"Telesis Logo"}
            />
          </Box>
        </Link>
        <HStack flexGrow={1} justify={"right"}>
          <Link href="/about/">
            <Button rounded={"none"} bg={bg} color={textcol}>
              About Us
            </Button>
          </Link>
          <Link href="/contact/">
            <Button
              rounded={"none"}
              bg={bg} color={textcol}
            >
              Contact
            </Button>
          </Link>
          <Link href="/our_mission/">
            <Button
              rounded={"none"}
              bg={bg} color={textcol}
            >
              Our Mission
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Box>
        <Accordion allowMultiple allowToggle>
          <Flex gap={15} justify={"left"}>
            <AccordionItem border="none">
              <Box pos={"relative"}>
                <AccordionButton
                  w={"150px"}
                  fontWeight={"bold"}
                  rounded={"none"}
                  bg={bg} color={textcol}
                >
                  Field of Work
                </AccordionButton>
              </Box>
              <AccordionPanel>
                <Flex wrap={"wrap"} gap={15}>
                  {category.map((item, i) => {
                    return (
                      <Link href={categoryHref(item)}>
                        <Button
                          p={"2rem"}
                          fontWeight={"light"}
                          rounded={"none"}
                          color={textColor(item)}
                          bg={bgColor(item)}
                          fontSize={"1xl"}
                        >
                          {item}
                        </Button>
                      </Link>
                    );
                  })}
                </Flex>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <Box>
                <AccordionButton
                  w={"100px"}
                  rounded={"none"}
                  fontWeight={"bold"}
                  bg={bg} color={textcol}
                >
                  Topics
                </AccordionButton>
              </Box>
              <AccordionPanel gap={15} pb={4}>
                <Accordion allowToggle>
                  <Flex wrap={"wrap"}>
                    {uniqueTags?.map((tag, i) => {
                      return (
                        <AccordionItem border="none" m={"0.25rem"}>
                          <AccordionButton
                            color={"whitecuba.100"}
                            rounded={"none"}
                            textAlign={"center"}
                            size={"sm"}
                            bg={"blacksuite.100"}
                          >
                            {tag}
                          </AccordionButton>

                          <AccordionPanel>
                            <Flex wrap={"wrap"} gap={15}>
                              {props.props.data.postConnection.edges.map(
                                (node) => {
                                  return (
                                    <>
                                      {node.node.tags.map((item) => {
                                        return (
                                          <>
                                            {item === tag && (
                                              <Link
                                                href={`/posts/${node.node._sys.filename}`}
                                              >
                                                <Button
                                                  color={textColor(
                                                    node.node.category
                                                  )}
                                                  bg={bgColor(
                                                    node.node.category
                                                  )}
                                                  fontWeight={"light"}
                                                  rounded={"none"}
                                                  size={"xs"}
                                                >
                                                  <Text>{node.node.title}</Text>
                                                </Button>
                                              </Link>
                                            )}
                                          </>
                                        );
                                      })}
                                    </>
                                  );
                                }
                              )}
                            </Flex>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    })}
                  </Flex>
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          </Flex>
        </Accordion>
      </Box>
    </Box>
  );
};
