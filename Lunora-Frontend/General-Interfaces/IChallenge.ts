 export interface IChallenge {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: string;
    iconSet: string;
    progress: number;
    rewardIcon: string;
    rewardSet: string;
    active: boolean;
    coming: boolean;
    exp: number;
    type?: string;
    location?: string;
    createdAt: string;
    updatedAt: string;
  }
  

