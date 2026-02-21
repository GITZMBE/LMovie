import { Genre } from "@/src/models";
import { LuDot } from "react-icons/lu";

export function NetflixPreviewCard({
  rating,
  year,
  description,
  imagePath,
  genres = [],
  children,
}: {
  rating: string;
  year: string;
  description: string;
  imagePath: string;
  genres?: Genre[];
  children?: React.ReactNode;
}) {
  return (
    <div className="w-posterWidth-desktop bg-neutral-900 rounded-xl shadow-2xl overflow-hidden text-white">
      <div
        className="relative w-posterWidth-desktop aspect-poster-desktop background-center"
        style={{
          backgroundImage: imagePath ? `url('${process.env.NEXT_PUBLIC_BASE_URL}/t/p/original${imagePath}')` : `url('/images/poster-not-found.png')`,
        }}
      >
        <div className="absolute bottom-0 w-full h-16 bg-linear-to-t from-neutral-900 to-transparent"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">{children}</div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">{year}</span>
          <span className="bg-green-600 px-2 py-1 rounded font-bold">
            {rating}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          {genres?.length && genres.map((genre, i) => (
            <div key={genre.id} className="flex items-center gap-1">
              <span>
                {genre.name}
              </span>
              {i !== genres.length - 1 && <LuDot />}            
            </div>
          ))}
        </div>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default NetflixPreviewCard;