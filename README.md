# MASCARATION
#### It is a simple string formatter
#### We have typescript definitions


To install:
```shell
npm i -S mascaration
```

The usage is very simple:

```ts
// mask to 88130-000
import {formatter, unmask} from 'mascaration';
const value = formatter('#####-###', '88130000');
// You can also use array of masks, it find the best match and uses it.
const comNonoDigito = formatter(['(##) #####-####', '(##) ####-####'], '2144440102');
const semNonoDigito = formatter(['(##) #####-####', '(##) ####-####'], '21944440102');
// unmask to 88130000
const value = unmask('88130-000');
```
