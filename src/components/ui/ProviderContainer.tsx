import { useState, useEffect } from "react";
import Draggable from "./Draggable";
import { ProviderInternal } from "../../models";
import ProviderLink from "./ProviderLink";

interface Props {
  title: string;
  fetchPath: string;
}

function ProviderContainer({ title, fetchPath }: Props) {
  const [providers, setProviders] = useState<ProviderInternal[]>([]);
  useEffect(() => {
    fetch(fetchPath).then(r => r.json()).then(setProviders);
  }, [fetchPath]);

  return (
    <div className='w-full'>
      <h2 className='font-bold text-3xl'>{title}</h2>
      <Draggable>
        <div className='flex gap-4'>
          {providers.length ? providers.map(({ id, name, imagePath, brandHexColor }) => (
            <ProviderLink
              key={id}
              id={id}
              name={name}
              imagePath={imagePath}
              brandColor={brandHexColor}
            />
          )) : null}
        </div>
      </Draggable>
    </div>
  );
}

export default ProviderContainer;
