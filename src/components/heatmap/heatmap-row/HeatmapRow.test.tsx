// React
import * as React from 'react';
// Vendor
import { shallow } from 'enzyme';
// Search
import { HeatmapRow, IntervalData, heatmapRowPropertyMapper } from './HeatmapRow';

describe('Component: HeatmapRow', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
            <HeatmapRow intervalOfTime={1} config={{}} meta={{ range: 1 }} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('renders with meta', () => {
        const wrapper = shallow(
            <HeatmapRow intervalOfTime={1} config={{}} meta={{ min: 1, max: 2, range: 1 }} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    describe('HOC: heatmapRowPropertyMapper', () => {
        let mockIntervalData: IntervalData;
        let mockMeta = { range: 100 };
        beforeEach(() => {
            mockIntervalData = {
                value: 10,
                label: 'Test'
            };
        });

        it('should return a blue class', () => {
            const subject = heatmapRowPropertyMapper({
                meta: mockMeta,
                intervalOfTime: 1,
                intervalData: mockIntervalData,
                config: {}
            });
            expect(subject.className).toBe('blue-10');
            expect(subject.intervalData.label).toBe('Test');
        });
        it('should return a yellow class', () => {
            mockIntervalData.value = 50;
            const subject = heatmapRowPropertyMapper({
                meta: mockMeta,
                intervalOfTime: 1,
                intervalData: mockIntervalData,
                config: {}
            });
            expect(subject.className).toBe('yellow-50');
            expect(subject.intervalData.label).toBe('Test');
        });
        it('should return a red class', () => {
            mockIntervalData.value = 99;
            const subject = heatmapRowPropertyMapper({
                meta: mockMeta,
                intervalOfTime: 1,
                intervalData: mockIntervalData,
                config: {}
            });
            expect(subject.className).toBe('red-99');
            expect(subject.intervalData.label).toBe('Test');
        });
    });
});
