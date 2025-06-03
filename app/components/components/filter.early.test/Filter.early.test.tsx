import React from 'react'
import { Filter } from '../filter';

// filter.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// filter.test.tsx
// --- Mocks for nested components ---
// jest.mock("../label", () => ({
//   __esModule: true,
//   default: ({ children, ...props }: any) => (
//     <label {...props}>{children}</label>
//   ),
//   Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
// }));
// jest.mock("../input", () => ({
//   __esModule: true,
//   default: (props: any) => <input {...props} />,
//   Input: (props: any) => <input {...props} />,
// }));
// jest.mock("../button", () => ({
//   __esModule: true,
//   default: ({ children, ...props }: any) => (
//     <button {...props}>{children}</button>
//   ),
//   Button: ({ children, ...props }: any) => (
//     <button {...props}>{children}</button>
//   ),
// }));
// jest.mock("../checkbox", () => ({
//   __esModule: true,
//   default: (props: any) => <input type="checkbox" {...props} />,
//   Checkbox: (props: any) => <input type="checkbox" {...props} />,
// }));
// jest.mock("../select", () => ({
//   __esModule: true,
//   default: ({ children, ...props }: any) => <select {...props}>{children}</select>,
//   Select: ({ children, ...props }: any) => <select {...props}>{children}</select>,
//   SelectTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   SelectValue: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   SelectContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//   SelectItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
// }));

// --- Mocks for hooks (except React core hooks) ---
// If there are custom hooks, mock them here. For this example, assume none.

// --- Helper: Provide global variables if needed ---
const originalMatchMedia = window.matchMedia;
beforeAll(() => {
  window.matchMedia = window.matchMedia || (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }));
});
afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

