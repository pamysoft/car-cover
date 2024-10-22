import { useLocation } from '@remix-run/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { detectCategory, stripSlashes } from '~/lib/functions';
import { CollectionInfo } from '~/lib/types';

export enum CategoryType {
  CarCovers = 'car-covers',
  CarCoversChildren = 'car-covers-children',
  RvCovers = 'rv-covers',
  RvCoversChildren = 'rv-covers-children',
  ScootersCovers = 'rv-covers',
}

type PageWrapperContextValue = {
  breadcrumbs: CollectionInfo[],
  proxyUrl: string,
  serverUrl: string,
  category: CategoryType,
};

export function PageWrapper({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}


const PageWrapperContext = createContext<PageWrapperContextValue | null>(null);
PageWrapper.Provider = function PageWrapperProvider({ children, data }: { children: ReactNode, data: PageWrapperContextValue }) {
  const location = useLocation()

  const [customData, setCustomData] = useState<PageWrapperContextValue>(data)
  useEffect(() => {
    const category = detectCategory(location.pathname)   
    setCustomData({...customData, category: category})
  }, [location.pathname])

  return (
    <PageWrapperContext.Provider
      value={
        customData
      }
    >
      {children}
    </PageWrapperContext.Provider>
  );
}

export function useProxyUrl() {
  const wrapper = useContext(PageWrapperContext);
  if (!wrapper) {
    throw new Error('useProxyUrl must be used within an PageWrapperProvider');
  }
  return wrapper.proxyUrl;
}

export function useServerUrl() {
  const wrapper = useContext(PageWrapperContext);
  if (!wrapper) {
    throw new Error('useServerUrl must be used within an PageWrapperProvider');
  }
  return wrapper.serverUrl;
}

export function useCategory() {
  const wrapper = useContext(PageWrapperContext);
  if (!wrapper) {
    throw new Error('useServerUrl must be used within an PageWrapperProvider');
  }
  return wrapper.category;
}
