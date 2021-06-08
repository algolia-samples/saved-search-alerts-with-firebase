import React, {useState, useCallback} from "react";

import {Button, Modal, Input, stl} from "@algolia/satellite";
import {connectStateResults, CurrentRefinements} from "react-instantsearch-dom";
import {Bell, Mail, Phone} from "react-feather";
import algoliaHelper, {SearchResults} from "algoliasearch-helper";

import db from "./db";
import searchClient from "./searchClient";

// Transform the current search state (query and facets) to a string.
const serializeSearchState = (searchResults: SearchResults): null|string => {
  const state = searchResults && searchResults._state;
  if (!state) {
    return null;
  }
  const helper = algoliaHelper(searchClient, state.index, state);
  const rawQuery = helper.getQuery();
  return JSON.stringify(rawQuery);
};

const SearchAlerts = ({searchResults}: {searchResults: SearchResults}) => {
  const [modalShown, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const toggleModal = useCallback(() => {
    setModal((v) => !v);
  }, []);

  // Save the serialized search state to the Firebase database,
  // with the email / phone of the customer.
  const saveSearch = () => {
    const query = serializeSearchState(searchResults);
    db.collection("alerts").doc().set({
      email,
      phone,
      query,
    })
        .then(() => {
          console.log("Query successfully saved!");
        })
        .catch((error) => {
          console.error("Error saving query: ", error);
        });
  };

  return (
    <div className={stl`flex flex-col w-full mb-6`}>
      <Button
        variant="primary"
        startIcon={Bell}
        onClick={() => toggleModal()}
      >
        Alert me!
      </Button>
      <Modal
        open={modalShown}
        onDismiss={() => toggleModal()}
        title="Don't miss anything!"
      >
        <div className={stl`mb-6`}>
          <CurrentRefinements />
        </div>
        <div className={stl`mb-6`}>
          <Input
            placeholder="Email"
            type="email"
            startIcon={Mail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={stl`mb-6`}>
          <Input
            placeholder="Phone"
            startIcon={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={stl`flex flex-col w-full`}>
          <Button
            variant="primary"
            onClick={() => saveSearch()}
            disabled={!email && !phone}
          >
            Be notified about new results matching your criteria!
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const ConnectedSearchAlerts = connectStateResults(SearchAlerts);

export default ConnectedSearchAlerts;
