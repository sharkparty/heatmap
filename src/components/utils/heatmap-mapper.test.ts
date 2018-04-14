// Vendor
import * as moment from 'moment';
import { get } from 'lodash';
// Util
import { heatmapDataMapper, defaultConfig } from './heatmap-mapper';

describe('Util: heatmapDataMapper', () => {
    it('renders without crashing', () => {
        const mockData = {
            error: 0,
            processingTimeMs: 400,
            result: [
                {
                    index: {
                        dowId: 1,
                        hourId: 0
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 10,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                },
                {
                    index: {
                        dowId: 1,
                        hourId: 10
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 110,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                },
                {
                    index: {
                        dowId: 1,
                        hourId: 11
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 410,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                },
                {
                    index: {
                        dowId: 1,
                        hourId: 12
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 20,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                },
                {
                    index: {
                        dowId: 1,
                        hourId: 13
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 10,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                },
                {
                    index: {
                        dowId: 1,
                        hourId: 14
                    },
                    data: {
                        'Site Incident Heat Severity Map (lv12)': [
                            {
                                rank: 1,
                                value: 100,
                                timestamp: 1453738609000
                            }
                        ]
                    }
                }
            ]
        };
        const subject = heatmapDataMapper(mockData, { ...defaultConfig, path: 'result' });
        expect(subject).toHaveLength(1);
        expect(subject[0][0].value).toBe(10);
        const mockDayOne: number = get(mockData, 'result[0].index.dowId') - 1;
        const mockHourOne: number = get(mockData, 'result[0].index.hourId');
        expect(subject[0][0].label).toBe(`${moment().days(mockDayOne).hour(mockHourOne).format('ddd ha')}`);
    });
});
