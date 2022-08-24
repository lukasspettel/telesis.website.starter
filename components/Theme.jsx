import { extendTheme } from "@chakra-ui/react";

export const category = [
  "Geo Tech",
  "Data Sience",
  "Knowledge Management",
  "Ecosystem Service",
  "Integral Technical Planning",
  "Sustainable Cities & Living Spaces",
];

export const colors = [
  "whitecuba.100",
  "blacksuite.100",
  "greyaltona.100",
  "greylondon.100",
  "orangebiz.100",
  "purplesience.100",
  "yellowinsurance.100",
  "greenschool.100",
];

export const categoryHref = (item) => {
  if (item === category[0]){
    return '/geo_tech/'
  }
  if (item === category[1]){
    return "/data_science/"
  }
  if (item === category[2]){
    return "/knowledge_management/"
  }
  if (item === category[3]){
    return "/ecosystem_service/"
  }
  if (item === category[4]){
    return "/integral_technical_planning/"
  }
  if (item === category[5]){
    return "/sustainable_cities_and_living_spaces/"
  }
  return '/'
};

export const textColor = (item) => {
  if (item === category[0]){
    return "whitecuba.100"
  }
  if (item === category[1]){
    return "whitecuba.100"
  }
  if (item === category[2]){
    return "blacksuite.100"
  }
  if (item === category[3]){
    return "blacksuite.100"
  }
  if (item === category[4]){
    return "whitecuba.100"
  }
  if (item === category[5]){
    return "whitecuba.100"
  }
  return "whitecuba.100"
}

export const bgColor = (item) => {
  if (item === category[0]){
    return "blacksuite.100"
  }
  if (item === category[1]){
    return "purplesience.100"
  }
  if (item === category[2]){
    return "yellowinsurance.100"
  }
  if (item === category[3]){
    return "greenschool.100"
  }
  if (item === category[4]){
    return "orangebiz.100"
  }
  if (item === category[5]){
    return "greylondon.100"
  }
  return "blacksuite.100"
}


// "Liberata, serif", "Space Grotesk, sans-serif","DejaVu Mono, monospace",
export const Theme = extendTheme({
  fonts: {
    body: "DejaVu Mono, monospace",
    heading: "Space Grotesk, sans-serif",
    mono: "DejaVu Mono, monospace",
  },

  colors: {
    whitecuba: {
      100: "#E7E8E9",
    },
    blacksuite: {
      100: "#251F1F",
    },
    greyaltona: {
      100: "#888585",
    },
    greylondon: {
      100: "#464242",
    },
    orangebiz: {
      100: "#EC681D",
    },
    purplesience: {
      100: "#7F40F1",
    },
    yellowinsurance: {
      100: "#F1E540",
    },
    greenschool: {
      100: "#45DEA0",
    },
  },
});
