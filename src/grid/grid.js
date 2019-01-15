import React, { Component, forwardRef } from 'react';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  reducePropAliases,
  getLayoutClass,
  SHARED_LAYOUT_PROPS,
  SHARED_LAYOUT_PROP_ALIASES
} from '../utils';

const LAYOUT_PROP_KEYS = [
  'gridGap',
  'gridRowGap',
  'gridColumnGap',
  'gridTemplateRows',
  'gridTemplateColumns',
  'justifyItems',
  'alignItems',
  'placeItems',
  'justifyContent',
  'alignContent',
  'placeContent',
  'gridAutoColumns',
  'gridAutoRows',
  'gridAutoFlow',
  ...SHARED_LAYOUT_PROPS
];

const LAYOUT_PROP_ALIASES = {
  gridGap: ['gg', 'gap'],
  gridRowGap: ['grg', 'rowGap'],
  gridColumnGap: ['gcg', 'columnGap'],
  gridTemplateRows: ['gtr', 'rows'],
  gridTemplateColumns: ['gtc', 'columns'],
  justifyItems: ['ji'],
  alignItems: ['ai'],
  placeItems: ['pi'],
  justifyContent: ['jc'],
  alignContent: ['ac'],
  placeContent: ['pc'],
  gridAutoColumns: ['gac'],
  gridAutoRows: ['gar'],
  gridAutoFlow: ['gaf'],
  ...SHARED_LAYOUT_PROP_ALIASES
};

const ALL_LAYOUT_PROPS = [
  ...LAYOUT_PROP_KEYS,
  ...reducePropAliases(LAYOUT_PROP_ALIASES),
  'breakpoints'
];

class Grid extends Component {
  static defaultProps = {
    Component: 'div'
  };

  render () {
    const { Component, className, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);

    const gridProps = pick(rest, ALL_LAYOUT_PROPS);
    const gridClass = getLayoutClass(
      gridProps,
      LAYOUT_PROP_KEYS,
      LAYOUT_PROP_ALIASES
    );

    return (
      <Component {...restProps} ref={innerRef} css={[gridClass, className]}>
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Grid innerRef={ref} {...props} />);
