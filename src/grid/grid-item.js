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
  GRID_PROP_ALIASES,
  BOX_PROPS,
  BOX_PROP_ALIASES
} from '../utils';

const GRID_ITEM_PROPS = [
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
  ...SHARED_PROPS
];

const GRID_ITEM_PROP_ALIASES = {
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
  ...SHARED_PROP_ALIASES
};

const SUBGRID_PROPS = [...GRID_ITEM_PROPS, ...GRID_PROPS];

const SUBGRID_PROP_ALIASES = {
  ...GRID_ITEM_PROP_ALIASES,
  ...GRID_PROP_ALIASES
};

const FLEX_PROPS = [...GRID_ITEM_PROPS, ...BOX_PROPS];

const FLEX_PROP_ALIASES = {
  ...GRID_ITEM_PROP_ALIASES,
  ...BOX_PROP_ALIASES
};

function getAllLayoutProps (subgrid, flex) {
  return subgrid
    ? [
      ...SUBGRID_PROPS,
      ...reducePropAliases(SUBGRID_PROP_ALIASES),
      'breakpoints'
    ]
    : flex
      ? [...FLEX_PROPS, ...reducePropAliases(FLEX_PROP_ALIASES), 'breakpoints']
      : [
        ...GRID_ITEM_PROPS,
        ...reducePropAliases(GRID_ITEM_PROP_ALIASES),
        'breakpoints'
      ];
}

class GridItem extends Component {
  static defaultProps = {
    Component: 'div',
    subgrid: false
  };

  render () {
    const {
      Component,
      css,
      innerRef,
      children,
      subgrid,
      flex,
      ...rest
    } = this.props;

    const allLayoutProps = getAllLayoutProps(subgrid);

    const restProps = omit(rest, allLayoutProps);

    const gridItemProps = pick(rest, allLayoutProps);
    const gridItemStyles = getLayoutStyles(
      gridItemProps,
      subgrid ? SUBGRID_PROPS : flex ? FLEX_PROPS : GRID_ITEM_PROPS,
      subgrid
        ? SUBGRID_PROP_ALIASES
        : flex
          ? FLEX_PROP_ALIASES
          : GRID_ITEM_PROP_ALIASES,
      flex,
      subgrid
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
