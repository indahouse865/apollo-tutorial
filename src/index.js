import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks'; 
import ApolloClient from 'apollo-boost';


const defaultState = {
    isEditMode: false,
}

const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage,
}).then(() => {
    const client = new ApolloClient({
        cache,
        uri: 'https://api-useast.graphcms.com/v1/ck294t2s134vc01hi2di9eldf/master',
        clientState: {
          defaults: defaultState,
          resolvers: {}
        }
    });
    
    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById('root'));

    serviceWorker.register();
    
})