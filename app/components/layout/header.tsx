"use client";
import React, { useState, useEffect } from "react";
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

export function Header() {
  const router = useRouter();
  const {
    // user,
    isLoggedIn,
    //  logout
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [ notifications ] = useState(3);
  const {searchTerm, setSearchTerm} = useSearch()

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-gray-900 to-gray-800"
      )}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center gap-2">
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-80 animate-pulse-slow"></div>
                <span className="relative z-10 text-xl font-bold text-white px-3 py-2">
                  TTL
                </span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Tàng Thư Lâu
              </span>
            </div>
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
                        "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
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
                        "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
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
                        "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
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
                        "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
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
                  className="w-64 bg-gray-800/70 text-white border-gray-700 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search (Expandable) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden mt-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm truyện..."
                  className="w-full bg-gray-800 text-white border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 rounded-md h-8 px-3"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-2">
                <nav className="flex flex-col">
                  <MobileNavItem href="/" icon={<Home className="h-4 w-4" />}>
                    Trang chủ
                  </MobileNavItem>
                  <MobileNavItem
                    href="/the-loai"
                    icon={<Tag className="h-4 w-4" />}
                  >
                    Thể loại
                  </MobileNavItem>
                  <MobileNavItem
                    href="/truyen"
                    icon={<BookOpen className="h-4 w-4" />}
                  >
                    Truyện
                  </MobileNavItem>
                  <MobileNavItem
                    href="/moi-cap-nhat"
                    icon={<Clock className="h-4 w-4" />}
                  >
                    Mới cập nhật
                  </MobileNavItem>
                  {/* <MobileNavItem href="/login" icon={<User className="h-4 w-4" />}>
                    Đăng nhập
                  </MobileNavItem> */}

                  {/* {isLoggedIn && (
                    <>
                      <MobileNavItem href="/profile" icon={<User className="h-4 w-4" />}>
                        Tài khoản
                      </MobileNavItem>
                      <MobileNavItem href="/bookmarks" icon={<BookOpen className="h-4 w-4" />}>
                        Bookmarks
                      </MobileNavItem>
                      <MobileNavItem href="/settings" icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      }>
                        Settings
                      </MobileNavItem>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-700/50 rounded-lg mt-1 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Đăng xuất
                      </button>
                    </>
                  )} */}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// Helper Components
// function ExploreMenuItem({
//   href,
//   title,
//   description,
//   icon,
//   className
// }: {
//   href: string;
//   title: string;
//   description: string;
//   icon: string;
//   className?: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "block rounded-lg p-3 hover:bg-gray-700/50 transition-colors",
//         className
//       )}
//     >
//       <div className="flex items-start gap-3">
//         <div className="text-2xl">{icon}</div>
//         <div>
//           <div className="font-medium text-white">{title}</div>
//           <div className="text-xs text-gray-400 mt-1">{description}</div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function NotificationItem({
//   title,
//   description,
//   time,
//   isNew = false
// }: {
//   title: string;
//   description: string;
//   time: string;
//   isNew?: boolean;
// }) {
//   return (
//     <div className={cn(
//       "px-2 py-3 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer",
//       isNew && "border-l-2 border-emerald-500 bg-emerald-500/5"
//     )}>
//       <div className="flex justify-between items-start">
//         <div className="font-medium text-sm text-white">{title}</div>
//         <div className="text-xs text-gray-400">{time}</div>
//       </div>
//       <div className="text-xs text-gray-400 mt-1">{description}</div>
//     </div>
//   );
// }

function MobileNavItem({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
