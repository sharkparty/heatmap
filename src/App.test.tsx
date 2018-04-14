// React
import * as React from 'react';
// Vendor
import { shallow } from 'enzyme';
// Search
import App from './App';

describe('Component: App', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
