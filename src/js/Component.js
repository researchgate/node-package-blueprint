// @flow
import React from 'react';

type Props = {
    count: number,
};

class Component extends React.Component<Props> {
    static defaultProps = {
        count: 0,
    };

    render() {
        return <div>Count: {this.props.count}</div>;
    }
}

export default Component;
