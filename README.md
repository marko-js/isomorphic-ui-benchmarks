isomorphic-ui-benchmarks
========================================

This repo includes multiple benchmarks for various UI libraries. Each benchmark is designed to measure rendering performance (on the server and in the browser) and the time that it takes to update the DOM (client-side only).

# Current results

## Search results

<img width="1247" alt="Search Results Benchmarks" src="https://cloud.githubusercontent.com/assets/978214/26432264/5761b9c8-40af-11e7-8d63-0e4a0ccc5f91.png">

## Color picker

<img width="1254" alt="Color Picker Benchmarks" src="https://cloud.githubusercontent.com/assets/978214/26432262/5309d78e-40af-11e7-9a8c-5ce522c997b4.png">

-----

Below are the results of a run on March 3, 2017

Environment:

- Node.js v8.4.0
- MacBook Pro (15-inch, 2016)
- Processor: 2.9 GHz Intel Core i7
- Memory: 16 GB 2133 MHz LPDDR3
- macOS Sierra: 10.12.6 (16G29)
- Google Chrome Version 61.0.3163.91 (Official Build) (64-bit)

## Server-side

```
Warming up...

Warmup complete.

Running "search-results"...

Running benchmark "marko"...

marko x 5,783 ops/sec ±1.02% (76 runs sampled)

Running benchmark "preact"...

preact x 881 ops/sec ±1.69% (90 runs sampled)

Running benchmark "react"...

react x 40.54 ops/sec ±3.26% (52 runs sampled)

Running benchmark "vue"...

vue x 1,331 ops/sec ±2.71% (76 runs sampled)

Running benchmark "inferno"...

inferno x 695 ops/sec ±1.02% (87 runs sampled)

Fastest is marko

--------------


Warming up...

Warmup complete.

Running "color-picker"...

Running benchmark "marko"...

marko x 10,997 ops/sec ±0.79% (86 runs sampled)

Running benchmark "preact"...

preact x 5,208 ops/sec ±1.24% (89 runs sampled)

Running benchmark "react"...

react x 217 ops/sec ±3.31% (74 runs sampled)

Running benchmark "vue"...

vue x 3,384 ops/sec ±2.22% (73 runs sampled)

Running benchmark "inferno"...

inferno x 4,078 ops/sec ±0.75% (90 runs sampled)

Fastest is marko

--------------


DONE!

~/marko-js/isomorphic-ui-benchmarks (master)>  node -v
v8.4.0
```

# Client-side

## Search results

### Google Chrome

```
Warming up...
Warmup complete.
Running "search-results"...
Running benchmark "marko"...
marko x 355 ops/sec ±1.28% (56 runs sampled)
Running benchmark "preact"...
preact x 267 ops/sec ±1.66% (57 runs sampled)
Running benchmark "react"...
react x 233 ops/sec ±1.76% (54 runs sampled)
Running benchmark "vue"...
vue x 197 ops/sec ±3.40% (55 runs sampled)
Running benchmark "inferno"...
inferno x 355 ops/sec ±1.24% (57 runs sampled)
Fastest is marko,inferno
```

## Color picker

### Google Chrome

```
Warming up...
Warmup complete.
Running "color-picker"...
Running benchmark "marko"...
marko x 7,661 ops/sec ±1.03% (59 runs sampled)
Running benchmark "preact"...
preact x 3,914 ops/sec ±1.16% (24 runs sampled)
Running benchmark "react"...
react x 3,076 ops/sec ±2.21% (20 runs sampled)
Running benchmark "vue"...
vue x 5,003 ops/sec ±3.07% (30 runs sampled)
Running benchmark "inferno"...
inferno x 8,880 ops/sec ±0.99% (60 runs sampled)
Fastest is inferno
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
