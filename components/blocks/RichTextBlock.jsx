import { chakra, Box, Grid, GridItem, Heading, Text, Divider } from "@chakra-ui/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import Link from "next/link";

const components = {
  h1: (props) => <Heading as="h1" fontSize="5xl" my={2} {...props} />,
  h2: (props) => <Heading as="h2" fontSize="4xl" my={2} {...props} />,
  h3: (props) => <Heading as="h3" fontSize="3xl" my={2} {...props} />,
  h4: (props) => <Heading as="h4" fontSize="2xl" my={2} {...props} />,
  h5: (props) => <Heading as="h5" fontSize="xl" my={2} {...props} />,
  h6: (props) => <Heading as="h6" fontSize="lg" my={2} {...props} />,
  li: (props) => <Box as="li" fontSize="lg" my={2} mx={4} {...props} />,
  ul: (props) => <Box as="ul" fontSize="lg" my={2} mx={4} {...props} />,
  ol: (props) => <Box as="ol" fontSize="lg" my={2} mx={4} {...props} />,
  a: (props) => {
    return <Link href={props.href}>{props.children}</Link>;
  },
  code: (props) => {
    return (
      <Code fontSize="lg" my={2}>
        {props.children}
      </Code>
    );
  },
  hr: (props) => {
    return <Divider mb={'1.5rem'}{... props}/>
  },
  p: (props) => {
    return <Text my={2} fontSize='md' letterSpacing={'wide'} textAlign={'justify'}{...props} />;
  },
  img: (props) => {

    const Img = chakra(Image, {
      shouldForwardProp: (prop) =>
        ["width", "height", "src", "alt", "layout", "fill"].includes(prop),
    });
    return (
      <Img
        mx="auto"
        src={props.url ? props.url : '/'}
        height={"500"}
        width="100%"
        alt={props.alt}
        objectFit="cover"
        quality="100"
      />
    );
  },
};

export const RichtextBlock = ({ block, id, i }) => {
  return (
    <Box >
      <TinaMarkdown content={block.body} components={components}/>
    </Box>
  );
};

