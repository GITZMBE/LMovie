import { Provider } from "@/src/models";
import Link from "next/link";
import Image from "next/image";


export const ProviderLink = ({ id, name, logoPath, displayPriority, displayPiorities }: Provider) => {
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = `${BASE_IMAGE_URL}/t/p/w500${logoPath}`;

  return (
    <Link href={`/providers/${id}`} className="flex items-center justify-center min-w-48 min-h-48 none-dragable">
      <Image src={imageUrl} alt={name} className="w-full h-full rounded-lg block none-dragable" width={150} height={150} />
      {/* <span>{name}</span> */}
    </Link>
  )
}

export default ProviderLink;