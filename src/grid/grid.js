/** @jsx jsx */
import React, { Component, forwardRef } from 'react';
import { jsx } from '@emotion/core';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  reducePropAliases,
  getLayoutStyles,
  SHARED_PROPS,
  SHARED_PROP_ALIASES,
  GRID_PROPS,
  GRID_PROP_ALIASES
} from '../utils';

const ALL_GRID_PROPS = [...SHARED_PROPS, ...GRID_PROPS];

const ALL_GRID_PROP_ALIASES = { ...SHARED_PROP_ALIASES, ...GRID_PROP_ALIASES };

const ALL_PROPS = [
  ...ALL_GRID_PROPS,
  ...reducePropAliases({ ...SHARED_PROP_ALIASES, ...GRID_PROP_ALIASES }),
  'breakpoints'
];

class Grid extends Component {
  static defaultProps = {
    tag: 'div'
  };

  render () {
    const { tag: Tag, css, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_PROPS);

    const gridProps = pick(rest, ALL_PROPS);
    const gridStyles = getLayoutStyles(
      gridProps,
      ALL_GRID_PROPS,
      ALL_GRID_PROP_ALIASES
    );

    return (
      <Tag {...restProps} ref={innerRef} css={[gridStyles, css]}>
        {children}
      </Tag>
    );
  }
}

export default forwardRef((props, ref) => <Grid innerRef={ref} {...props} />);
