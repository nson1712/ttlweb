// // "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "../../components/ui/navigation-menu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../../components/ui/dropdown-menu";
// import { useAuth } from "../../lib/auth-context";
// import Image from "next/image";

// export function Header() {
//   const router = useRouter();
//   const { user, isLoggedIn, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       router.push(`/novels?search=${encodeURIComponent(searchTerm)}`);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   return (
//     <header className="bg-gray-900 text-white sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between sm:gap-x-4">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold flex items-center">
//             <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-2 rounded-md mr-2">
//               NovelSigh
//             </span>
//             <span className="hidden sm:inline"></span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             <NavigationMenu>
//               <NavigationMenuList>
//                 <NavigationMenuItem>
//                   <Link href="/" legacyBehavior passHref>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                     >
//                       Home
//                     </NavigationMenuLink>
//                   </Link>
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
//                   <Link href="/novels" legacyBehavior passHref>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                     >
//                       Novels
//                     </NavigationMenuLink>
//                   </Link>
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
//                   <Link href="/updates" legacyBehavior passHref>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                     >
//                       Updates
//                     </NavigationMenuLink>
//                   </Link>
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
//                   <NavigationMenuTrigger>More</NavigationMenuTrigger>
//                   <NavigationMenuContent>
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                       <li>
//                         <Link href="/popular" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Popular
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/genres" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Genre catalog
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/completed" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Completed novels
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/suggest" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Suggest a novel
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/collections" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Collections
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/search" legacyBehavior passHref>
//                           <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             Local search engine
//                           </NavigationMenuLink>
//                         </Link>
//                       </li>
//                     </ul>
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Search and Login */}
//           <div className="flex items-center space-x-2">
//             <form
//               onSubmit={handleSearch}
//               className={`${
//                 isSearchOpen ? "flex" : "hidden"
//               } md:flex items-center`}
//             >
//               <Input
//                 type="text"
//                 placeholder="Simple: super, divine, wasp"
//                 className="w-full md:w-64 bg-gray-800 text-white border-gray-700"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Button variant="ghost" size="icon" type="submit">
//                 <Search className="h-5 w-5" />
//               </Button>
//             </form>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//             >
//               <Search className="h-5 w-5" />
//             </Button>

//             {isLoggedIn ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="bg-transparent" size="sm">
//                     {user?.username || (
//                       <div className="flex gap-x-2">
//                         <Image
//                           className="rounded-full self-center border border-slate-50"
//                           width={30}
//                           height={30}
//                           src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
//                           alt="image"
//                         />{" "}
//                         <div className="self-center font-semibold text-xs">River&#39;</div>
//                       </div>
//                     )}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className="bg-gray-800 text-white border-gray-700"
//                 >
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator className="bg-gray-700" />
//                   <DropdownMenuItem className="hover:bg-gray-700">
//                     <Link href="/profile">Profile</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-gray-700">
//                     <Link href="/bookmarks">Bookmarks</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-gray-700">
//                     <Link href="/settings">Settings</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator className="bg-gray-700" />
//                   <DropdownMenuItem
//                     className="hover:bg-gray-700 text-red-400"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link href="/login">
//                 <Button className="bg-slate-600 hover:bg-slate-700" size="sm">
//                   Login
//                 </Button>
//               </Link>
//             )}

