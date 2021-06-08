import React from "react";

import {
  InstantSearch,
  RefinementList,
  RangeInput,
  Panel,
} from "react-instantsearch-dom";
import {stl} from "@algolia/satellite";

import searchClient from "./searchClient";
import Hits from "./Hits";
import SearchAlerts from "./SearchAlerts";

const App: React.FC = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={String(process.env.REACT_APP_ALGOLIA_INDEX_NAME)}
  >
    <div
      className={stl`max-w-screen-lg mx-auto mt-24 grid grid-cols-3 gap-4`}
    >
      <div>
        <SearchAlerts />
        <Panel header="Surface">
          <RangeInput attribute="surface" defaultRefinement={{min: 100}} />
        </Panel>
        <Panel header="Price">
          <RangeInput
            attribute="price"
            defaultRefinement={{min: 2000, max: 5000}}
          />
        </Panel>
        <Panel header="Amenities">
          <RefinementList
            attribute="features"
            defaultRefinement={["Air Conditioning", "Balcony"]}
          />
        </Panel>
      </div>
      <div className={stl`col-span-2`}>
        <Hits />
      </div>
    </div>
  </InstantSearch>
);

export default App;
