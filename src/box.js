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
    const { Component, css, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);

    const boxProps = pick(rest, ALL_LAYOUT_PROPS);
    const boxStyles = getLayoutStyles(
      boxProps,
      LAYOUT_PROP_KEYS,
      LAYOUT_PROP_ALIASES,
      true
    );

    return (
      <Component {...restProps} ref={innerRef} css={[boxStyles, css]}>
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Box innerRef={ref} {...props} />);
