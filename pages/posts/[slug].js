import { staticRequest } from "tinacms";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import Image from "next/image";
import { useTina } from "tinacms/dist/edit-state";
import {
  bgColor,
  category,
  categoryHref,
  textColor,
} from "../../components/Theme";
import {
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
  chakra,
  Heading,
  Text,
  Divider,
  Spacer,
} from "@chakra-ui/react";
// Block Import
import { HeroBlock } from "../../components/blocks/HeroBlock";
import { CallToActionBlock } from "../../components/blocks/CallToActionBlock";
import { QuoteBlock } from "../../components/blocks/QuoteBlock";
import { GalleryBlock } from "../../components/blocks/GalleryBlock";
import { FactBlock } from "../../components/blocks/FactBlock";
import { LogoBlock } from "../../components/blocks/LogoBLock";
import { FeaturedPostBlock } from "../../components/blocks/FeaturedPostBlock";
import { CardBlock } from "../../components/blocks/CardBlock";
import { RichtextBlock } from "../../components/blocks/RichTextBlock";
// End

const query = `
  query getPost($relativePath: String!) {
    post(relativePath: $relativePath) {
      id
      title
      category
      tags
      date
      description
      size
      image
      text {
        ... on PostTextRichtext {
          __typename
          body
        }
      }
      blocks {
        ... on PostBlocksHero {
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
        ... on PostBlocksCta {
          __typename
          title
          subtitle
          button {
            label
            href
          }
        }
        ... on PostBlocksQuote {
          __typename
          quote
          author
          x
          width
        }
        ... on PostBlocksGallery {
          __typename
          gallery {
            image
            alt
            x
            width
            height
          }
        }
        ... on PostBlocksFact {
          __typename
          fact {
            headline
            subheadline
            x
            width
          }
        }
        ... on PostBlocksLogos {
          __typename
          headline
          width
          logos {
            logo
            alt
            href
          }
        }
        ... on PostBlocksFeatured {
          __typename
          category
          size
          colors
        }
        ... on PostBlocksCard {
          __typename
          cards {
            title
            body
            x
            width
            colors
          }
        }
      }
    }
    postConnection {
      edges {
        node {
          _sys {
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
  }
`;

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  
  const posts = data.postConnection?.edges;
  return (
    <Layout {...props}>
      <Heading pt={"4rem"} fontSize={"6xl"} textAlign={"left"}>
        {data.post?.title}
      </Heading>
      <Divider mb={"1.5rem"} mt={"1rem"} />
      <Flex gap={25} align={"end"} justify={"flex-start"}>
        <Box>
          <Flex wrap={"wrap"} align={"end"} justify={"flex-start"} gap={15}>
            <Link href={categoryHref(data.post?.category)}>
              <Button
                p={"2rem"}
                rounded={"none"}
                color={textColor(data.post?.category)}
                bg={bgColor(data.post?.category)}
                fontSize={"1xl"}
              >
                {data.post?.category}
              </Button>
            </Link>
            {data.post?.tags.map((tag) => (
              <Box>
                <Button
                  p={"1rem"}
                  color={"whitecuba.100"}
                  rounded={"none"}
                  textAlign={"center"}
                  size={"sm"}
                  bg={"blacksuite.100"}
                >
                  {tag}
                </Button>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box w={"15%"}>
          {data.post?.image && (
            <Box
              p={"1.5rem"}
              bg={bgColor(data.post?.category)}
              display={"block"}
            >
              <Img
                bg={textColor(data.post?.category)}
                rounded={"1.5rem"}
                quality="100"
                width={"100%"}
                height={"100%"}
                layout={"responsive"}
                objectFit="cover"
                src={data.post.image}
                alt={data.post.title}
              />
            </Box>
          )}
        </Box>
        <Box w={"50%"}>
          <Text fontSize="sm" fontWeight={"thin"} textAlign={"justify"}>
            {data.post?.description}
          </Text>
        </Box>
      </Flex>
      <Divider mb={"3rem"} mt={"1.5rem"} />
      <Grid
        autoRows={"auto"}
        autoColumns={"auto"}
        templateColumns={`repeat(${data.post?.size}, 1fr)`}
        gap={5}
      >
      </Grid>
      {data.post
        ? data.post.blocks?.map((block, i) => {
            switch (block.__typename) {
              case "PostBlocksHero":
                return (
                  <>
                    <HeroBlock
                      i={i}
                      block={block}
                      category={data.post?.category}
                    />
                  </>
                );
              case "PostBlocksCta":
                return (
                  <>
                    <CallToActionBlock i={i} block={block} />
                  </>
                );
              case "PostBlocksQuote":
                return (
                  <>
                    <QuoteBlock i={i} block={block} />
                  </>
                );
              case "PostBlocksGallery":
                return (
                  <>
                    <GalleryBlock
                      i={i}
                      block={block}
                      category={`${data.post?.category}`}
                    />
                  </>
                );
              case "PostBlocksFact":
                return (
                  <>
                    <FactBlock i={i} block={block} />
                  </>
                );
              case "PostBlocksLogos":
                return (
                  <>
                    <LogoBlock i={i} block={block} />
                  </>
                );
              case "PostBlocksFeatured":
                return (
                  <>
                    <FeaturedPostBlock i={i} block={block} posts={posts} />
                  </>
                );
              case "PostBlocksCard":
                return (
                  <>
                    <CardBlock i={i} block={block} />
                  </>
                );
                case "PostTextRichtext":
                  return (
                    <>
                      <RichtextBlock i={i} block={text} />
                    </>
                  );
            }
          })
        : null}
      <Box>
        <Flex wrap={"wrap"}>
          <Box pt={"2rem"}>
            <Button
              p={"2rem"}
              rounded={"none"}
              bg={bgColor(data.post?.category)}
              color={textColor(data.post?.category)}
              fontSize={"3xl"}
            >
              Related Articles
            </Button>
            <Flex wrap={"wrap"}>
              {posts?.map((node) => {
                return (
                  <Box>
                    {node.node.category === data.post?.category && (
                      <>
                        <Box
                          flexGrow={1}
                          minW={"15rem"}
                          mt={"0.5rem"}
                          mb={"1.5rem"}
                          mr={"1.5rem"}
                        >
                          <Text
                            fontSize={"md"}
                            fontWeight={"bolder"}
                            margin={"auto"}
                            bg={bgColor(data.post?.category)}
                            color={textColor(data.post?.category)}
                            pt={"0.5rem"}
                            pb={"0.5rem"}
                            pl={"0.5rem"}
                          >
                            {node.node.title}
                          </Text>
                          <Link href={`${node.node._sys.filename}`}>
                            <Box
                              margin={"auto"}
                              mt={"0.5rem"}
                              p={"1.5rem"}
                              bg={bgColor(data.post?.category)}
                              display={"block"}
                            >
                              <Img
                                rounded={"1.5rem"}
                                bg={textColor(node.node?.category)}
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
                      </>
                    )}
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

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = postsResponse.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    console.log(error);
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
