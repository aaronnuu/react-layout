import React, { Component, forwardRef } from 'react';
import { css } from 'emotion';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  hasEqualKeyVals,
  reducePropAliases,
  getLayoutClass,
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
  gridRowStart: ['rowStart'],
  gridRowEnd: ['rowEnd'],
  gridColumnStart: ['columnStart'],
  gridColumnEnd: ['columnEnd'],
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

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!hasEqualKeyVals(nextProps, prevState.props, ALL_LAYOUT_PROPS)) {
      const gridItemProps = pick(nextProps, ALL_LAYOUT_PROPS);
      return {
        props: nextProps,
        gridItemClass: getLayoutClass(
          gridItemProps,
          LAYOUT_PROP_KEYS,
          LAYOUT_PROP_ALIASES
        )
      };
    }
    return null;
  }

  constructor (props) {
    super(props);
    const gridItemProps = pick(props, ALL_LAYOUT_PROPS);

    this.state = {
      props,
      gridItemClass: getLayoutClass(
        gridItemProps,
        LAYOUT_PROP_KEYS,
        LAYOUT_PROP_ALIASES
      )
    };
  }

  render () {
    const { Component, className, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);
    return (
      <Component
        {...restProps}
        ref={innerRef}
        className={css`
          ${this.state.gridItemClass} ${className};
        `}
      >
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => (
  <GridItem innerRef={ref} {...props} />
));
