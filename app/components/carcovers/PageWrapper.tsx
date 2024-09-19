import React, { createContext, ReactNode, useContext } from 'react';
import { CollectionInfo } from '~/lib/types';

type PageWrapperContextValue = {
    breadcrumbs: CollectionInfo[]
};

export function PageWrapper({children}: {children?: React.ReactNode}) {
  return <>{children}</>
}

const PageWrapperContext = createContext<PageWrapperContextValue | null>(null);
PageWrapper.Provider = function PageWrapperProvider({children, data}: {children: ReactNode, data: any}) {
    return (
        <PageWrapperContext.Provider
          value={{
            data
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

