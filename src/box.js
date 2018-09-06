import React, { Component, forwardRef } from 'react';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  reducePropAliases,
  getLayoutClass,
  combineClasses,
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

  render () {
    const { Component, className, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);

    const boxProps = pick(rest, ALL_LAYOUT_PROPS);
    const boxClass = getLayoutClass(
      boxProps,
      LAYOUT_PROP_KEYS,
      LAYOUT_PROP_ALIASES,
      true
    );

    return (
      <Component
        {...restProps}
        ref={innerRef}
        className={combineClasses(boxClass, className)}
      >
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Box innerRef={ref} {...props} />);
