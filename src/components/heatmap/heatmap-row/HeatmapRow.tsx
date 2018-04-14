// React
import * as React from 'react';
// Vendor
import * as moment from 'moment';
import * as classnames from 'classnames';
import { compose, withProps, ComponentEnhancer } from 'recompose';
// Assets
import './HeatmapRow.css';

export interface HeatmapRowParams {
    intervalOfTime: number;
    config: {};
    meta: {
        min?: number;
        max?: number;
        range: number;
    };
    label?: string;
    intervalData?: IntervalData;
    className?: string;
}

export interface IntervalData {
    value: number;
    label: string;
}

const defaultIntervalData: IntervalData = {
    value: 0,
    label: 'No data'
};
/**
 *
 * @param {number} range
 * @param {number} intervalOfTime
 * @param {IntervalData} intervalData
 * @returns [{ intervalOfTime: number; intervalData; label: string; className: string }]
 */
export const heatmapRowPropertyMapper = ({
    meta: { range },
    intervalOfTime,
    intervalData = defaultIntervalData
}: HeatmapRowParams) => {
    const { value }: IntervalData = intervalData;
    const label: string = `${moment().hour(intervalOfTime).format('ha')}: ${value || ''}`;
    const scaledValue: number = range ? Math.round((value / range) * 100) : value;
    let className: string = '';

    if (scaledValue === 0) {
        className = 'empty';
    } else if (scaledValue < 33.3) {
        className = `blue-${scaledValue}`;
    } else if (scaledValue < 66.6) {
        className = `yellow-${scaledValue}`;
    } else if (scaledValue > 66.6) {
        className = `red-${scaledValue}`;
    }

    return {
        intervalOfTime,
        intervalData,
        label,
        className
    };
};

export const enhance: ComponentEnhancer<{}, HeatmapRowParams> = compose(
    withProps(heatmapRowPropertyMapper)
);

/**
 * @param {number} intervalOfTime
 * @param {IntervalData} intervalData
 * @param {string} label
 * @param {string} className
 * @returns {any}
 * @constructor
 */
export const HeatmapRow: React.SFC<HeatmapRowParams> = ({
    intervalOfTime,
    intervalData,
    label,
    className
}) => {
    return (
        <div
            aria-label={label}
            title={label}
            className={classnames('heatmap-row', className)}
        />
    );
};

export default enhance(HeatmapRow);
