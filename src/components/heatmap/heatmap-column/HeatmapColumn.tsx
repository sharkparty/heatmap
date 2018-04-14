// React
import * as React from 'react';
// Vendor
import * as moment from 'moment';
// Components
import HeatmapRow from '../heatmap-row/HeatmapRow';
// Interfaces
import { hoursInDay } from '../Heatmap';
// Assets
import './HeatmapColumn.css';

export interface HeatmapColumnParams {
    dayOfWeek: number | string;
    config: {};
    meta: { range: number; };
    dayData?: {};
}

export const HeatmapColumn: React.SFC<HeatmapColumnParams> = ({
    dayOfWeek,
    dayData = [],
    config,
    meta
}) => {
    return (
        <div title={moment().day(dayOfWeek).format('dddd')} className="heatmap-column">
            {hoursInDay.map((hour) => (
                <HeatmapRow
                    key={hour}
                    config={config}
                    intervalOfTime={hour}
                    intervalData={dayData[hour]}
                    meta={meta}
                />
            ))}
            <div className="row-key">
                {moment().day(dayOfWeek).format('ddd')}
            </div>
        </div>
    );
};
