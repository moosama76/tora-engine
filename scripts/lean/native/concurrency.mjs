/** Dependency-free bounded concurrency helper preserving input order. */
export async function mapWithConcurrency(items,concurrency,worker){
 const list=Array.from(items),limit=Math.max(1,Math.floor(concurrency||1));
 if(!list.length)return [];
 const results=new Array(list.length);
 let nextIndex=0,firstError=null,failed=false;
 const runWorker=async()=>{
  while(!failed){
   const index=nextIndex++;
   if(index>=list.length)return;
   try{
    results[index]=await worker(list[index],index);
   }catch(error){
    if(!failed){failed=true;firstError=error;}
    return;
   }
  }
 };
 await Promise.all(Array.from({length:Math.min(limit,list.length)},runWorker));
 if(failed)throw firstError;
 return results;
}
