import React from "react";
import { useForm } from "react-hook-form";
import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from '../../../../src/app/[locale]/components/common/TextArea';

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

describe("TextArea Component", () => {
    it("renders the textarea with placeholder", () => {
        render(
            <TextArea
                name="testTextArea"
                label="Test Label"
                placeholder="Type here"
            />
        );

        const textArea = screen.getByPlaceholderText("Type here");
        expect(textArea).toBeInTheDocument();
    });

    it("renders the label when provided", () => {
        render(
            <TextArea
                name="testTextArea"
                label="Test Label"
                placeholder="Type here"
            />
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("displays error message when error prop is provided", () => {
        render(
            <TextArea
                name="testTextArea"
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
                defaultValues: { testTextArea: "Default value" },
            });

            return (
                <TextArea
                    name="testTextArea"
                    control={control}
                    label="Test Label"
                    placeholder="Type here"
                />
            );
        };

        render(<TestWrapper />);

        const textArea = screen.getByPlaceholderText("Type here");
        expect(textArea).toBeInTheDocument();
        expect(textArea).toHaveValue("Default value");

        fireEvent.change(textArea, { target: { value: "New value" } });
        expect(textArea).toHaveValue("New value");
    });

    it("renders as uncontrolled component when control prop is not provided", () => {
        render(
            <TextArea
                name="testTextArea"
                label="Test Label"
                placeholder="Type here"
            />
        );

        const textArea = screen.getByPlaceholderText("Type here");
        fireEvent.change(textArea, { target: { value: "Uncontrolled value" } });

        expect((textArea as HTMLTextAreaElement).value).toBe("Uncontrolled value");
    });

});
