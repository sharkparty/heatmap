// React
import * as React from 'react';
// Vendor
import * as moment from 'moment';
// Components
import { HeatmapColumn } from './heatmap-column/HeatmapColumn';
// Utils
import { calcMeta } from '../utils';
// Assets
import './Heatmap.css';

export interface HeatmapParams {
    data: HeatmapData;
    config?: HeatmapConfiguration;
}

export interface HeatmapConfiguration {
    threshold?: number;
}

export interface HeatmapData {
    [day: number]: {
        [hour: number]: { value?: number | string; label?: number | string; }
    };
}

export interface HeatmapDataMeta {
    min: number;
    max: number;
    range: number;
}
export const hoursInDay: Array<number> = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
];
const daysOfWeek: Array<number> = [0, 1, 2, 3, 4, 5, 6];
// TODO: Could be `Object.keys(data)` in order to optimize for flexible axises

export const Heatmap: React.SFC<HeatmapParams> = ({
    data,
    config = {}
}) => {
    const meta: HeatmapDataMeta = calcMeta(data);
    return (
        <div className="heatmap-container">
            <aside className="keys-container">
                {hoursInDay.map(hour => (
                    <div key={hour} className="heatmap-key">
                        {moment().hours(hour).format('ha')}
                    </div>
                ))}
            </aside>
            <div className="columns-container">
                {daysOfWeek.map((dayOfWeek: number | string) => (
                    <HeatmapColumn
                        config={config}
                        meta={meta}
                        dayOfWeek={dayOfWeek}
                        dayData={data[dayOfWeek]}
                        key={dayOfWeek}
                    />
                ))}
            </div>
        </div>
    );
};
