import { type } from "os";
import {
  defineConfig,
  defineSchema,
  FieldsBuilder,
  TinaTemplate,
} from "tinacms";

// Variables
import { category, colors } from "../components/Theme";
// End

// Block Section

const HeroBlock: TinaTemplate = {
  name: "hero",
  label: "Hero",
  ui: {
    itemProps: (item) => {
      return { label: "Hero // " + item?.title };
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
    {
      name: "position",
      label: "Positions",
      type: "object",
      fields: [
        {
          name: "text",
          label: "Textposition",
          type: "object",
          fields: [
            {
              name: "x",
              label: "X Position",
              type: "number",
              ui:{
                validate: (val)=>{
                  if(val >= 8 ) {
                    return 'the number must be less then 8'
                  } 
                }
              },
            },
            {
              name: "width",
              label: "Width",
              type: "number",
              ui:{
                validate: (val)=>{
                  if(val >= 8 ) {
                    return 'the number must be less then 8'
                  } 
                }
              },
            },
            {
              name: "y",
              label: "Y Position",
              type: "number",
              ui:{
                validate: (val)=>{
                  if(val >= 51 ) {
                    return 'the number must be less then 51'
                  }
                }
              },
            },
            {
              name: "height",
              label: "Height",
              type: "number",
              ui:{
                validate: (val)=>{
                  if(val >= 51 ) {
                    return 'the number must be less then 51'
                  }
                }
              },
            },
          ],
        },
        {
          name: "image",
          label: "Imageposition",
          type: "object",
          fields: [
            {
              name: "x",
              label: "Start X",
              type: "number",
            },
            {
              name: "width",
              label: "Width",
              type: "number",
            },
            {
              name: "y",
              label: "Y",
              type: "number",
            },
            {
              name: "height",
              label: "Height",
              type: "number",
            },
          ],
        },
      ],
    },
  ],
};

const CallToActionBlock: TinaTemplate = {
  name: "cta",
  label: "Call to Action",
  ui: {
    itemProps: (item) => {
      return { label: "CTA // " + item?.title };
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "string",
    },
    {
      name: "button",
      label: "Button",
      type: "object",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "href",
          label: "Href",
          type: "string",
        },
      ],
    },
  ],
};

const QuoteBlock: TinaTemplate = {
  name: "quote",
  label: "Quote",
  fields: [
    {
      name: "quote",
      label: "Quote",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "author",
      label: "author",
      type: "string",
    },
    {
      name: "x",
      label: "X Position",
      type: "number",
    },
    {
      name: "width",
      label: "Width",
      type: "number",
    },
  ],
};

const GalleryBlock: TinaTemplate = {
  name: "gallery",
  label: "Gallery",
  fields: [
    {
      name: "gallery",
      label: "Images",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item?.alt };
        },
      },
      fields: [
        {
          name: "image",
          label: "Single Image",
          type: "image",
        },
        {
          name: "alt",
          label: "Alternative Descirption",
          type: "string",
        },
        {
          name: "x",
          label: "X Position",
          type: "number",
        },
        {
          name: "width",
          label: "Width",
          type: "number",
        },
        {
          name: "height",
          label: "Height",
          type: "number",
        },
      ],
    },
  ],
};

const FactBlock: TinaTemplate = {
  name: "fact",
  label: "Facts",
  fields: [
    {
      name: "fact",
      label: "Facts",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item?.headline };
        },
      },
      fields: [
        {
          name: "headline",
          label: "Headline",
          type: "string",
        },
        {
          name: "subheadline",
          label: "Subheadline",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "x",
          label: "X Position",
          type: "number",
        },
        {
          name: "width",
          label: "Width",
          type: "number",
        },
      ],
    },
  ],
};

const LogoBlock: TinaTemplate = {
  name: "logos",
  label: "Logos",
  fields: [
    {
      name: "headline",
      label: "Headline",
      type: "string",
    },
    {
      name: "width",
      label: "Logo Widths",
      type: "number",
    },
    {
      name: "logos",
      label: "Logos",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item?.alt };
        },
      },
      fields: [
        {
          name: "logo",
          label: "Single Logo",
          type: "image",
        },
        {
          name: "alt",
          label: "Alternative Description",
          type: "string",
        },
        {
          name: "href",
          label: "HREF",
          type: "string",
        },
      ],
    },
  ],
};

const FeaturedPostBlock: TinaTemplate = {
  label: "Featured Posts",
  name: "featured",
  fields: [
    {
      name: "category",
      label: "Category",
      type: "string",
      options: category,
    },
    {
      name: "size",
      label: "Gridsize",
      type: "number",
    },
    {
      name: "colors",
      label: "Colors",
      type: "string",
      options: colors,
    },
  ],
};

const CardBlock: TinaTemplate = {
  label: "Card Block",
  name: "card",
  fields: [
    {
      name: "cards",
      label: "Cards",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "body",
          label: "Body",
          type: "rich-text",
        },
        {
          name: "href",
          label: "HREF",
          type: "string",
        },
        {
          name: "x",
          label: "X Position",
          type: "number",
        },
        {
          name: "width",
          label: "Width",
          type: "number",
        },
        {
          name: 'colors',
          label: 'Color',
          type: 'string',
          options: colors,
        },
      ],
    },
  ],
};

const RichtextBlock: TinaTemplate = {
  label: "Rich Text",
  name: "richtext",
  fields: [
    {
      name: "body",
      label: "Body",
      type: "rich-text",
    },
  ],
};
// Block Section End

const blocks = [
  HeroBlock,
  CallToActionBlock,
  QuoteBlock,
  GalleryBlock,
  FactBlock,
  LogoBlock,
  CardBlock,
  FeaturedPostBlock,
  RichtextBlock,
];

const schema = defineSchema({
  config: {
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Pages",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "blocks",
          label: "Page Block Section",
          type: "object",
          list: true,
          templates: blocks,
        },
      ],
    },
    // End of Pages
    {
      label: "Posts",
      name: "post",
      path: "content/post",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          name: "category",
          label: "Category",
          type: "string",
          options: category,
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true,
          ui: {
            component: "tags",
          },
        },
        {
          name: "date",
          label: "Published Date",
          dateFormat: "DD MMMM YYYY",
          type: "datetime",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "size",
          label: "Gridsize",
          type: "number",
        },
        {
          name: "image",
          label: "og:image",
          type: "image",
        },
        {
          name: "text",
          label: "Text Block Section",
          type: "object",
          list: true,
          templates: [RichtextBlock],
        },
        {
          name: "blocks",
          label: "Post Block Section",
          type: "object",
          list: true,
          templates: blocks,
        },
      ],
    },
    // End of Posts
    {
      label: "Maps",
      name: "map",
      path: "content/map",
      format: "mdx",
      fields: [
        {
          name: "date",
          label: "Published Date",
          type: "datetime",
        },
      ],
    },
    // End of Maps
  ],
});

export default schema;

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  cmsCallback: (cms) => {
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["page"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return "/";
          }
        }
        if (["page"].includes(collection.name)) {
          return `/${document._sys.filename}`;
        }

        if (["post"].includes(collection.name)) {
          return `/posts/${document._sys.filename}`;
        }

        if (["map"].includes(collection.name)) {
          return `/maps/${document._sys.filename}`;
        }

        return undefined;
      });

      cms.plugins.add(RouteMapping);
    });
    return cms;
  },
});
