/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import Dummy from '../Dummy';

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dummy />, div);
});
