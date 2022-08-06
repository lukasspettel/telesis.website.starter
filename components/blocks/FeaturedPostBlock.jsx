import Image from "next/image";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  chakra,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export const FeaturedPostBlock = ({ block, posts, id, i }) => {

  const color = block.colors

  return (
    <Box mt={"3rem"} mb={"3rem"} >
      <Box pl={'1.5rem'}>
        <Heading color={color} fontSize={"3xl"} >
          {block.category}
        </Heading>
      </Box>
      <Grid
        pt={"1.5rem"}
        templateColumns={`repeat(${block.size}, 1fr)`}
        pos={"relative"}
      >
        {posts?.map((post) => {
          return (
            <Box pos={"relative"} p={'1.5rem'}>
              {post.node.category == `${block.category}` && (
                <>
                  {post.node.image && (
                    <GridItem cursor={"pointer"}>
                      <Link href={`/posts/${post.node._sys?.filename ?? " "}`}>
                        <Box
                          p={`1.5rem`}
                          color={color}
                          display={"block"}
                          zIndex={0}
                        >
                          <Img
                            rounded={"1.5rem"}
                            quality="100"
                            width={"100%"}
                            height={"100%"}
                            layout={"responsive"}
                            objectFit="cover"
                            src={post.node.image}
                            alt={post.node.title}
                          />
                        </Box>
                      </Link>
                    </GridItem>
                  )}
                </>
              )}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

/*

<Text fontSize={"sm"} textAlign={"center"}>
  {post.node.date}
</Text>

 */
