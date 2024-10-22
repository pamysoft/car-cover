import React, { useEffect, useState } from "react";
import { Drawer, useDrawer } from "./Drawer";
import { FALLBACK_HEADER_MENU, HeaderMenu, HeaderProps } from "../unused/Header";
import CloseIcon from "./icons/CloseIcon";
import { PageLayoutProps } from "../PageLayout";
import { NavLink } from "@remix-run/react";

function HamburgerDrawer({
  header,
  isLoggedIn,
  primaryDomainUrl,
  publicStoreDomain
}: {
  header: PageLayoutProps['header'];
  isLoggedIn: Boolean;
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  const { close } = useDrawer();

  return (
    <Drawer type="hamburger">
      <button className="mb-[24px] flex min-h-[52px] w-full items-center justify-center border-none bg-primary text-center font-heading text-[14px] font-medium uppercase text-white" onClick={close}><span className="mr-[5px]">Close</span> <CloseIcon width="16" height="16" /></button>

      <div className="border-b-[1px] border-solid border-border pb-[10px]">
        <MainMenu
          menu={header.menu}
          primaryDomainUrl={primaryDomainUrl}
          publicStoreDomain={publicStoreDomain}
        />
      </div>
      <div className="border-b-[1px] border-solid border-border pb-[10px] pt-[10px]">
        <QuickMenu
          isLoggedIn={isLoggedIn}
          primaryDomainUrl={primaryDomainUrl}
          publicStoreDomain={publicStoreDomain}
        />
      </div>
      <div className="pb-[10px] pt-[10px]">
        <NavLink
          className="block py-[6px] pl-[15px] pr-[48px] font-heading text-[13px] font-medium"
          end
          onClick={closeDrawer}
          prefetch="intent"
          to={'tel:1-800-916-6041'}
        >
          1-800-916-6041
        </NavLink>
      </div>
    </Drawer>
  );
};

export default HamburgerDrawer;

function closeDrawer(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.location.href = event.currentTarget.href;
}

function MainMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  return <>
    {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
      if (!item.url) return null;

      // if the url is internal, we strip the domain
      const url =
        item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
          ? new URL(item.url).pathname
          : item.url;
      return (
        <NavLink
          className="block py-[6px] pl-[15px] pr-[48px] font-heading text-[13px] font-medium"
          end
          key={item.id}
          onClick={closeDrawer}
          prefetch="intent"
          to={url}
        >
          {item.title}
        </NavLink>
      );
    })}
  </>
}


function QuickMenu({
  isLoggedIn,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  isLoggedIn: Boolean;
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  return <>
    {FALLBACK_QUICK_MENU.items.map(item => {
      if (!item.url) return null;

      // if the url is internal, we strip the domain
      const url =
        item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
          ? new URL(item.url).pathname
          : item.url;


      return <NavLink
        key={item.id}
        className="block py-[6px] pl-[15px] pr-[48px] font-heading text-[13px] font-medium"
        end
        onClick={closeDrawer}
        prefetch="intent"
        to={url}
      >
        {item.title}
      </NavLink>
    })}
  </>
}

const FALLBACK_QUICK_MENU = {
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'My account',
      type: 'HTTP',
      url: '/account',
    },
    {
      id: 'gid://shopify/MenuItem/461609500721',
      resourceId: null,
      tags: [],
      title: 'FAQs',
      type: 'HTTP',
      url: '/pages/faq',
    },
    {
      id: 'gid://shopify/MenuItem/461609500722',
      resourceId: null,
      tags: [],
      title: 'Checkout',
      type: 'HTTP',
      url: '/checkout',
    },
    {
      id: 'gid://shopify/MenuItem/461609500723',
      resourceId: null,
      tags: [],
      title: 'Login',
      type: 'HTTP',
      url: '/login',
    },
    {
      id: 'gid://shopify/MenuItem/461609500724',
      resourceId: null,
      tags: [],
      title: 'Contact Us',
      type: 'HTTP',
      url: '/contact-us',
    },
  ]
}