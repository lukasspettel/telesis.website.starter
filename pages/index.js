// Node Import
import { gql, staticRequest } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import React from "react";
import { Layout } from "../components/Layout";
import {
  Box,
  Flex,
  Heading,
  Text,
  chakra,
  Button,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import {
  bgColor,
  category,
  categoryHref,
  textColor,
} from "../components/Theme";
import Link from "next/link";
import Image from "next/image";
// End

// Block Import
import { HeroBlock } from "../components/blocks/HeroBlock";
import { CallToActionBlock } from "../components/blocks/CallToActionBlock";
import { QuoteBlock } from "../components/blocks/QuoteBlock";
import { GalleryBlock } from "../components/blocks/GalleryBlock";
import { FactBlock } from "../components/blocks/FactBlock";
import { LogoBlock } from "../components/blocks/LogoBLock";
import { FeaturedPostBlock } from "../components/blocks/FeaturedPostBlock";
import { CardBlock } from "../components/blocks/CardBlock";
import { RichtextBlock } from "../components/blocks/RichTextBlock";
// End

const query = `
query FetchQuery{
  page (relativePath: "home.mdx"){
    id
    blocks {
      ... on PageBlocksHero {
        __typename
        title
        subtitle
        image
        position {
          image {
            x
            y
            width
            height
          }
          text {
            x
            y
            width
            height
          }
        }
      }
      ... on PageBlocksCta {
        __typename
        title
        subtitle
        button {
          label
          href
        }
      }
      ... on PageBlocksQuote {
        __typename
        quote
        author
        x
        width
      }
      ... on PageBlocksGallery {
        __typename
        gallery {
          image
          alt
          x
          width
          height
        }
      }
      ... on PageBlocksFact {
        __typename
        fact {
          headline
          subheadline
          x
          width
        }
      }
      ... on PageBlocksLogos {
        __typename
        headline
        width
        logos {
          logo
          alt
          href
        }
      }
      ... on PageBlocksFeatured {
        __typename
        category
        size
        colors
      }
      ... on PageBlocksCard {
        __typename
        cards {
          title
          body
          x
          width
          colors
        }
      }
      ... on PageBlocksRichtext {
        __typename
        body
      }
    }
  }
  postConnection {
    edges {
      node {
        _sys{
          filename
        }
        title
        category
        tags
        date
        description
        image
      }
    }
  }
}`;

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });

  // Variables
  const posts = data.postConnection?.edges;

  // End
  return (
    <Layout {...props}>
      {data.page
        ? data.page.blocks?.map((block, i) => {
            switch (block.__typename) {
              case "PageBlocksHero":
                return (
                  <>
                    <HeroBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksCta":
                return (
                  <>
                    <CallToActionBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksQuote":
                return (
                  <>
                    <QuoteBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksGallery":
                return (
                  <>
                    <GalleryBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksFact":
                return (
                  <>
                    <FactBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksLogos":
                return (
                  <>
                    <LogoBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksFeatured":
                return (
                  <>
                    <FeaturedPostBlock i={i} block={block} posts={posts} />
                  </>
                );
              case "PageBlocksCard":
                return (
                  <>
                    <CardBlock i={i} block={block} />
                  </>
                );
              case "PageBlocksRichtext":
                return (
                  <>
                    <RichtextBlock i={i} block={block} />
                  </>
                );
            }
          })
        : null}
      <Box>
        <Flex wrap={"wrap"}>
          <Box pt={"2rem"} w={'100%'}>
            <Button
              p={"2rem"}
              rounded={"none"}
              color={"whitecuba.100"}
              bg={"blacksuite.100"}
              fontSize={"3xl"}
            >
              All Articles
            </Button>
            <Flex pt={"1.5rem"} gap={25} wrap={"wrap"} justify={'space-between'}>
              {posts?.map((node) => {
                return (
                  <Box w={'12rem'}>
                    <Box boxShadow={"lg"}>
                      <Text
                        fontSize={"xs"}
                        fontWeight={"bolder"}
                        margin={"auto"}
                        bg={bgColor(node.node?.category)}
                        color={textColor(node.node?.category)}
                        p={"0.5rem"}
                      >
                        {node.node.title}
                      </Text>
                      <Link href={`posts/${node.node._sys.filename}`}>
                        <Box
                          flexGrow={1}
                          margin={"auto"}
                          mt={"0.5rem"}
                          p={"0.85rem"}
                          bg={bgColor(node.node?.category)}
                          display={"block"}
                        >
                          <Img
                            bg={textColor(node.node?.category)}
                            rounded={"1.5rem"}
                            quality="100"
                            width={"100%"}
                            height={"100%"}
                            layout={"responsive"}
                            objectFit="cover"
                            src={node.node.image}
                            alt={node.node.title}
                          />
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};

//{fs.writeFileSync('../content/database/Layouts.json', JSON.stringify(users, null, 4))}
