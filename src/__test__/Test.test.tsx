import FirstTest from '../Test';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('First Test', () => {
  it('should render the component', () => {
    // Import the component
    const { getByText } = render(<FirstTest />);

    // Check if the component renders correctly
    expect(getByText('First Test')).toBeInTheDocument();
    expect(getByText('This is a test component.')).toBeInTheDocument();
  });
});
