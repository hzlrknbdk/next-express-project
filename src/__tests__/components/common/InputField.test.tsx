import React from "react";
import { useForm } from "react-hook-form";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from '../../../../src/app/[locale]/components/common/InputField';


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

describe("InputField Component", () => {
    it("renders the input with placeholder", () => {
        render(
            <InputField
                name="testInput"
                label="Test Label"
                placeholder="Type here"
            />
        );

        const input = screen.getByPlaceholderText("Type here");
        expect(input).toBeInTheDocument();
    });

    it("renders the label when provided", () => {
        render(
            <InputField
                name="testInput"
                label="Test Label"
                placeholder="Type here"
            />
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays error message when error prop is provided", () => {
        render(
            <InputField
                name="testInput"
                label="Test Label"
                placeholder="Type here"
                error="This is an error message"
            />
        );

        expect(screen.getByRole("alert")).toHaveTextContent(
            "This is an error message"
        );
    });

    it("renders as controlled component when control prop is provided", () => {
        const TestWrapper = () => {
            const { control } = useForm({
                defaultValues: { testInput: "Default value" },
            });

            return (
                <InputField
                    name="testInput"
                    control={control}
                    label="Test Label"
                    placeholder="Type here"
                />
            );
        };

        render(<TestWrapper />);

        const input = screen.getByPlaceholderText("Type here");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("Default value");

        fireEvent.change(input, { target: { value: "New value" } });
        expect(input).toHaveValue("New value");
    });

    it("renders as uncontrolled component when control prop is not provided", () => {
        render(
            <InputField
                name="testInput"
                label="Test Label"
                placeholder="Type here"
            />
        );

        const input = screen.getByPlaceholderText("Type here");
        fireEvent.change(input, { target: { value: "Uncontrolled value" } });

        expect((input as HTMLInputElement).value).toBe("Uncontrolled value");
    });

    it("executes onChange handler when provided", () => {
        const handleChange = jest.fn();
        render(
            <InputField
                name="testInput"
                label="Test Label"
                placeholder="Type here"
                onChange={handleChange}
            />
        );

        const input = screen.getByPlaceholderText("Type here");
        fireEvent.change(input, { target: { value: "New value" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith("New value");
    });
});
