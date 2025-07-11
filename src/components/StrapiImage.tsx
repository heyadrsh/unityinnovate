import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  priority = false,
  fill = false,
}: StrapiImageProps) {
  const imageUrl = getStrapiMedia(src);
  
  if (!imageUrl) return null;

  const imageProps = {
    src: imageUrl,
    alt,
    className,
    priority,
    ...(fill ? { fill: true } : { height, width }),
  };

  return <Image {...imageProps} />;
} 