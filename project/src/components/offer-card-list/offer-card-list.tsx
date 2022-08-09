import React, {Fragment} from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../../components/offer-card/offer-card';

type OfferCardListProps = {
  offers: Offer[];
  setActiveOffer: (id: number) => void;
}

function OfferCardList(props: OfferCardListProps): JSX.Element {
  const {offers, setActiveOffer} = props;

  return (
    <Fragment>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} setActiveOffer={setActiveOffer}/>)}
    </Fragment>
  );
}

export default OfferCardList;
