import {readFile} from 'node:fs/promises';
import ts from 'typescript';

export const nativeCompatibilityMetadata={name:'typescript',version:ts.version,target:'es5',module:'esnext',downlevelIteration:true};

/** Lower binding patterns before esbuild's Safari 13 pass, including shared imports. */
export function nativeCompatibilityPlugin({includeReview=false,include3d=false}={}){
 return {
  name:'native-safari13-compatibility',
  setup(build){
   build.onLoad({filter:/\.[cm]?[jt]s$/},async({path})=>{
    if(/[\\/]node_modules[\\/]/.test(path))return undefined;
    let source=await readFile(path,'utf8');
    if(!includeReview&&/[\\/]native[\\/]runtime\.mjs$/.test(path)) {
     source=source.replace(/\/\* review:start \*\/[\s\S]*?\/\* review:end \*\//g,'');
    }
    if(!include3d&&/[\\/]native[\\/]runtime\.mjs$/.test(path)) {
     source=source.replace(/\/\* 3d:start \*\/[\s\S]*?\/\* 3d:end \*\//g,'');
    }
    const result=ts.transpileModule(source,{
     fileName:path,
     compilerOptions:{
      target:ts.ScriptTarget.ES5,
      module:ts.ModuleKind.ESNext,
      downlevelIteration:true,
      allowJs:true,
      removeComments:true,
     },
    });
    return {contents:result.outputText,loader:'js'};
   });
  },
 };
}
