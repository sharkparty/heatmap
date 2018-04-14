// Interfaces
import { HeatmapData } from '../heatmap/Heatmap';
// Vendor
import { get } from 'lodash';
import * as moment from 'moment';

export interface HeatmapConfig {
    path: string;
    dayKey: string;
    hourKey: string;
    dataKey: string;
    valueKey: string;
    labelKey: string;
}

export const defaultConfig: HeatmapConfig = {
    path: 'default.result',
    dayKey: 'index.dowId',
    hourKey: 'index.hourId',
    dataKey: 'data["Site Incident Heat Severity Map (lv12)"][0]',
    valueKey: 'value',
    labelKey: 'timestamp'
};

export const heatmapDataMapper = (
    payload: {},
    config = defaultConfig
): HeatmapData => {
    const rawData = get(payload, config.path, []);
    let heatmapData: HeatmapData = [];

    for (let event of rawData) {
        // TODO: API seems off here: days should index as an array of days (0-6)
        // Per instructions, I'm not changing that:
        // > Map the day of week from 1-7 to Sunday-Saturday
        const day: string = `${get(event, config.dayKey) - 1}`;
        const hour: number = get(event, config.hourKey);
        const data: string = get(event, config.dataKey);
        const value: number = get(data, config.valueKey);
        const label: string = moment().days(day).hour(hour).format('ddd ha');
        // Assign day
        if (!heatmapData[day]) {
            heatmapData[day] = {};
        }
        // Assign hour and value ONLY where there isn't one
        if (!heatmapData[day][hour]) {
            heatmapData[day][hour] = { value, label };
        } else {
            console.warn('Duplicate entries for hour exist.');
        }
    }
    return heatmapData;
};
