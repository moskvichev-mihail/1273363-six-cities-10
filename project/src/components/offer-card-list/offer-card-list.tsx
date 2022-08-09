import React from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../../components/offer-card/offer-card';

type OfferCardListProps = {
  offers: Offer[],
  offerCardType: string,
  onActiveOfferChange: (id: number) => void,
}

function OfferCardList(props: OfferCardListProps): JSX.Element {
  const {offers, offerCardType, onActiveOfferChange} = props;

  return (
    <>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} offerCardType={offerCardType} onActiveOfferChange={onActiveOfferChange}/>)}
    </>
  );
}

export default OfferCardList;
