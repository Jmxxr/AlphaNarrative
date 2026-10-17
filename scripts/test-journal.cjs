const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
function load(file,deps={}){const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const module={exports:{}};new Function('require','module','exports',code)(name=>deps[name]||require(name),module,module.exports);return module.exports;}
const model=load('lib/journal-model.ts');const storage=load('lib/journal-storage.ts');
const initial=JSON.parse(fs.readFileSync('content/journal.json','utf8'));
process.env.ADMIN_SESSION_SECRET='test-only-session-secret-with-at-least-32-characters';process.env.GITHUB_CONTENT_TOKEN='test-only';process.env.VERCEL_ENV='production';
const journal=structuredClone(initial);journal.articles.push({...structuredClone(journal.articles[0]),id:'private-test',title:'PRIVATE DRAFT SENTINEL',published:false});journal.advertisements[0].title='PRIVATE CAMPAIGN SENTINEL';
assert(model.validateJournal(journal));const sealed=storage.sealJournal(journal);assert(!JSON.stringify(sealed).includes('PRIVATE DRAFT SENTINEL'));assert(!JSON.stringify(sealed).includes('PRIVATE CAMPAIGN SENTINEL'));assert.equal(storage.openJournal(sealed).articles.find(p=>p.id==='private-test').title,'PRIVATE DRAFT SENTINEL');assert.equal(storage.openJournal(sealed).advertisements[0].title,'PRIVATE CAMPAIGN SENTINEL');
const tampered=structuredClone(sealed);tampered.privateContent=tampered.privateContent.slice(0,-5)+'AAAAA';assert.throws(()=>storage.openJournal(tampered));
for(const bad of ['javascript:alert(1)','http://insecure.example','//evil.example','https://user:password@example.com'])assert(!model.safeUrl(bad,true));
const duplicate=structuredClone(journal);duplicate.articles[1].id=duplicate.articles[0].id;assert(!model.validateJournal(duplicate));
const incomplete=structuredClone(journal);incomplete.articles[0].image='';assert(!model.validateJournal(incomplete));
const campaign=structuredClone(journal);campaign.advertisements[0].enabled=true;assert(!model.validateJournal(campaign));
const unknown=structuredClone(journal);unknown.articles[0].cat='Anything';assert(!model.validateJournal(unknown));
let authenticated=false,lastWrite=null,conflict=false;
const route=load('app/api/admin/journal/route.ts',{'../../../../lib/request-origin':load('lib/request-origin.ts'),'../../../../lib/admin-auth':{isAdmin:async()=>authenticated},'../../../../lib/journal-model':model,'../../../../lib/journal-storage':storage});
const originalFetch=global.fetch;global.fetch=async(url,options={})=>{if(options.method==='PUT'){lastWrite=JSON.parse(options.body);if(conflict)return Response.json({},{status:409});return Response.json({content:{sha:'b'.repeat(40)}});}return Response.json({content:Buffer.from(JSON.stringify(sealed)).toString('base64'),sha:'a'.repeat(40)});};
function request(payload,origin='https://www.alphanarrative.pro'){return new Request('https://www.alphanarrative.pro/api/admin/journal',{method:'PUT',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(payload)});}
(async()=>{
 assert.equal((await route.GET()).status,401);assert.equal((await route.PUT(request({}))).status,401);authenticated=true;
 const read=await route.GET();assert.equal(read.status,200);const data=await read.json();assert(data.journal.articles.some(p=>p.id==='private-test'));
 assert.equal((await route.PUT(request({journal,sha:'a'.repeat(40)},'https://other.example'))).status,403);
 assert.equal((await route.PUT(request({journal:duplicate,sha:'a'.repeat(40)}))).status,400);
 const saved=await route.PUT(request({journal,sha:'a'.repeat(40)}));assert.equal(saved.status,200);assert.equal(lastWrite.sha,'a'.repeat(40));assert.equal(lastWrite.branch,'main');assert(!Buffer.from(lastWrite.content,'base64').toString().includes('PRIVATE DRAFT SENTINEL'));
 conflict=true;assert.equal((await route.PUT(request({journal,sha:'a'.repeat(40)}))).status,409);conflict=false;process.env.VERCEL_ENV='preview';assert.equal((await route.PUT(request({journal,sha:'a'.repeat(40)}))).status,403);
 console.log('PASS: draft/campaign encryption, tamper detection, URL and content validation, authenticated load/save, CSRF, stale-save conflicts, and preview write protection.');
})().finally(()=>{global.fetch=originalFetch;}).catch(e=>{console.error(e);process.exitCode=1;});
