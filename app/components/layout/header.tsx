"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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

export function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/novels?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between sm:gap-x-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="bg-green-600 text-white p-2 rounded-md mr-2">
              NovelSigh
            </span>
            <span className="hidden sm:inline"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/novels" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Novels
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/updates" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Updates
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <Link href="/popular" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Popular
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/genres" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Genre catalog
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/completed" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Completed novels
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/suggest" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Suggest a novel
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/collections" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Collections
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/search" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Local search engine
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and Login */}
          <div className="flex items-center space-x-2">
            <form
              onSubmit={handleSearch}
              className={`${
                isSearchOpen ? "flex" : "hidden"
              } md:flex items-center`}
            >
              <Input
                type="text"
                placeholder="Simple: super, divine, wasp"
                className="w-full md:w-64 bg-gray-800 text-white border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="ghost" size="icon" type="submit">
                <Search className="h-5 w-5" />
              </Button>
            </form>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent" size="sm">
                    {user?.username || (
                      <div className="flex gap-x-2">
                        <Image
                          className="rounded-full self-center border border-slate-50"
                          width={30}
                          height={30}
                          src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
                          alt="image"
                        />{" "}
                        <div className="self-center font-semibold text-xs">River&#39;</div>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <Link href="/bookmarks">Bookmarks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700">
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="hover:bg-gray-700 text-red-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-slate-600 hover:bg-slate-700" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-4 py-2 hover:bg-gray-800 rounded">
                Home
              </Link>
              <Link
                href="/novels"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Novels
              </Link>
              <Link
                href="/updates"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Updates
              </Link>
              <Link
                href="/popular"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Popular
              </Link>
              <Link
                href="/genres"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Genre catalog
              </Link>
              <Link
                href="/completed"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Completed novels
              </Link>
              <Link
                href="/suggest"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Suggest a novel
              </Link>
              <Link
                href="/collections"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Collections
              </Link>
              <Link
                href="/search"
                className="px-4 py-2 hover:bg-gray-800 rounded"
              >
                Local search engine
              </Link>
              {isLoggedIn && (
                <>
                  <div className="border-t border-gray-700 my-2"></div>
                  <Link
                    href="/profile"
                    className="px-4 py-2 hover:bg-gray-800 rounded"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="px-4 py-2 hover:bg-gray-800 rounded"
                  >
                    Bookmarks
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 hover:bg-gray-800 rounded"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 hover:bg-gray-800 rounded text-red-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
