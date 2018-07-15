# react-layout

CSS grid and flexbox helper components for react. Uses emotion for css injection.

Inspired by react-native styling the `Box` component uses `column` as the default flex-direction.

Most layout properties are aliased for convenience as described below.

## Getting Started

### Installing

Install using yarn

```
yarn add @aaronuu/react-layout emotion
```

Install using npm

```
npm -i @aaronuu/react-layout emotion
```

## Usage

```js
import { Box, Grid, GridItem } from '@aaronuu/react-layout';

class YourComponent extends Component {
  render() {
    return (
      <Grid
        rowGap="20px"
        columnGap="10px"
        rows="auto 1fr auto"
        columns="repeat(10, 100px)"
      >
        <GridItem Component="span" area="1 / 1 / 3 / 3">
          <Box padding="10px">
            <h1>Heading</h1>
          </Box>
        </GridItem>
        <GridItem area="1 / 3 / 3 / 10">
          <Box ai="center" jc="center">
            <p>Content</p>
          </Box>
        </GridItem>
      </Grid>
    );
  }
}
```

## Props

### Shared

| Prop          | Alias |
| ------------- | ----- |
| Component     | -     |
| position      | -     |
| top           | t     |
| right         | r     |
| bottom        | b     |
| left          | l     |
| height        | h     |
| width         | w     |
| maxHeight     | maxh  |
| maxWidth      | maxw  |
| minHeight     | minh  |
| minWidth      | minw  |
| padding       | p     |
| paddingTop    | pt    |
| paddingRight  | pr    |
| paddingBottom | pb    |
| paddingLeft   | pl    |
| margin        | m     |
| marginTop     | mt    |
| marginRight   | mr    |
| marginBottom  | mb    |
| marginLeft    | ml    |

### Box

| Prop           | Alias         |
| -------------- | ------------- |
| flexDirection  | fd, direction |
| flexWrap       | fw, wrap      |
| alignItems     | ai            |
| alignContent   | ac            |
| justifyContent | jc            |
| flexGrow       | fg            |
| flexShrink     | fs            |
| flex           | f             |
| flexAuto       | fa            |
| flexNone       | fn            |

### Grid

| Prop                | Alias        |
| ------------------- | ------------ |
| gridGap             | gap          |
| gridRowGap          | rowGap       |
| gridColumnGap       | columnGap    |
| gridTemplateRows    | gtr, rows    |
| gridTemplateColumns | gtc, columns |
| justifyItems        | ji           |
| alignItems          | ai           |
| placeItems          | pc           |
| justifyContent      | jc           |
| alignContent        | ac           |
| placeContent        | pc           |
| gridAutoColumns     | gac          |
| gridAutoRows        | gar          |
| gridAutoFlow        | gaf          |

### GridItem

| Prop            | Alias       |
| --------------- | ----------- |
| gridRowStart    | rowStart    |
| gridRowEnd      | rowEnd      |
| gridColumnStart | columnStart |
| gridColumnEnd   | columnEnd   |
| gridRow         | gr, row     |
| gridColumn      | gc, column  |
| gridArea        | ga, area    |
| justifySelf     | js          |
| alignSelf       | as          |
| placeSelf       | ps          |

**You can either use the full prop name or any of it's aliases.**

## Caveats

Not all flexbox properties are exposed, only the most used have been included in the initial version of the component.

Due to how CSS Grid works all children of the Grid component are technically 'grid items' so you aren't limited to using the `GridItem` component to style `Grid` children.

Refs will be forwarded to the inner element using the `forwardRef` API so the ref will return a reference to the underlying DOM node rather than the instance of the component.

## Authors

- **Aaron Williams** - [aaronnuu](https://github.com/aaronnuu)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
