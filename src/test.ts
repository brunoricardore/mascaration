import {formatter, unmask} from '../dist/index';

const value = formatter(['###.###.###-##', '##.###.###/####-##'], '08579443989');
const value2 = formatter(['###.###.###-##', '##.###.###/####-##'], '42554918000122');
const value3 = formatter(['###.###.###-##', '##.###.###/####-##', '#####-###'], '42554918000122');
console.log('DOCS => ',value, value2, value3);

const comNonoDigito = formatter(['(##) #####-####', '(##) ####-####'], '4891338594');
const semNonoDigito = formatter(['(##) #####-####', '(##) ####-####'], '48991338594');

console.log('TELEFONE => ', comNonoDigito, semNonoDigito);

console.log(unmask(comNonoDigito), unmask(semNonoDigito));
