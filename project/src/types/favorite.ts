export type Favorite = {
  offerId: number,
  isFavorite: boolean
  onSuccess?: (isFavorite: boolean) => void
};
