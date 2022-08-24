import { staticRequest } from "tinacms";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";

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

const query = `query getPage($relativePath: String!) {
  page(relativePath: $relativePath) {
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

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout {... props}>
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
                    <FeaturedPostBlock i={i} block={block} />
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
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        pageConnection {
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
  const paths = postsResponse.pageConnection.edges.map((x) => {
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
