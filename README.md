# ytsearch-node

[![NPM version](https://img.shields.io/npm/v/ytsearch-node.svg?maxAge=3600)](https://www.npmjs.com/package/ytsearch-node)
[![codecov](https://codecov.io/gh/only1drhex/ytsearch-node/branch/master/graph/badge.svg)](https://codecov.io/gh/only1drhex/ytsearch-node)



ytsearch-node is a js only package that allows you make typical YouTube search. It doesn't require any API keys or account login.



# Installation

``` pip
npm install ytsearch-node 
```







# Usage

``` js
const ytsearch= require("ytsearch-node")
let results = await ytsearch("Black Panther")
 console.log(results[0].title)
 
    
     Marvel Studios' Black Panther - Official Trailer
 ```
