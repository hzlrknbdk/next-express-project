import { render, screen } from '@testing-library/react';
import FormField from '../../../../src/app/[locale]/components/common/FormField';

describe('FormField Component', () => {

    it('renders the label correctly', () => {
        render(
            <FormField name="testField" label="Test Label">
                <input id="testField" />
            </FormField>
        );

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('displays the required indicator when the field is required', () => {
        render(
            <FormField name="testField" label="Test Label" required>
                <input />
            </FormField>
        );

        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('displays an error message if error prop is provided', () => {
        render(
            <FormField name="testField" label="Test Label" error="This field is required">
                <input />
            </FormField>
        );

        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <FormField name="testField" label="Test Label">
                <input data-testid="child-input" />
            </FormField>
        );

        expect(screen.getByTestId('child-input')).toBeInTheDocument();
    });
});
