import React, {Fragment, useState} from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../../components/offer-card/offer-card';

type OfferCardListProps = {
  offers: Offer[];
}

function OfferCardList(props: OfferCardListProps): JSX.Element {
  const {offers} = props;
  const [firstOffer] = offers;
  const [activeOffer, setActiveOffer] = useState(firstOffer.id);
  const changeActiveOffer = (id: number) => {
    if (activeOffer !== id) {
      setActiveOffer(id);
    }
  };

  return (
    <Fragment>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} onMouseEnterHandle={() => changeActiveOffer(offer.id)}/>)}
    </Fragment>
  );
}

export default OfferCardList;
