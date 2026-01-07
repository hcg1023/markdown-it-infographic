# markdown-it-infographic

## Install
```bash
npm install @antv/infographic markdown-it-infographic
```

## Usage
```ts
const md = require('markdown-it')()
const infographic = require('markdown-it-infographic')

md.use(infographic)
// md.use(infographic, {
//  padding: 4
// })
```

Input:
````markdown
```infographic
infographic list-row-simple-horizontal-arrow
data
  items
    - label 步骤 1
      desc 开始
    - label 步骤 2
      desc 进行中
    - label 步骤 3
      desc 完成
```
````

Output:
```html
<div data-infographic="true"><svg>...</svg></div>
```

## Options
[Infographic](https://github.com/antvis/infographic) options.
