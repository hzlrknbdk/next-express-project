import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import CheckBoxGroup from "../../../../src/app/[locale]/components/common/CheckBoxGroup";

describe("CheckBoxGroup Component", () => {
    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    it("renders all options correctly", () => {
        render(<CheckBoxGroup name="test" label="Test Label" options={options} />);

        expect(screen.getByText("Test Label")).toBeInTheDocument();

        options.forEach((option) => {
            expect(screen.getByLabelText(option.label)).toBeInTheDocument();
        });
    });

    it("handles controlled state correctly", () => {
        const mockOnChange = jest.fn();
        const selectedValues = ["option1", "option2"];

        render(
            <CheckBoxGroup
                name="test"
                label="Test Label"
                options={options}
                selectedValues={selectedValues}
                onChange={mockOnChange}
            />
        );

        const checkbox1 = screen.getByLabelText("Option 1") as HTMLInputElement;
        const checkbox2 = screen.getByLabelText("Option 2") as HTMLInputElement;
        const checkbox3 = screen.getByLabelText("Option 3") as HTMLInputElement;

        expect(checkbox1.checked).toBe(true);
        expect(checkbox2.checked).toBe(true);
        expect(checkbox3.checked).toBe(false);

        fireEvent.click(checkbox3);

        expect(mockOnChange).toHaveBeenCalledWith(["option1", "option2", "option3"]);
    });

    it("displays an error message when required and not selected", async () => {
        const TestForm = () => {
            const { control, handleSubmit } = useForm();

            const onSubmit = jest.fn();

            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CheckBoxGroup
                        name="test"
                        label="Test Label"
                        options={options}
                        control={control}
                        required
                        error="This field is required"
                    />
                    <button type="submit">Submit</button>
                </form>
            );
        };

        render(<TestForm />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => expect(screen.getByText("This field is required")).toBeInTheDocument());
    });

    it("does not call onChange if no value change", () => {
        const mockOnChange = jest.fn();
        const selectedValues = ["option1"];

        render(
            <CheckBoxGroup
                name="test"
                label="Test Label"
                options={options}
                selectedValues={selectedValues}
                onChange={mockOnChange}
            />
        );

        const checkbox1 = screen.getByLabelText("Option 1") as HTMLInputElement;

        fireEvent.click(checkbox1);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
