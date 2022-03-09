# MASCUS
#### It is a simple string formatter
#### We have types


To install:
```shell
npm i -S mascus
```

The usage is very simple:

```ts
// mask to 88132-015
import {formatter} from 'mascus';
const value = formatter('#####-###', '88130000');

// unmask to 
import { unmask } from 'mascus';
const value = unmask('88130-000');
```
