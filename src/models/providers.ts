
export interface ProviderDto {
  display_priorities: {
    [key: string]: number
  },
  display_priority: number,
  logo_path: string,
  provider_name: string,
  provider_id: number
};

export interface Provider {
  displayPiorities: {
    [key: string]: number
  },
  displayPriority: number
  logoPath: string,
  name: string,
  id: number
};

export interface ProviderInternal {
  id: number,
  name: string,
  imagePath: string,
  brandHexColor: string,
};
