import React from "react";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { mount } from "@cypress/react";
import "../../app/globals.css"; // nếu bạn dùng Tailwind hoặc global CSS
import { SettingsPanel } from "@/app/components/components/setting-panel";

describe("<SettingsPanel />", () => {
  const renderPanel = ({
    isOpen = true,
    fontSize = 24,
    paragraphSpacing = 8,
    theme = "light" as Theme,
    setFontSize = cy.stub(),
    setParagraphSpacing = cy.stub(),
    setTheme = cy.stub(),
    onToggle = cy.stub(),
  } = {}) => {
    mount(
      <SettingsContext.Provider
        value={{
          fontSize,
          setFontSize,
          paragraphSpacing,
          setParagraphSpacing,
          theme,
          setTheme,
        }}
      >
        <SettingsPanel isOpen={isOpen} onToggle={onToggle} />
      </SettingsContext.Provider>
    );
  };

  it("should render when open", () => {
    renderPanel();
    cy.contains("Giao diện:").should("exist");
    cy.contains("Cỡ chữ:").should("exist");
    cy.contains("Khoảng cách dòng:").should("exist");
  });

  it("should not render when closed", () => {
    renderPanel({ isOpen: false });
    cy.contains("Giao diện:").should("not.exist");
  });

  it("should call setTheme when theme button is clicked", () => {
    const setTheme = cy.stub();
    renderPanel({ setTheme });

    // click nút 'dark'
    cy.get("button[aria-label='Tối']").click();
    cy.wrap(setTheme).should("have.been.calledWith", "dark");
  });

  it("should call setFontSize and setParagraphSpacing on slider change", () => {
    const setFontSize = cy.stub();
    const setParagraphSpacing = cy.stub();

    renderPanel({ setFontSize, setParagraphSpacing });

    // Giả định mỗi Slider có role="slider" (nếu bạn dùng @radix-ui/react-slider)
    // Slider đầu là Cỡ chữ, thứ hai là Khoảng cách dòng

    // Focus vào slider Cỡ chữ và nhấn phím để tăng
    cy.contains("Cỡ chữ:")
      .parent()
      .find('[role="slider"]')
      .focus()
      .type("{rightarrow}");
    cy.wrap(setFontSize).should("have.been.called");

    // Focus vào slider Khoảng cách dòng và nhấn phím để tăng
    cy.contains("Khoảng cách dòng:")
      .parent()
      .find('[role="slider"]')
      .focus()
      .type("{rightarrow}");
    cy.wrap(setParagraphSpacing).should("have.been.called");
  });

  it("should close panel when clicking outside", () => {
    const onToggle = cy.stub();
    renderPanel({ onToggle });

    // click ra ngoài (document body)
    cy.get("body").click(0, 0);
    cy.wrap(onToggle).should("have.been.called");
  });
});
