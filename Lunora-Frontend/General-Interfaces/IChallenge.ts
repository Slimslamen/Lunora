 export interface IChallenge {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconSet: string;
    progress: number;
    rewardIcon: string;
    rewardSet: string;
    active: boolean;
    completed: boolean;
    coming: boolean;
    exp: number;
    createdAt: string;
    updatedAt: string;
  }
  