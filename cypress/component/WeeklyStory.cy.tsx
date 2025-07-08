import React from "react";
import {SettingsContext, Theme } from "@/app/context/setting-context";
import { WeeklyStoryPropsType } from "@/app/types/story";
import { mount } from "cypress/react";
import { WeeklyStory } from "@/app/components/components/weekly-story";
import "../../app/globals.css"

const mockStory: WeeklyStoryPropsType["weeklyStory"] = {
  id: "123",
  slug: "mock-truyen",
  title: "Truyện Mock Đặc Sắc",
  rate: 4.5,
  coverImage: "/mock-cover.jpg",
  totalChapter: 69,
  totalView: 1000,
  updatedAt: new Date().toISOString(),
  author: {
    id: 1,
    name: "Tác Giả Mock",
    avatar: "/mock-author-avatar.jpg",
  },
  shortDescription: "Mô tả <strong>mock</strong> của truyện.",
  mainCategories: [{ id: 1, slug: "tien-hiep", name: "Tiên hiệp", image: "/mock-category-tien-hiep.jpg" }],
  categories: [{ id: 2, slug: "hai-huoc", name: "Hài hước", image: "/mock-category-hai-huoc.jpg" }],
};

const render = (theme: Theme = "dark") => {
  mount(
    <SettingsContext.Provider
      value={{
        fontSize: 24,
        setFontSize: () => {},
        paragraphSpacing: 8,
        setParagraphSpacing: () => {},
        theme,
        setTheme: () => {},
      }}
    >
      <WeeklyStory weeklyStory={mockStory} />
    </SettingsContext.Provider>
  );
};

describe("<WeeklyStory />", () => {
  it("hiển thị tiêu đề truyện", () => {
    render();
    cy.contains(mockStory.title).should("exist");
  });

  it("hiển thị tên tác giả", () => {
    render();
    cy.contains(mockStory.author?.name ?? "").should("exist");
  });

  it("hiển thị số chương và ngày cập nhật", () => {
    render();
    cy.contains(`${mockStory.totalChapter} chương`).should("exist");
    cy.contains("Cập nhật:").should("exist");
  });

  it("hiển thị mô tả ngắn", () => {
    render();
    cy.contains("Mô tả mock").should("exist");
  });

  it("hiển thị ảnh cover", () => {
    render();
    cy.get("img").should("have.attr", "src").and("include", mockStory.coverImage);
  });

  it("hiển thị rating", () => {
    render();
    cy.contains(mockStory.rate.toFixed(1)).should("exist");
  });

  it("hiển thị thẻ thể loại", () => {
    render();
    cy.contains("Tiên hiệp").should("exist");
    cy.contains("Hài hước").should("exist");
  });

  it("có nút thông tin truyện và đúng link", () => {
    render();
    cy.get("a[href='/truyen/mock-truyen']").contains("Thông tin truyện").should("exist");
  });

  it("hiển thị đúng giao diện theme: light", () => {
    render("light");
    cy.get("h1").should("have.class", "text-gray-900");
  });

  it("hiển thị đúng giao diện theme: sepia", () => {
    render("sepia");
    cy.get("h1").should("have.class", "text-[#5f4b32]");
  });
});
