import React from "react";
import { useForm } from "react-hook-form";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectBox from '../../../../src/app/[locale]/components/common/SelectBox';

jest.mock("../../../../src/app/[locale]/components/common/FormField", () => {
    return function MockFormField({
        children,
        label,
        error,
    }: {
        children: React.ReactNode;
        label?: string;
        error?: string;
    }) {
        return (
            <div data-testid="mock-form-field">
                {label && <label>{label}</label>}
                {children}
                {error && <span role="alert">{error}</span>}
            </div>
        );
    };
});

describe("SelectBox Component", () => {
    const mockOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
    ];

    it("renders with placeholder and options", () => {
        render(
            <SelectBox
                name="testSelect"
                options={mockOptions}
                placeholder="Select an option"
            />
        );

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toBeInTheDocument();
        expect(screen.getByText("Select an option")).toBeInTheDocument();
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("renders label if provided", () => {
        render(
            <SelectBox
                name="testSelect"
                label="Test Label"
                options={mockOptions}
                placeholder="Select an option"
            />
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays error message if error prop is provided", () => {
        render(
            <SelectBox
                name="testSelect"
                options={mockOptions}
                error="This is an error message"
            />
        );

        expect(screen.getByRole("alert")).toHaveTextContent(
            "This is an error message"
        );
    });

    it("handles onChange event when provided", () => {
        const handleChange = jest.fn();
        render(
            <SelectBox
                name="testSelect"
                options={mockOptions}
                onChange={handleChange}
            />
        );

        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "option2" } });

        expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("works with react-hook-form Controller when control prop is provided", () => {
        const TestWrapper = () => {
            const { control } = useForm({
                defaultValues: { testSelect: "option1" },
            });

            return (
                <SelectBox
                    name="testSelect"
                    control={control}
                    options={mockOptions}
                    placeholder="Select an option"
                />
            );
        };

        render(<TestWrapper />);

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveValue("option1");

        fireEvent.change(selectElement, { target: { value: "option2" } });
        expect(selectElement).toHaveValue("option2");
    });

    it("renders custom classNames when provided", () => {
        const customClassName = "custom-class";
        render(
            <SelectBox
                name="testSelect"
                options={mockOptions}
                classNames={customClassName}
            />
        );

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toHaveClass(customClassName);
    });
});
