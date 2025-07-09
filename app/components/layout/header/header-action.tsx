"use client";
import React, { useState, useEffect } from "react";
import { SearchToggle } from "./search-toggle";
import { UserMenu } from "./user-menu";
import { MobileMenuToggle } from "./mobile-menu-toggle";
import { DesktopSearch } from "./desktop-search";
import { SettingsPanel } from "../../components/setting-panel";
import { Theme, UserProfile } from ".";
import { UserAvatar } from "./user-avatar";

interface HeaderActionsProps {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  theme: keyof Theme;
}

declare global {
  interface WindowEventMap {
    searchToggle: CustomEvent<{ isOpen: boolean }>;
    menuToggle: CustomEvent<{ isOpen: boolean }>;
  }
}

export function HeaderActions({
  isLoggedIn,
  userProfile,
  theme,
}: HeaderActionsProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const searchEvent = new CustomEvent("searchToggle", {
      detail: { isOpen: isSearchOpen },
    });
    window.dispatchEvent(searchEvent);
  }, [isSearchOpen]);

  useEffect(() => {
    const menuEvent = new CustomEvent("menuToggle", {
      detail: { isOpen: isMenuOpen },
    });
    window.dispatchEvent(menuEvent);
  }, [isMenuOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsSettingsOpen(false);
  };

  const handleMenuToggle = () => {
    setIsSearchOpen(false);
    setIsMenuOpen(!isMenuOpen);
    setIsSettingsOpen(false);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        <DesktopSearch theme={theme} />

        <SearchToggle theme={theme} onToggle={handleSearchToggle} />

        <UserMenu
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          theme={theme}
        />

        <MobileMenuToggle
          theme={theme}
          onToggle={handleMenuToggle}
          isOpen={isMenuOpen}
          closeMenu={closeMenu}
        />

        {isLoggedIn && userProfile && (
          <UserAvatar
            avatar={userProfile?.avatar}
            displayName={userProfile?.displayName}
          />
        )}
      </div>

      <SettingsPanel isOpen={isSettingsOpen} onToggle={handleSettingsToggle} />
    </>
  );
}
