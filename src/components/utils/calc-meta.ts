// Interface
import { HeatmapDataMeta } from '../heatmap/Heatmap';

/**
 * @param {{}} data
 * @returns { HeatmapDataMeta }
 */
export const calcMeta = (data: {}): HeatmapDataMeta => {
    let min: number = 0;
    let max: number = 0;
    const keys = Object.keys(data);
    for (const key of keys) {
        const innerKeys = Object.keys(data[key]);
        for (let item of innerKeys) {
            const { value } = data[key][item];
            if (value > max) {
                max = value;
            }
            if (value < min) {
                min = value;
            }
        }
    }
    return { min, max, range: max - min };
};
