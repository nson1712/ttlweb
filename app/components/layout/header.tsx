"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Home,
  Clock,
  User,
  Tag,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useAuth } from "../../context/auth-context";
// import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { useSearch } from "@/app/context/search-context";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { SettingsPanel } from "../components/setting-panel";

export function Header() {
  const router = useRouter();
  const {
    // user,
    isLoggedIn,
    //  logout
  } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // const [ notifications ] = useState(3);
  const { searchTerm, setSearchTerm } = useSearch();
  const { theme } = useContext(SettingsContext);

  const headerClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900/95 backdrop-blur-md shadow-lg",
    dark: "bg-gray-900/95 text-white backdrop-blur-md shadow-lg",
    sepia: "bg-[#f8f1e3]/95 text-[#5f4b32] backdrop-blur-md shadow-lg",
  };

  const logoGradientMap: Record<Theme, string> = {
    light: "from-gray-900 to-gray-700",
    dark: "from-white to-gray-300",
    sepia: "from-[#5f4b32] to-[#7a6f49]",
  };

  const mobileSearchBg: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  // Bản đồ cho input
  const mobileInputBg: Record<Theme, string> = {
    light: "bg-gray-100 placeholder-gray-500 ring-gray-400",
    dark: "bg-gray-800 placeholder-gray-400 ring-emerald-500",
    sepia: "bg-[#efe2c7] placeholder-[#7a6f49] ring-[#d1b97e]",
  };

  // Bản đồ cho button tìm kiếm
  const mobileBtnBg: Record<Theme, string> = {
    light: "bg-emerald-500 hover:bg-emerald-600 text-white",
    dark: "bg-emerald-400 hover:bg-emerald-500 text-white",
    sepia: "bg-emerald-300 hover:bg-emerald-400 text-white",
  };

  // Bản đồ cho mobile-nav container
  const mobileNavBg: Record<Theme, string> = {
    light: "bg-white border-gray-200",
    dark: "bg-gray-800/50 border-gray-700/50",
    sepia: "bg-[#f8f1e3] border-[#e8d9c0]/50",
  };

  // Bản đồ cho text item
  const mobileNavText: Record<Theme, string> = {
    light: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    dark: "text-gray-200 hover:text-white hover:bg-gray-800/50",
    sepia: "text-[#5f4b32] hover:text-[#7a6f49] hover:bg-[#f8f1e3]/50",
  };

  const desktopInputMap: Record<Theme, string> = {
    light:
      "bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-gray-400",
    dark: "bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:ring-emerald-500",
    sepia:
      "bg-[#efe2c7] text-[#5f4b32] border-[#e8d9c0] placeholder-[#7a6f49] focus:ring-[#d1b97e]",
  };

  // Map màu cho icon chung
  const iconColorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-200",
    sepia: "text-[#5f4b32]",
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/truyen?filter=title%7Clike%7C${searchTerm}`);
      setIsSearchOpen(false);
    }
  };

  // const handleLogout = () => {
  //   logout();
  //   router.push("/");
  // };

  const textColorMap: Record<Theme, { base: string; hover: string }> = {
    light: {
      base: "text-gray-700",
      hover: "hover:bg-gray-100 hover:text-gray-900",
    },
    dark: {
      base: "text-gray-200",
      hover: "hover:bg-gray-800 hover:text-white",
    },
    sepia: {
      base: "text-[#5f4b32]",
      hover: "hover:bg-[#f8f1e3] hover:text-[#7a6f49]",
    },
  };

  const navLinkText = textColorMap[theme ?? "dark"];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? headerClasses[theme ?? "dark"]
          : // khi chưa scroll, bạn có thể chọn gradient riêng cho mỗi theme
          theme === "light"
          ? "bg-white text-gray-900"
          : theme === "dark"
          ? "bg-gradient-to-r from-gray-900/95 to-gray-900 text-white"
          : "bg-gradient-to-r from-[#f8f1e3] to-[#efe2c7] text-[#5f4b32]"
      )}
    >
      {/* Top accent bar */}
      <div
        className={cn(
          "h-1 w-full",
          theme === "light"
            ? "bg-gradient-to-r from-emerald-600 to-cyan-600"
            : theme === "dark"
            ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
            : "bg-gradient-to-r from-emerald-400 to-cyan-400"
        )}
      ></div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex">
            <Image
              className="aspect-[6/5]"
              src="/favicon.ico"
              alt="favicon-ttl"
              width={60}
              height={50}
            />
            <span
              className={cn(
                "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent self-center",
                logoGradientMap[theme ?? "dark"]
              )}
            >
              Tàng Thư Lâu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-gray-800/70",
                        navLinkText.base,
                        navLinkText.hover
                      )}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Trang chủ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/truyen" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-gray-800/70",
                        navLinkText.base,
                        navLinkText.hover
                      )}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Truyện
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/the-loai" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-gray-800/70",
                        navLinkText.base,
                        navLinkText.hover
                      )}
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      Thể loại
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/moi-cap-nhat" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-gray-800/70",
                        navLinkText.base,
                        navLinkText.hover
                      )}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Mới cập nhật
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <Link href="/popular" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
                    )}>
                      <Flame className="w-4 h-4 mr-2" />
                      Nổi bật
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> */}

                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white">
                    <Compass className="w-4 h-4 mr-2" />
                    Khám phá
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-[400px] lg:w-[500px] p-4 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
                        <div className="grid grid-cols-2 gap-3">
                          <ExploreMenuItem 
                            href="/genres" 
                            title="Thể loại" 
                            description="Browse novels by genre categories"
                            icon="📚"
                          />
                          <ExploreMenuItem 
                            href="/completed" 
                            title="Truyện đã hoàn" 
                            description="Finished stories with no waiting"
                            icon="✅"
                          />
                          <ExploreMenuItem 
                            href="/collections" 
                            title="Bộ sưu tập" 
                            description="Curated novel collections and series"
                            icon="📑"
                          />
                          <ExploreMenuItem 
                            href="/suggest" 
                            title="Suggest a Novel" 
                            description="Recommend new titles to our library"
                            icon="💡"
                          />
                          <ExploreMenuItem 
                            href="/search" 
                            title="Advanced Search" 
                            description="Find exactly what you're looking for"
                            icon="🔍"
                            className="col-span-2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch} className="relative group">
                <Input
                  type="text"
                  placeholder="Tìm kiếm truyện..."
                  className={cn(
                    "w-64 rounded-full pl-10 pr-4 py-2 transition-all focus:border-transparent",
                    desktopInputMap[theme ?? "dark"]
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative text-gray-300 hover:text-white hover:bg-gray-800/70"
              onClick={() => {
                setIsSearchOpen((o) => !o);
                setIsMenuOpen(false);
                setIsSettingsOpen(false);
              }}
            >
              <Search
                className={cn(" h-5 w-5 ", iconColorMap[theme ?? "dark"])}
              />
            </Button>

            {/* Notifications */}
            {/* {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative text-gray-300 hover:text-white hover:bg-gray-800/70"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-gray-800 text-white border border-gray-700 rounded-xl shadow-xl p-2"
                >
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <div className="max-h-[300px] overflow-y-auto">
                    <NotificationItem 
                      title="New chapter available"
                      description="Shadow Slave: Chapter 1245 is now available"
                      time="2 hours ago"
                      isNew
                    />
                    <NotificationItem 
                      title="Author update"
                      description="Guiltythree posted a new announcement"
                      time="Yesterday"
                      isNew
                    />
                    <NotificationItem 
                      title="Comment reply"
                      description="Someone replied to your comment on Lord of Mysteries"
                      time="3 days ago"
                      isNew
                    />
                    <NotificationItem 
                      title="System notification"
                      description="Your account settings have been updated"
                      time="1 week ago"
                    />
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <div className="p-2 text-center">
                    <Link href="/notifications" className="text-sm text-emerald-400 hover:text-emerald-300">
                      View all notifications
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )} */}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="hidden sm:flex bg-transparent hover:bg-gray-800/70 pl-2 pr-4 py-1 items-center gap-2 transition-all hover:border-gray-600">
                    <div className="relative">
                      <Image
                        className="rounded-full border-2 border-emerald-500"
                        width={32}
                        height={32}
                        src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
                        alt="User avatar"
                        unoptimized
                      />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-white">
                        River
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-gray-800 text-white border border-gray-700 rounded-xl shadow-xl p-2"
                >
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <Link href="/profile" className="flex-1">
                      Trang cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <Link href="/bookmarks" className="flex-1">
                      Bookmarks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <Link href="/settings" className="flex-1">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-red-900/30 text-red-400 focus:text-red-300"
                    // onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                {/* <Link href="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none">
                    Đăng nhập
                  </Button>
                </Link> */}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-800/70"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMenuOpen((o) => !o);
                setIsSettingsOpen(false);
              }}
            >
              {isMenuOpen ? (
                <X className={cn("h-6 w-6", iconColorMap[theme ?? "dark"])} />
              ) : (
                <Menu
                  className={cn("h-6 w-6", iconColorMap[theme ?? "dark"])}
                />
              )}
            </Button>
          </div>

          <SettingsPanel
            isOpen={isSettingsOpen}
            onToggle={() => {
              setIsSettingsOpen((o) => !o);
              setIsSearchOpen(false);
              setIsMenuOpen(false);
            }}
          />
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              className={cn(
                "absolute top-full inset-x-0 overflow-hidden md:hidden p-4 rounded-lg",
                mobileSearchBg[theme ?? "dark"]
              )}
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm truyện..."
                  className={cn(
                    "w-full rounded-lg pl-10 pr-4 py-2 focus:border-transparent",
                    mobileInputBg[theme ?? "dark"]
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                    theme === "light"
                      ? "text-gray-400"
                      : theme === "dark"
                      ? "text-gray-500"
                      : "text-[#7a6f49]"
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    "absolute right-0.5 top-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 transform -translate-y-1/2 rounded-md h-8 px-3",
                    mobileBtnBg[theme ?? "dark"]
                  )}
                >
                  Tìm kiếm
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              className={cn(
                "absolute inset-x-0 lg:hidden overflow-hidden mt-4 rounded-xl border p-2",
                mobileNavBg[theme ?? "dark"]
              )}
            >
              <nav className="flex flex-col">
                {[
                  {
                    href: "/",
                    icon: <Home className="h-4 w-4" />,
                    label: "Trang chủ",
                  },
                  {
                    href: "/the-loai",
                    icon: <Tag className="h-4 w-4" />,
                    label: "Thể loại",
                  },
                  {
                    href: "/truyen",
                    icon: <BookOpen className="h-4 w-4" />,
                    label: "Truyện",
                  },
                  {
                    href: "/moi-cap-nhat",
                    icon: <Clock className="h-4 w-4" />,
                    label: "Mới cập nhật",
                  },
                ].map(({ href, icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      mobileNavText[theme ?? "dark"]
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