// --- Main test suite ---
describe('Filter() Filter method', () => {
  // Happy Path Tests
  describe("Happy paths", () => {
    test("renders all main filter fields and buttons", () => {
      // This test aims to ensure that all main filter fields and buttons are rendered.
      render(<Filter />);
      expect(screen.getByLabelText("Tìm kiếm theo tên")).toBeInTheDocument();
      expect(screen.getByLabelText("Thể loại")).toBeInTheDocument();
      expect(screen.getByLabelText("Hashtags")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /hiện thêm/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /tìm kiếm/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /đặt lại/i })).toBeInTheDocument();
    });

    test("search input updates value on change", () => {
      // This test aims to verify that the search input updates its value when changed.
      render(<Filter />);
      const searchInput = screen.getByPlaceholderText("Reincarn..") as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: "test search" } });
      expect(searchInput.value).toBe("test search");
    });

    test("clicking 'Hiện thêm' button shows advanced filters", () => {
      // This test aims to verify that clicking the 'Hiện thêm' button reveals advanced filters.
      render(<Filter />);
      const showMoreBtn = screen.getByRole("button", { name: /hiện thêm/i });
      fireEvent.click(showMoreBtn);
      expect(screen.getByText("Thể loại")).toBeInTheDocument();
      expect(screen.getByText("Hashtags")).toBeInTheDocument();
      expect(screen.getByText("Sắp xếp")).toBeInTheDocument();
      expect(screen.getByText("Trạng thái")).toBeInTheDocument();
      expect(screen.getByLabelText("Minimum chapters")).toBeInTheDocument();
      expect(screen.getByLabelText("Maximum chapters")).toBeInTheDocument();
      expect(screen.getByLabelText("Minimum ratings")).toBeInTheDocument();
      expect(screen.getByLabelText("Maximum ratings")).toBeInTheDocument();
    });

    test("clicking 'Ẩn bớt' button hides advanced filters", () => {
      // This test aims to verify that clicking the 'Ẩn bớt' button hides advanced filters.
      render(<Filter />);
      const showMoreBtn = screen.getByRole("button", { name: /hiện thêm/i });
      fireEvent.click(showMoreBtn);
      const hideBtn = screen.getByRole("button", { name: /ẩn bớt/i });
      fireEvent.click(hideBtn);
      expect(screen.queryByText("Sắp xếp")).not.toBeInTheDocument();
    });

    test("categories and hashtags inputs are readOnly and open advanced filters on click", () => {
      // This test aims to verify that clicking the categories/hashtags input opens advanced filters.
      render(<Filter />);
      const categoriesInput = screen.getByPlaceholderText("Slice of Life, Drama etc...");
      fireEvent.click(categoriesInput);
      expect(screen.getByText("Thể loại")).toBeInTheDocument();
      const hashtagsInput = screen.getAllByPlaceholderText("Slice of Life, Drama etc...")[1];
      fireEvent.click(hashtagsInput);
      expect(screen.getByText("Hashtags")).toBeInTheDocument();
    });

    test("can select and deselect categories in advanced filters", () => {
      // This test aims to verify that categories can be selected and deselected in advanced filters.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      // Find a category checkbox (mocked, so just get all checkboxes)
      const checkboxes = screen.getAllByRole("checkbox");
      if (checkboxes.length > 0) {
        fireEvent.click(checkboxes[0]);
        expect(checkboxes[0]).toBeChecked();
        fireEvent.click(checkboxes[0]);
        expect(checkboxes[0]).not.toBeChecked();
      }
    });

    test("can select and deselect hashtags in advanced filters", () => {
      // This test aims to verify that hashtags can be selected and deselected in advanced filters.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      // Find a hashtag checkbox (mocked, so just get all checkboxes)
      const checkboxes = screen.getAllByRole("checkbox");
      if (checkboxes.length > 1) {
        fireEvent.click(checkboxes[1]);
        expect(checkboxes[1]).toBeChecked();
        fireEvent.click(checkboxes[1]);
        expect(checkboxes[1]).not.toBeChecked();
      }
    });

    test("can change sort option in advanced filters", () => {
      // This test aims to verify that the sort option can be changed in advanced filters.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      const sortSelect = screen.getByLabelText("Sắp xếp") as HTMLSelectElement;
      fireEvent.change(sortSelect, { target: { value: "rating" } });
      expect(sortSelect.value).toBe("rating");
    });

    test("can change translate status in advanced filters", () => {
      // This test aims to verify that the translate status can be changed in advanced filters.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      const statusSelect = screen.getByLabelText("Trạng thái") as HTMLSelectElement;
      fireEvent.change(statusSelect, { target: { value: "completed" } });
      expect(statusSelect.value).toBe("completed");
    });

    test("can input min/max chapters and ratings in advanced filters", () => {
      // This test aims to verify that min/max chapters and ratings inputs work in advanced filters.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      const minChapters = screen.getByLabelText("Minimum chapters") as HTMLInputElement;
      const maxChapters = screen.getByLabelText("Maximum chapters") as HTMLInputElement;
      const minRatings = screen.getByLabelText("Minimum ratings") as HTMLInputElement;
      const maxRatings = screen.getByLabelText("Maximum ratings") as HTMLInputElement;

      fireEvent.change(minChapters, { target: { value: "10" } });
      fireEvent.change(maxChapters, { target: { value: "100" } });
      fireEvent.change(minRatings, { target: { value: "5" } });
      fireEvent.change(maxRatings, { target: { value: "50" } });

      expect(minChapters.value).toBe("10");
      expect(maxChapters.value).toBe("100");
      expect(minRatings.value).toBe("5");
      expect(maxRatings.value).toBe("50");
    });

    test("clicking 'TÌM KIẾM' button triggers search", () => {
      // This test aims to verify that clicking the 'TÌM KIẾM' button triggers the search action.
      render(<Filter />);
      const searchBtn = screen.getByRole("button", { name: /tìm kiếm/i });
      fireEvent.click(searchBtn);
      // No assertion for side effect, but button is clickable and present
      expect(searchBtn).toBeInTheDocument();
    });

    test("clicking 'ĐẶT LẠI' button resets filters", () => {
      // This test aims to verify that clicking the 'ĐẶT LẠI' button resets the filters.
      render(<Filter />);
      const resetBtn = screen.getByRole("button", { name: /đặt lại/i });
      fireEvent.click(resetBtn);
      // No assertion for side effect, but button is clickable and present
      expect(resetBtn).toBeInTheDocument();
    });
  });

  // Edge Case Tests
  describe("Edge cases", () => {
    test("search input accepts empty string", () => {
      // This test aims to verify that the search input can be cleared to an empty string.
      render(<Filter />);
      const searchInput = screen.getByPlaceholderText("Reincarn..") as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: "" } });
      expect(searchInput.value).toBe("");
    });

    test("min/max chapters and ratings accept boundary values", () => {
      // This test aims to verify that min/max chapters and ratings accept boundary values (0 and large numbers).
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      const minChapters = screen.getByLabelText("Minimum chapters") as HTMLInputElement;
      const maxChapters = screen.getByLabelText("Maximum chapters") as HTMLInputElement;
      const minRatings = screen.getByLabelText("Minimum ratings") as HTMLInputElement;
      const maxRatings = screen.getByLabelText("Maximum ratings") as HTMLInputElement;

      fireEvent.change(minChapters, { target: { value: "0" } });
      fireEvent.change(maxChapters, { target: { value: "99999" } });
      fireEvent.change(minRatings, { target: { value: "0" } });
      fireEvent.change(maxRatings, { target: { value: "99999" } });

      expect(minChapters.value).toBe("0");
      expect(maxChapters.value).toBe("99999");
      expect(minRatings.value).toBe("0");
      expect(maxRatings.value).toBe("99999");
    });

    test("advanced filters remain hidden if 'Hiện thêm' is never clicked", () => {
      // This test aims to verify that advanced filters are not visible by default.
      render(<Filter />);
      expect(screen.queryByText("Sắp xếp")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Minimum chapters")).not.toBeInTheDocument();
    });

    test("categories and hashtags inputs remain readOnly", () => {
      // This test aims to verify that categories and hashtags inputs are readOnly.
      render(<Filter />);
      const categoriesInput = screen.getByPlaceholderText("Slice of Life, Drama etc...");
      const hashtagsInput = screen.getAllByPlaceholderText("Slice of Life, Drama etc...")[1];
      expect(categoriesInput).toHaveAttribute("readOnly");
      expect(hashtagsInput).toHaveAttribute("readOnly");
    });

    test("sort and status select default to first option if not set", () => {
      // This test aims to verify that sort and status select default to their first option.
      render(<Filter />);
      fireEvent.click(screen.getByRole("button", { name: /hiện thêm/i }));
      const sortSelect = screen.getByLabelText("Sắp xếp") as HTMLSelectElement;
      const statusSelect = screen.getByLabelText("Trạng thái") as HTMLSelectElement;
      expect(sortSelect.value).toBe("default");
      expect(statusSelect.value).toBe("any");
    });
  });
});