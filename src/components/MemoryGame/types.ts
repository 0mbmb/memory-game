export interface ICard {
  emoji: string;
  isGuessed: boolean;
  isPicked: boolean;
}

export enum IGameMode {
  NORMAL = "normal",
  HARDCORE = "hardcore",
}
