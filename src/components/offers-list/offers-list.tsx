import { memo } from 'react';
import { Offer } from '../../types/offer';
import { Card } from '../card/card';

type OffersListProps = {
  offers: Offer[];
  setActiveOfferId: (id: string | null) => void;
  isNearby?: boolean;
}

function OffersListComponent({ offers, setActiveOfferId, isNearby = false }: OffersListProps) {
  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  const containerName = isNearby ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={containerName}>
      {offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export const OffersList = memo(OffersListComponent);
