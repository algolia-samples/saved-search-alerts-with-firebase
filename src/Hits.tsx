import React from "react";

import {stl, Tag} from "@algolia/satellite";
import {connectHits} from "react-instantsearch-dom";

// Typing for the hits
interface Flat {
  objectID: string
  city: string
  price: number
  surface: number
  picture: string
  features: string[]
}

const Hit = ({hit}: {hit: Flat}) => (
  <div className={stl`mb-6`}>
    <div
      className={stl`bg-cover w-full h-72`}
      style={{backgroundImage: `url(${hit.picture})`}}
    />
    <h2 className={stl`mt-3 font-semibold`}>
      ${hit.price} - {hit.surface} sq ft
    </h2>
    <p className={stl`mt-2`}>{hit.features.map((feature) =>
      <Tag key={feature} className={stl`mr-1`}>{feature}</Tag>,
    )}</p>
  </div>
);

const Hits = ({hits}: {hits: Flat[]}) => (
  <div className={stl`grid grid-cols-2 gap-6`}>
    {hits.map((hit) => <Hit hit={hit} key={hit.objectID}/>)}
  </div>
);

const connectedHits = connectHits(Hits);

export default connectedHits;
