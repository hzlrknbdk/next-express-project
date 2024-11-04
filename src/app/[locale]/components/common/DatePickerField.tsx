import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface DatePickerProps {
    name: string;
    control?: any;
    label: string;
    type?: string;
    placeholderText?: string;
    error?: string;
    required?: boolean;
}

const DatePickerField: React.FC<DatePickerProps> = ({
    name,
    control,
    label,
    placeholderText,
    error,
    required,
}) => {
    const classNames = `mt-1 block w-50 p-3 border ${error ? "border-red-500" : "border-gray-300"
        } sm:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            id={name}
                            selected={field.value}
                            placeholderText={placeholderText}
                            className={classNames}
                            dateFormat="Pp"
                            showTimeSelect
                        />
                    )}
                />
            ) : (
                <DatePicker
                    id={name}
                    placeholderText={placeholderText}
                    className={classNames}
                    dateFormat="Pp"
                    showTimeSelect
                />
            )}
        </FormField>
    );
};

export default DatePickerField;
