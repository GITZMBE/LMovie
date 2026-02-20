import { Provider, ProviderDto } from "../models";

export const mapProviderDtoToProvider = (dto: ProviderDto): Provider => {
  return {
    displayPiorities: dto.display_priorities,
    displayPriority: dto.display_priority,
    logoPath: dto.logo_path,
    name: dto.provider_name,
    id: dto.provider_id,
  };
};

export const mapProvidersDtoToProviders = (dtos: ProviderDto[]): Provider[] => {
  return dtos.map(mapProviderDtoToProvider);
};
