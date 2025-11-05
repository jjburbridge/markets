import React from "react";

interface SanityImageProps {
  image: any;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}
const projectId = process.env.SANITY_APPOJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

const SanityImage: React.FC<SanityImageProps> = ({
  image,
  alt = "Image",
  width = 40,
  height = 40,
  className = "",
  style = {},
}) => {
  const getImageUrl = (imageData: any) => {
    if (!imageData?.asset?._ref) {
      return null;
    }

    // Extract the asset ID from the reference
    // Format: "image-17fc85bb342613564d22be98165117abd0c6ea41-5000x3340-jpg"
    const assetRef = imageData.asset._ref;
    const assetId = assetRef.replace("image-", "");

    // The assetId now contains: "17fc85bb342613564d22be98165117abd0c6ea41-5000x3340-jpg"
    // We need to convert the format from "-jpg" to ".jpg"
    const finalAssetId = assetId
      .replace(/-jpg$/, ".jpg")
      .replace(/-png$/, ".png")
      .replace(/-webp$/, ".webp");

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${finalAssetId}?auto=format&w=${width}&h=${height}`;
  };

  if (!image) {
    return null;
  }

  const imageUrl = getImageUrl(image);

  if (!imageUrl) {
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover",
        borderRadius: "4px",
        flexShrink: 0,
        ...style,
      }}
      onError={(e) => {
        console.error("SanityImage failed to load:", e);
        console.log("Image data:", image);
      }}
    />
  );
};

export default SanityImage;
