import Image from "next/image";
import {
  Grid,
  GridItem,
  Heading,
  Text,
  Box,
  Flex,
  chakra,
  Divider,
} from "@chakra-ui/react";

const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export const LogoBlock = ({ block, id, i }) => {
  return (
    <Box mt={"1.5rem"} mb={"1.5rem"}>
      <Heading textAlign={"center"} fontSize="3xl" pb={"1.5rem"}>
        {block.headline}
      </Heading>
      <Divider/>
      <Flex justify={"space-evenly"} gap={"1.5rem"} wrap={'wrap'}>
        {block.logos?.map((item) => {
          return (
            <Box pt={'1.5rem'}>
              {item.logo && (
                <a href={item?.href ?? "/"}>
                  <Box display={'block'}>
                    <Img
                      width={block?.width  ?? '50'}
                      height="100%"
                      quality="100"
                      objectFit='contain'
                      src={item.logo}
                      alt={"Logo"}
                    />
                  </Box>
                </a>
              )}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
