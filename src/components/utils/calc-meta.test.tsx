// Util
import { calcMeta } from './calc-meta';

describe('Util: calcMeta', () => {
    it('renders meta data (min, max, & range)', () => {
        // TODO: The API should serve this up
        const subject = calcMeta({ 1: [ { value: 0 }, { value: 1 } ] });
        expect(subject.min).toBe(0);
        expect(subject.max).toBe(1);
        expect(subject.range).toBe(1);
    });
});
