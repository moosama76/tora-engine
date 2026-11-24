import {Ajv2020} from 'ajv/dist/2020.js';
import schema from '../project-v21.schema.json' with {type:'json'};
export const nativeStructural=new Ajv2020({strict:true,allErrors:true}).compile(schema);
