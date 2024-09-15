import React, { createContext, ReactNode, useContext } from 'react';
import { CollectionInfo } from '~/lib/types';

type PageWrapperContextValue = {
    collections: CollectionInfo[]
};

export function PageWrapper({children}: {children?: React.ReactNode}) {
  return <>{children}</>
}

const PageWrapperContext = createContext<PageWrapperContextValue | null>(null);
PageWrapper.Provider = function PageWrapperProvider({children, collections}: {children: ReactNode, collections: CollectionInfo[]}) {
    return (
        <PageWrapperContext.Provider
          value={{
            collections
          }}
        >
          {children}
        </PageWrapperContext.Provider>
      );
}

export function useCollections() {
  const wrapper = useContext(PageWrapperContext);
  if (!wrapper) {
    throw new Error('useCollections must be used within an PageWrapperProvider');
  }
  return wrapper.collections;
}
