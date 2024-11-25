import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import RadioGroup from "../../../../src/app/[locale]/components/common/RadioGroup";

describe("RadioGroup Component", () => {
    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    it("shows an error message when required and not selected", async () => {
        const TestForm = () => {
            const { control, handleSubmit } = useForm();

            const onSubmit = jest.fn();

            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <RadioGroup
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

        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

});