//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={
//                     isMenuOpen
//                       ? "M6 18L18 6M6 6l12 12"
//                       : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4">
//             <nav className="flex flex-col space-y-2">
//               <Link href="/" className="px-4 py-2 hover:bg-gray-800 rounded">
//                 Home
//               </Link>
//               <Link
//                 href="/novels"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Novels
//               </Link>
//               <Link
//                 href="/updates"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Updates
//               </Link>
//               <Link
//                 href="/popular"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Popular
//               </Link>
//               <Link
//                 href="/genres"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Genre catalog
//               </Link>
//               <Link
//                 href="/completed"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Completed novels
//               </Link>
//               <Link
//                 href="/suggest"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Suggest a novel
//               </Link>
//               <Link
//                 href="/collections"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Collections
//               </Link>
//               <Link
//                 href="/search"
//                 className="px-4 py-2 hover:bg-gray-800 rounded"
//               >
//                 Local search engine
//               </Link>
//               {isLoggedIn && (
//                 <>
//                   <div className="border-t border-gray-700 my-2"></div>
//                   <Link
//                     href="/profile"
//                     className="px-4 py-2 hover:bg-gray-800 rounded"
//                   >
//                     Profile
//                   </Link>
//                   <Link
//                     href="/bookmarks"
//                     className="px-4 py-2 hover:bg-gray-800 rounded"
//                   >
//                     Bookmarks
//                   </Link>
//                   <Link
//                     href="/settings"
//                     className="px-4 py-2 hover:bg-gray-800 rounded"
//                   >
//                     Settings
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="text-left px-4 py-2 hover:bg-gray-800 rounded text-red-400"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, Bell, BookOpen, Home, Clock, Flame, Compass, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useAuth } from "../../lib/auth-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  console.log("USER: ", user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [ notifications ] = useState(3); // Mock notification count

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
      router.push(`/novels?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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
                <span className="relative z-10 text-xl font-bold text-white px-3 py-2">NS</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NovelSigh
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
                    )}>
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/novels" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
                    )}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Novels
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/updates" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
                    )}>
                      <Clock className="w-4 h-4 mr-2" />
                      Updates
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/popular" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white"
                    )}>
                      <Flame className="w-4 h-4 mr-2" />
                      Popular
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800/70 text-gray-200 hover:text-white">
                    <Compass className="w-4 h-4 mr-2" />
                    Explore
                    <ChevronDown className="h-4 w-4 ml-1" />
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
                            title="Genre Catalog" 
                            description="Browse novels by genre categories"
                            icon="📚"
                          />
                          <ExploreMenuItem 
                            href="/completed" 
                            title="Completed Novels" 
                            description="Finished stories with no waiting"
                            icon="✅"
                          />
                          <ExploreMenuItem 
                            href="/collections" 
                            title="Collections" 
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
                </NavigationMenuItem>
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
                  placeholder="Search novels..."
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
            {isLoggedIn && (
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
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button className="hidden sm:flex bg-transparent hover:bg-gray-800/70 pl-2 pr-4 py-1 items-center gap-2 transition-all hover:border-gray-600">
                    <div className="relative">
                      <Image
                        className="rounded-full border-2 border-emerald-500"
                        width={32}
                        height={32}
                        src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
                        alt="User avatar"
                      />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-white">River</span>
                      <span className="text-xs text-gray-400">Premium</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-gray-800 text-white border border-gray-700 rounded-xl shadow-xl p-2"
                >
                  <div className="px-2 py-1.5 mb-1">
                    <div className="font-medium text-white">My Account</div>
                    <div className="text-xs text-gray-400">Manage your account settings</div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <Link href="/profile" className="flex-1">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <Link href="/bookmarks" className="flex-1">Bookmarks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg focus:bg-gray-700 focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <Link href="/settings" className="flex-1">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-red-900/30 text-red-400 focus:text-red-300"
                    onClick={handleLogout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none">
                    Login
                  </Button>
                </Link>
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
                  placeholder="Search novels..."
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
                  Search
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
                    Home
                  </MobileNavItem>
                  <MobileNavItem href="/novels" icon={<BookOpen className="h-4 w-4" />}>
                    Novels
                  </MobileNavItem>
                  <MobileNavItem href="/updates" icon={<Clock className="h-4 w-4" />}>
                    Updates
                  </MobileNavItem>
                  <MobileNavItem href="/popular" icon={<Flame className="h-4 w-4" />}>
                    Popular
                  </MobileNavItem>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-2">
                    EXPLORE
                  </div>
                  
                  <MobileNavItem href="/genres" icon={<span className="text-lg">📚</span>}>
                    Genre Catalog
                  </MobileNavItem>
                  <MobileNavItem href="/completed" icon={<span className="text-lg">✅</span>}>
                    Completed Novels
                  </MobileNavItem>
                  <MobileNavItem href="/collections" icon={<span className="text-lg">📑</span>}>
                    Collections
                  </MobileNavItem>
                  <MobileNavItem href="/suggest" icon={<span className="text-lg">💡</span>}>
                    Suggest a Novel
                  </MobileNavItem>
                  <MobileNavItem href="/search" icon={<span className="text-lg">🔍</span>}>
                    Advanced Search
                  </MobileNavItem>
                  
                  {isLoggedIn && (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-2">
                        ACCOUNT
                      </div>
                      <MobileNavItem href="/profile" icon={<User className="h-4 w-4" />}>
                        Profile
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
                        Logout
                      </button>
                    </>
                  )}
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
function ExploreMenuItem({ 
  href, 
  title, 
  description, 
  icon, 
  className 
}: { 
  href: string; 
  title: string; 
  description: string; 
  icon: string;
  className?: string;
}) {
  return (
    <Link 
      href={href} 
      className={cn(
        "block rounded-lg p-3 hover:bg-gray-700/50 transition-colors",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-medium text-white">{title}</div>
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        </div>
      </div>
    </Link>
  );
}

function NotificationItem({ 
  title, 
  description, 
  time, 
  isNew = false 
}: { 
  title: string; 
  description: string; 
  time: string; 
  isNew?: boolean;
}) {
  return (
    <div className={cn(
      "px-2 py-3 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer",
      isNew && "border-l-2 border-emerald-500 bg-emerald-500/5"
    )}>
      <div className="flex justify-between items-start">
        <div className="font-medium text-sm text-white">{title}</div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
      <div className="text-xs text-gray-400 mt-1">{description}</div>
    </div>
  );
}

function MobileNavItem({ 
  href, 
  children, 
  icon 
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

