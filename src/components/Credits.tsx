import { useEffect, useState } from "react";
import { fetchCredits } from "../api/fetch";
import { VideoType } from "../models";
import { Cast } from "../models/credit";
import Link from "next/link";
import Draggable from "@/src/components/ui/Draggable";

interface Props {
  id: number;
  type: VideoType;
}

const FALLBACK_AVATAR = "/images/no-avatar.png"; // local fallback — put a placeholder in /public

function Credits({ id, type = "movie" }: Props) {
  const [cast, setCast] = useState<Cast[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL + "/t/p/w780";

  useEffect(() => {
    fetchCredits(id, type).then(credits => setCast(credits.cast));
  }, [id, type]);

  if (!cast.length) return null;

  return (
    <section id="credits" className="w-full space-y-3">
      <h2 className="text-xl font-bold">Cast</h2>

      <Draggable>
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex gap-3">
            {cast.map((person, index) => (
              <Link
                href={`/person/${person.id}`}
                key={person.id ?? index}
                className="flex w-28 shrink-0 flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-white/5"
              >
                <img
                  src={person.profilePath ? baseUrl + person.profilePath : FALLBACK_AVATAR}
                  className="aspect-square w-full rounded-full object-cover"
                  alt={person.name ?? "Cast member"}
                />
                <div className="w-full text-center">
                  <p className="truncate text-xs font-medium text-white/90">{person.name}</p>
                  <p className="truncate text-xs text-white/40">{person.character}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Draggable>
    </section>
  );
}

export default Credits;