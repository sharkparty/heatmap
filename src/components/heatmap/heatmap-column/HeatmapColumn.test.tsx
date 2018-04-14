// React
import * as React from 'react';
// Vendor
import { shallow } from 'enzyme';
// Search
import { HeatmapColumn } from './HeatmapColumn';

describe('Component: HeatmapColumn', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<HeatmapColumn config={{}} meta={{}} dayData={{}} dayOfWeek={1} />);
        expect(wrapper).toMatchSnapshot();
    });
});
