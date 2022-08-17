import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import client from "@lib/sanity";

const { dataset } = client.config();

function SimpleBlockContent(props) {
  const { blocks } = props;

  if (!blocks) {
    console.error("Missing blocks");
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      dataset={dataset}
    />
  );
}

export default SimpleBlockContent;
