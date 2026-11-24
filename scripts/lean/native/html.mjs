/** Shared standalone document wrapper for local and hosted exports. */
function initialBackground(project){
 const start=project?.base?.startScene;
 const comps=(project?.components??[]).filter(c=>c.sceneId===start&&!c.prototype&&c.parameters?.visible!==false);
 const stage3d=comps.find(c=>c.contract==='native.stage3d.v1'&&c.parameters?.skyColor);
 const bg=stage3d?.parameters?.skyColor??comps.find(c=>c.contract==='native.rectangle.v1'&&c.parameters?.fill&&c.parameters.fill!=='transparent'&&((c.parameters.opacity??1)>=.95)&&((/(?:^|\.)(background|backdrop|bg)(?:\.fill)?$/.test(c.id))||(c.parameters.width>=(project?.base?.width??390)*.9&&c.parameters.height>=(project?.base?.height??700)*.9)))?.parameters?.fill;
 if(typeof bg==='string'){
  const m=/^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(bg.trim());
  if(m)return '#'+m[1].toLowerCase();
 }
 return '#102a34';
}
export function playableHTML(project,runtime,options={}){const bg=initialBackground(project),mount=options.network?JSON.stringify({edit:false,network:options.network}):options.edit===undefined?'{edit:new URLSearchParams(location.search).get("mode")==="edit"}':JSON.stringify({edit:options.edit,...(options.sceneId?{sceneId:options.sceneId}:{})}).replaceAll('<','\\u003c');return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><title>Tora playable draft</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:'+bg+'}canvas{width:100%;height:100%;display:block;touch-action:none}</style></head><body><canvas aria-label="Playable game"></canvas><script type="application/json" id="project">'+JSON.stringify(project).replaceAll('<','\\u003c')+'</script><script>'+runtime+'</script><script>globalThis.toraRuntime=ToraNative.mountNative(JSON.parse(document.getElementById("project").textContent),document.querySelector("canvas"),'+mount+');</script></body></html>';}
