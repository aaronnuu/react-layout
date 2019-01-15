/** @jsx jsx */
import { Component, forwardRef } from 'react';
import { jsx } from '@emotion/core';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  reducePropAliases,
  getLayoutStyles,
  SHARED_LAYOUT_PROPS,
  SHARED_LAYOUT_PROP_ALIASES
} from '../utils';

const LAYOUT_PROP_KEYS = [
  'gridRowStart',
  'gridRowEnd',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRow',
  'gridColumn',
  'gridArea',
  'justifySelf',
  'alignSelf',
  'placeSelf',
  ...SHARED_LAYOUT_PROPS
];

const LAYOUT_PROP_ALIASES = {
  gridRowStart: ['grs', 'rowStart'],
  gridRowEnd: ['gre', 'rowEnd'],
  gridColumnStart: ['gcs', 'columnStart'],
  gridColumnEnd: ['gce', 'columnEnd'],
  gridRow: ['gr', 'row'],
  gridColumn: ['gc', 'column'],
  gridArea: ['ga', 'area'],
  justifySelf: ['js'],
  alignSelf: ['as'],
  placeSelf: ['ps'],
  ...SHARED_LAYOUT_PROP_ALIASES
};

const ALL_LAYOUT_PROPS = [
  ...LAYOUT_PROP_KEYS,
  ...reducePropAliases(LAYOUT_PROP_ALIASES),
  'breakpoints'
];

class GridItem extends Component {
  static defaultProps = {
    Component: 'div'
  };

  render () {
    const { Component, css, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);

    const gridItemProps = pick(rest, ALL_LAYOUT_PROPS);
    const gridItemStyles = getLayoutStyles(
      gridItemProps,
      LAYOUT_PROP_KEYS,
      LAYOUT_PROP_ALIASES
    );

    return (
      <Component {...restProps} ref={innerRef} css={[gridItemStyles, css]}>
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => (
  <GridItem innerRef={ref} {...props} />
));
