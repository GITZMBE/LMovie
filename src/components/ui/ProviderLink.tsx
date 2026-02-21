import { Provider } from "@/src/models";
import Link from "next/link";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  id: number,
  name: string,
  imagePath: string,
  brandColor: string,
};

export const ProviderLink = ({ id, name, imagePath, brandColor }: Props) => {
  return (
    <Link href={`/providers/${id}`} style={{ "--brand": brandColor } as CSSProperties} className={`group relative flex items-center justify-center min-w-48 min-h-48 p-6 bg-[#202020] hover:bg-(--brand)/50 transition duration-100 rounded-lg border border-(--brand) none-dragable`}>
      <Image src={imagePath} alt={name} className="w-full rounded-lg block none-dragable" width={150} height={150} />
      <div className="absolute bottom-0 w-full flex justify-center items-center bg-linear-to-t from-black to-transparent p-2 rounded-b-lg">
        <span className="text-white text-sm">{name}</span>
      </div>
      {/* <span>{name}</span> */}
    </Link>
  )
}

export default ProviderLink;