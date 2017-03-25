isomorphic-ui-benchmarks
========================================

This repo includes multiple benchmarks for various UI libraries. Each benchmark is designed to measure rendering performance (on the server and in the browser) and the time that it takes to update the DOM (client-side only).

# Current results

Below are the results of a run on March 3, 2017

Environment:

- Node.js v7.5.0
- MacBook Pro (15-inch, 2016)
- Processor: 2.9 GHz Intel Core i7
- Memory: 16 GB 2133 MHz LPDDR3
- macOS Sierra: 10.12.3 (16D32)
- Google Chrome Version 56.0.2924.87 (64-bit)

## Server-side

```
~/marko-js/isomorphic-ui-benchmarks (master)> npm run benchmark

> isomorphic-ui-benchmarks@1.0.0 benchmark /Users/psteeleidem/development/github/marko-js/isomorphic-ui-benchmarks
> node --expose-gc benchmark-server/run.js

Warming up...

Warmup complete.

Running "color-picker"...

Running benchmark "inferno"...

inferno x 2,132 ops/sec ±0.68% (88 runs sampled)

Running benchmark "marko"...

marko x 5,519 ops/sec ±6.05% (56 runs sampled)

Running benchmark "preact"...

preact x 2,833 ops/sec ±4.07% (79 runs sampled)

Running benchmark "react"...

react x 262 ops/sec ±2.26% (75 runs sampled)

Running benchmark "vue"...

vue x 1,514 ops/sec ±3.65% (75 runs sampled)

vFastest is marko

--------------


Warming up...

Warmup complete.

Running "search-results"...

Running benchmark "inferno"...

inferno x 383 ops/sec ±2.78% (78 runs sampled)

Running benchmark "marko"...

marko x 4,854 ops/sec ±3.03% (83 runs sampled)

Running benchmark "preact"...

preact x 371 ops/sec ±2.58% (81 runs sampled)

Running benchmark "react"...

react x 42.10 ops/sec ±2.49% (53 runs sampled)

Running benchmark "vue"...

vue x 185 ops/sec ±4.13% (70 runs sampled)

Fastest is marko

--------------


DONE!

~/marko-js/isomorphic-ui-benchmarks (master)> node -v
v7.5.0
```

# Client-side

## Search results

### Google Chrome

```
Warming up...
Warmup complete.
Running "search-results"...
Running benchmark "inferno"...
inferno x 229 ops/sec ±1.12% (56 runs sampled)
Running benchmark "marko"...
marko x 296 ops/sec ±1.14% (59 runs sampled)
Running benchmark "preact"...
preact x 256 ops/sec ±0.69% (60 runs sampled)
Running benchmark "react"...
react x 214 ops/sec ±0.58% (58 runs sampled)
Fastest is marko
```

## Color picker

### Google Chrome

```
Warming up...
Warmup complete.
Running "color-picker"...
Running benchmark "inferno"...
inferno x 3,085 ops/sec ±0.93% (20 runs sampled)
Running benchmark "marko"...
marko x 4,043 ops/sec ±3.37% (49 runs sampled)
Running benchmark "preact"...
preact x 3,123 ops/sec ±0.33% (63 runs sampled)
Running benchmark "react"...
react x 2,394 ops/sec ±0.79% (61 runs sampled)
Fastest is marko
```
# Additional details

## Included libraries

The following UI libraries are currently included:

- [inferno](https://github.com/infernojs/inferno)
- [marko](https://github.com/marko-js/marko)
- [preact](https://github.com/developit/preact)
- [react](https://github.com/facebook/react)
- [vue](https://github.com/vuejs/vue)

## Included benchmarks

This repo currently includes the following benchmarks

### Search Results

This benchmark measures the time it takes to render pages of search results. Each page includes 100 search result items. Every iteration renders an entirely new set of search results. As a result of rendering new search results for every cycle, a significant number of DOM nodes must be updated.

### Color Picker

This benchmark measures the time it takes to cycle through a selected color. The selected color index changes every cycle. When the selected color index changes two things happen:

- The new selected color is highlighted
- The old selected color is unhighlighted
- The selected color is shown at the end

Compared to the search results benchmark, there are a relatively small number of changes to the DOM for every cycle.

# Running the benchmarks

## Install

```bash
git clone https://github.com/marko-js/isomorphic-ui-benchmarks.git
cd isomorphic-ui-benchmarks
npm install
npm run build # Build client-side JS bundles
```

## Run server-side benchmarks

```bash
npm run benchmark
```

## Run client-side benchmarks

Start

```bash
npm start
```

Open [http://localhost:8080/](http://localhost:8080/) in your browser and choose a benchmark to run.

# Contributions and Feedback

If you see any problems or have any suggestions please let us know. Every effort was made to be as fair and accurate as possible, but mistakes do happen. If you find a problem please open a Github issue to discuss.
