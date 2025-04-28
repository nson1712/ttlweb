"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  User,
  Settings,
  BookOpen,
  Bell,
  Lock,
  Camera,
  Save,
  Moon,
  Sun,
  Check,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [fontStyle, setFontStyle] = useState("sans");
  const [readingDirection, setReadingDirection] = useState("vertical");
  const [autoLoadChapters, setAutoLoadChapters] = useState(true);
  const [newChapterAlerts, setNewChapterAlerts] = useState(true);
  const [authorUpdates, setAuthorUpdates] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [marketingCommunications, setMarketingCommunications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [readingHistoryPrivacy, setReadingHistoryPrivacy] = useState("private");
  const [commentPrivacy, setCommentPrivacy] = useState("public");
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Avid reader of fantasy and sci-fi novels. Always looking for new worlds to explore through books.",
    profileImage: "https://i.pravatar.cc/300",
    socialLinks: {
      twitter: "johndoe",
      instagram: "johndoe_reads",
      goodreads: "johndoe",
    },
  };

  const handleSave = (section: string) => {
    // In a real app, this would save to a database
    setSaveSuccess(section);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3000);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "account",
      label: "Account",
      icon: Settings,
    },
    {
      id: "reading",
      label: "Reading",
      icon: BookOpen,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="mt-2 text-gray-400">
            Manage your profile, preferences, and account settings
          </p>
        </div>

        {/* Settings Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
              <div className="flex flex-col space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    )}
                  >
                    <tab.icon className="mr-2 h-5 w-5" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Profile Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Update your profile information and how others see you on
                    the platform
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Profile Picture
                      </label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full">
                          <Image
                            src={user.profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button className="flex items-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                          <Camera className="mr-2 h-4 w-4" />
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* Display Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={user.name}
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        defaultValue={user.bio}
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        Brief description about yourself. Shown on your profile
                        page.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Social Media Links
                      </label>
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Twitter</span>
                          <div className="relative flex-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              @
                            </span>
                            <input
                              type="text"
                              defaultValue={user.socialLinks.twitter}
                              className="block w-full rounded-lg border border-gray-700 bg-gray-800 pl-8 pr-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            Instagram
                          </span>
                          <div className="relative flex-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              @
                            </span>
                            <input
                              type="text"
                              defaultValue={user.socialLinks.instagram}
                              className="block w-full rounded-lg border border-gray-700 bg-gray-800 pl-8 pr-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            Goodreads
                          </span>
                          <div className="relative flex-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              @
                            </span>
                            <input
                              type="text"
                              defaultValue={user.socialLinks.goodreads}
                              className="block w-full rounded-lg border border-gray-700 bg-gray-800 pl-8 pr-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3">
                      {saveSuccess === "profile" && (
                        <span className="flex items-center text-sm text-emerald-400">
                          <Check className="mr-1 h-4 w-4" />
                          Profile saved successfully
                        </span>
                      )}
                      <button
                        onClick={() => handleSave("profile")}
                        className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeTab === "account" && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Account Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Manage your account credentials and connected services
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user.email}
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Current Password
                        </label>
                      </div>
                      <input
                        type="password"
                        id="current-password"
                        placeholder="••••••••"
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        placeholder="••••••••"
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Connected Accounts */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Connected Accounts
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Connect your accounts for easier sign-in
                      </p>

                      <div className="mt-3 space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-gray-700 p-3">
                          <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-blue-600">G</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">
                                Google
                              </p>
                              <p className="text-xs text-gray-400">
                                Not connected
                              </p>
                            </div>
                          </div>
                          <button className="rounded-lg border border-gray-600 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700">
                            Connect
                          </button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-700 p-3">
                          <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900">
                              <span className="text-white">f</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">
                                Facebook
                              </p>
                              <p className="text-xs text-gray-400">
                                Not connected
                              </p>
                            </div>
                          </div>
                          <button className="rounded-lg border border-gray-600 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700">
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="rounded-lg border border-red-800/30 bg-red-900/10 p-4">
                      <h3 className="text-lg font-medium text-red-400">
                        Delete Account
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Once you delete your account, all of your data will be
                        permanently removed. This action cannot be undone.
                      </p>
                      <button className="mt-3 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30">
                        Delete Account
                      </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3">
                      {saveSuccess === "account" && (
                        <span className="flex items-center text-sm text-emerald-400">
                          <Check className="mr-1 h-4 w-4" />
                          Account settings saved successfully
                        </span>
                      )}
                      <button
                        onClick={() => handleSave("account")}
                        className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reading Preferences */}
              {activeTab === "reading" && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Reading Preferences
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Customize your reading experience
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Theme */}
                    <div>
                      <h3 className="text-lg font-medium text-white">Theme</h3>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => setTheme("light")}
                          className={cn(
                            "flex flex-1 flex-col items-center rounded-lg border p-4 transition-colors",
                            theme === "light"
                              ? "border-emerald-500 bg-emerald-500/10"
                              : "border-gray-700 hover:border-gray-600"
                          )}
                        >
                          <Sun
                            className={cn(
                              "h-8 w-8 mb-2",
                              theme === "light"
                                ? "text-emerald-400"
                                : "text-gray-400"
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm font-medium",
                              theme === "light"
                                ? "text-emerald-400"
                                : "text-gray-300"
                            )}
                          >
                            Light
                          </span>
                        </button>

                        <button
                          onClick={() => setTheme("dark")}
                          className={cn(
                            "flex flex-1 flex-col items-center rounded-lg border p-4 transition-colors",
                            theme === "dark"
                              ? "border-emerald-500 bg-emerald-500/10"
                              : "border-gray-700 hover:border-gray-600"
                          )}
                        >
                          <Moon
                            className={cn(
                              "h-8 w-8 mb-2",
                              theme === "dark"
                                ? "text-emerald-400"
                                : "text-gray-400"
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm font-medium",
                              theme === "dark"
                                ? "text-emerald-400"
                                : "text-gray-300"
                            )}
                          >
                            Dark
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Font Size
                      </h3>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setFontSize(size)}
                            className={cn(
                              "rounded-lg border px-4 py-2 text-center transition-colors",
                              fontSize === size
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                : "border-gray-700 text-gray-300 hover:border-gray-600"
                            )}
                          >
                            <span
                              className={cn(
                                "font-medium",
                                size === "small" && "text-sm",
                                size === "medium" && "text-base",
                                size === "large" && "text-lg"
                              )}
                            >
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Style */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Font Style
                      </h3>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setFontStyle("sans")}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-center transition-colors",
                            fontStyle === "sans"
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-gray-700 text-gray-300 hover:border-gray-600"
                          )}
                        >
                          <span className="font-sans text-base font-medium">
                            Sans Serif
                          </span>
                        </button>

                        <button
                          onClick={() => setFontStyle("serif")}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-center transition-colors",
                            fontStyle === "serif"
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-gray-700 text-gray-300 hover:border-gray-600"
                          )}
                        >
                          <span className="font-serif text-base font-medium">
                            Serif
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Reading Direction */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Reading Direction
                      </h3>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setReadingDirection("vertical")}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-center transition-colors",
                            readingDirection === "vertical"
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-gray-700 text-gray-300 hover:border-gray-600"
                          )}
                        >
                          <span className="text-base font-medium">
                            Vertical Scrolling
                          </span>
                        </button>

                        <button
                          onClick={() => setReadingDirection("horizontal")}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-center transition-colors",
                            readingDirection === "horizontal"
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-gray-700 text-gray-300 hover:border-gray-600"
                          )}
                        >
                          <span className="text-base font-medium">
                            Horizontal Paging
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Auto-load Chapters */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Auto-load Next Chapter
                        </h3>
                        <p className="text-sm text-gray-400">
                          Automatically load the next chapter when you reach the
                          end
                        </p>
                      </div>
                      <button
                        onClick={() => setAutoLoadChapters(!autoLoadChapters)}
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          autoLoadChapters ? "bg-emerald-500" : "bg-gray-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            autoLoadChapters ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3">
                      {saveSuccess === "reading" && (
                        <span className="flex items-center text-sm text-emerald-400">
                          <Check className="mr-1 h-4 w-4" />
                          Reading preferences saved successfully
                        </span>
                      )}
                      <button
                        onClick={() => handleSave("reading")}
                        className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Notification Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Control which notifications you receive
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* New Chapter Alerts */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          New Chapter Alerts
                        </h3>
                        <p className="text-sm text-gray-400">
                          Get notified when new chapters are released for novels
                          you follow
                        </p>
                      </div>
                      <button
                        onClick={() => setNewChapterAlerts(!newChapterAlerts)}
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          newChapterAlerts ? "bg-emerald-500" : "bg-gray-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            newChapterAlerts ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Author Updates */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Author Updates
                        </h3>
                        <p className="text-sm text-gray-400">
                          Get notified about announcements from authors you
                          follow
                        </p>
                      </div>
                      <button
                        onClick={() => setAuthorUpdates(!authorUpdates)}
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          authorUpdates ? "bg-emerald-500" : "bg-gray-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            authorUpdates ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Comment Notifications */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Comment Notifications
                        </h3>
                        <p className="text-sm text-gray-400">
                          Get notified when someone replies to your comments
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setCommentNotifications(!commentNotifications)
                        }
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          commentNotifications
                            ? "bg-emerald-500"
                            : "bg-gray-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            commentNotifications
                              ? "translate-x-5"
                              : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Marketing Communications */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Marketing Communications
                        </h3>
                        <p className="text-sm text-gray-400">
                          Receive emails about new features, promotions, and
                          recommendations
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setMarketingCommunications(!marketingCommunications)
                        }
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          marketingCommunications
                            ? "bg-emerald-500"
                            : "bg-gray-700"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            marketingCommunications
                              ? "translate-x-5"
                              : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3">
                      {saveSuccess === "notifications" && (
                        <span className="flex items-center text-sm text-emerald-400">
                          <Check className="mr-1 h-4 w-4" />
                          Notification settings saved successfully
                        </span>
                      )}
                      <button
                        onClick={() => handleSave("notifications")}
                        className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Privacy Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Control your privacy and what others can see about you
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Profile Visibility
                      </h3>
                      <p className="text-sm text-gray-400">
                        Control who can see your profile
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="profile-public"
                            name="profile-visibility"
                            type="radio"
                            checked={profileVisibility === "public"}
                            onChange={() => setProfileVisibility("public")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="profile-public"
                            className="ml-3 block text-sm text-white"
                          >
                            Public (Anyone can view your profile)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="profile-registered"
                            name="profile-visibility"
                            type="radio"
                            checked={profileVisibility === "registered"}
                            onChange={() => setProfileVisibility("registered")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="profile-registered"
                            className="ml-3 block text-sm text-white"
                          >
                            Registered Users Only (Only registered users can
                            view your profile)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="profile-private"
                            name="profile-visibility"
                            type="radio"
                            checked={profileVisibility === "private"}
                            onChange={() => setProfileVisibility("private")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="profile-private"
                            className="ml-3 block text-sm text-white"
                          >
                            Private (Only you can view your profile)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Reading History Privacy */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Reading History Privacy
                      </h3>
                      <p className="text-sm text-gray-400">
                        Control who can see your reading history
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="history-public"
                            name="history-privacy"
                            type="radio"
                            checked={readingHistoryPrivacy === "public"}
                            onChange={() => setReadingHistoryPrivacy("public")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="history-public"
                            className="ml-3 block text-sm text-white"
                          >
                            Public (Anyone can see what you&#39;ve read)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="history-friends"
                            name="history-privacy"
                            type="radio"
                            checked={readingHistoryPrivacy === "friends"}
                            onChange={() => setReadingHistoryPrivacy("friends")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="history-friends"
                            className="ml-3 block text-sm text-white"
                          >
                            Friends Only (Only your friends can see what
                            you&#39;ve read)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="history-private"
                            name="history-privacy"
                            type="radio"
                            checked={readingHistoryPrivacy === "private"}
                            onChange={() => setReadingHistoryPrivacy("private")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="history-private"
                            className="ml-3 block text-sm text-white"
                          >
                            Private (Only you can see what you&#39;ve read)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Comment Privacy */}
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Comment Privacy
                      </h3>
                      <p className="text-sm text-gray-400">
                        Control who can see your comments
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="comment-public"
                            name="comment-privacy"
                            type="radio"
                            checked={commentPrivacy === "public"}
                            onChange={() => setCommentPrivacy("public")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="comment-public"
                            className="ml-3 block text-sm text-white"
                          >
                            Public (Anyone can see your comments)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="comment-registered"
                            name="comment-privacy"
                            type="radio"
                            checked={commentPrivacy === "registered"}
                            onChange={() => setCommentPrivacy("registered")}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label
                            htmlFor="comment-registered"
                            className="ml-3 block text-sm text-white"
                          >
                            Registered Users Only (Only registered users can see
                            your comments)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3">
                      {saveSuccess === "privacy" && (
                        <span className="flex items-center text-sm text-emerald-400">
                          <Check className="mr-1 h-4 w-4" />
                          Privacy settings saved successfully
                        </span>
                      )}
                      <button
                        onClick={() => handleSave("privacy")}
                        className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
