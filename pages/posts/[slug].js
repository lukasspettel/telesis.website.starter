import { staticRequest } from "tinacms";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import Image from "next/image";
import { useTina } from "tinacms/dist/edit-state";
import { category } from "../../components/Theme";
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
      <Box>
        <Box>
          <Flex align={"center"} pb={"2rem"} pt={"2rem"} gap={15}>
            <Link
              href={
                data.post?.category === category[0]
                  ? "/geo_tech/"
                  : data.post?.category === category[1]
                  ? "/data_science/"
                  : data.post?.category === category[2]
                  ? "/knowledge_management/"
                  : data.post?.category === category[3]
                  ? "/ecosystem_service/"
                  : data.post?.category === category[4]
                  ? "/integral_technical_planning/"
                  : data.post?.category === category[5]
                  ? "/sustainable_cities_and_living_spaces/"
                  : "/"
              }
            >
              <Button
                p={"2rem"}
                rounded={"none"}
                color={
                  data.post?.category === category[0]
                    ? "whitecuba.100"
                    : data.post?.category === category[1]
                    ? "whitecuba.100"
                    : data.post?.category === category[2]
                    ? "blacksuite.100"
                    : data.post?.category === category[3]
                    ? "whitecuba.100"
                    : data.post?.category === category[4]
                    ? "whitecuba.100"
                    : data.post?.category === category[5]
                    ? "whitecuba.100"
                    : "blacksuite.100"
                }
                bg={
                  data.post?.category === category[0]
                    ? "blacksuite.100"
                    : data.post?.category === category[1]
                    ? "purplesience.100"
                    : data.post?.category === category[2]
                    ? "yellowinsurance.100"
                    : data.post?.category === category[3]
                    ? "greenschool.100"
                    : data.post?.category === category[4]
                    ? "orangebiz.100"
                    : data.post?.category === category[5]
                    ? "greylondon.100"
                    : "blacksuite.100"
                }
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
        <Heading fontSize={"6xl"} textAlign={'center'}>{data.post?.title}</Heading>
      </Box>
      <Divider mb={"3rem"} mt={"1.5rem"} />
      <Grid
        autoRows={"auto"}
        autoColumns={"auto"}
        templateColumns={`repeat(${data.post?.size}, 1fr)`}
        gap={5}
      >
        <GridItem>
          <Box>
            <Text fontSize="lg" letterSpacing={"wide"} textAlign={"justify"}>
              {data.post?.description}
            </Text>
          </Box>
        </GridItem>
        {data.post?.image && (
          <GridItem>
            <Img
              quality="100"
              width={"100%"}
              height={"100%"}
              layout={"responsive"}
              objectFit="cover"
              src={data.post.image}
              alt={data.post.title}
            />
          </GridItem>
        )}
        {data.post
          ? data.post.text?.map((text, i) => {
              switch (text.__typename) {
                case "PostTextRichtext":
                  return (
                    <GridItem>
                      <RichtextBlock i={i} block={text} />
                    </GridItem>
                  );
              }
            })
          : null}
      </Grid>
      {data.post
        ? data.post.blocks?.map((block, i) => {
            switch (block.__typename) {
              case "PostBlocksHero":
                return (
                  <>
                    <HeroBlock i={i} block={block} />
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
                    <GalleryBlock i={i} block={block} />
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
            }
          })
        : null}
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
