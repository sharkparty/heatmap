import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Heatmap } from './Heatmap';

describe('Heatmap', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Heatmap data={[]} />, div);
    });
});
