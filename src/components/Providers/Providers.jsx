"use client";

import { persistor, store } from '@/redux/store';
import React, { Children } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

const Providers = ({children}) => {
    return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </div>
    );
};

export default Providers;