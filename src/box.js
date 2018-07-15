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
} from './utils';

const LAYOUT_PROP_KEYS = [
  'flexDirection',
  'flexWrap',
  'alignItems',
  'alignContent',
  'justifyContent',
  'flexGrow',
  'flexShrink',
  'flex',
  'flexAuto',
  'flexNone',
  ...SHARED_LAYOUT_PROPS
];

const LAYOUT_PROP_ALIASES = {
  flexDirection: ['fd', 'direction'],
  flexWrap: ['fw', 'wrap'],
  alignItems: ['ai'],
  alignContent: ['ac'],
  justifyContent: ['jc'],
  flexGrow: ['fg'],
  flexShrink: ['fs'],
  flex: ['f'],
  flexAuto: ['fa'],
  flexNone: ['fn'],
  ...SHARED_LAYOUT_PROP_ALIASES
};

const ALL_LAYOUT_PROPS = [
  ...LAYOUT_PROP_KEYS,
  ...reducePropAliases(LAYOUT_PROP_ALIASES),
  'breakpoints'
];

class Box extends Component {
  static defaultProps = {
    Component: 'div'
  };

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!hasEqualKeyVals(nextProps, prevState.props, ALL_LAYOUT_PROPS)) {
      const boxProps = pick(nextProps, ALL_LAYOUT_PROPS);
      return {
        props: nextProps,
        boxClass: getLayoutClass(
          boxProps,
          LAYOUT_PROP_KEYS,
          LAYOUT_PROP_ALIASES,
          true
        )
      };
    }
    return null;
  }

  constructor (props, ...args) {
    super(props, ...args);
    const boxProps = pick(props, ALL_LAYOUT_PROPS);

    this.state = {
      props,
      boxClass: getLayoutClass(
        boxProps,
        LAYOUT_PROP_KEYS,
        LAYOUT_PROP_ALIASES,
        true
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
          ${this.state.boxClass} ${className};
        `}
      >
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Box innerRef={ref} {...props} />);
