import { staticRequest } from "tinacms";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/uploads/Logos/Telesis_Logo_black_nospace.svg";
import { useTina } from "tinacms/dist/edit-state";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  chakra,
  Heading,
  Text,
} from "@chakra-ui/react";


const Img = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "layout"].includes(prop),
});

export const Navbar = (props) => {

  return (
    <Box p={"1rem"}>
      <Flex justify="space-between">
        <Link href="/">
          <Box fontSize={"xl"} color={"whitecuba.100"}>
            <Img
              quality="100"
              width={"150"}
              height={"50"}
              objectFit="contain"
              src={Logo}
              alt={"Telesis Logo"}
            />
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};