import { render, screen, fireEvent } from "@testing-library/react";
import ToggleFilterList from '../../../../src/app/[locale]/components/common/ToggleFilterList';

describe("ToggleFilterList", () => {
    const mockOnVisibilityChange = jest.fn();
    const mockList = [
        { header: "Column 1", isVisible: true },
        { header: "Column 2", isVisible: false },
        { header: "Column 3", isVisible: true },
    ];

    it("renders the FunnelIcon", () => {
        render(<ToggleFilterList list={mockList} onVisibilityChange={mockOnVisibilityChange} />);
        const funnelIcon = screen.getByTestId("funnel-icon");
        expect(funnelIcon).toBeInTheDocument();
    });

    it("toggles the dropdown menu when clicking the FunnelIcon", () => {
        render(<ToggleFilterList list={mockList} onVisibilityChange={mockOnVisibilityChange} />);

        expect(screen.queryByRole("list")).not.toBeInTheDocument();

        const funnelIcon = screen.getByTestId("funnel-icon");
        fireEvent.click(funnelIcon);

        expect(screen.getByRole("list")).toBeInTheDocument();

        fireEvent.click(funnelIcon);
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("displays the correct list items with their initial visibility states", () => {
        render(<ToggleFilterList list={mockList} onVisibilityChange={mockOnVisibilityChange} />);

        fireEvent.click(screen.getByTestId("funnel-icon"));

        mockList.forEach((item) => {
            const listItem = screen.getByText(item.header);
            expect(listItem).toBeInTheDocument();

            const checkbox = screen.getByLabelText(item.header);
            expect(checkbox).toBeInTheDocument();

            if (item.isVisible) {
                expect(checkbox).toBeChecked();
            } else {
                expect(checkbox).not.toBeChecked();
            }
        });
    });

    it("updates visibility and calls onVisibilityChange when checkbox is toggled", () => {
        render(<ToggleFilterList list={mockList} onVisibilityChange={mockOnVisibilityChange} />);

        fireEvent.click(screen.getByTestId("funnel-icon"));

        const checkbox = screen.getByLabelText(mockList[1].header);
        fireEvent.click(checkbox);

        expect(mockOnVisibilityChange).toHaveBeenCalledWith(mockList[1].header, true);

        expect(checkbox).toBeChecked();
    });

});
