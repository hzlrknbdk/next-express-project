import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import FormField from './FormField';

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
    required
}) => {

    const classNames = `mt-1 block w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`

    return (
        <div className="mb-6">
            <FormField name={name} label={label} error={error} required={required} >
                {
                    control ? (
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
                                />
                            )}
                        />
                    ) : (
                        <DatePicker
                            id={name}
                            placeholderText={placeholderText}
                            className={classNames}
                        />
                    )
                }
            </FormField>

        </div>
    );
};

export default DatePickerField;
