import json,re,sys
from html.parser import HTMLParser
p=json.load(open('lectures/lec01/lesson/placement.json'))['placements']
html=open('site/dist/lectures/lec01/index.html').read()
class H(HTMLParser):
    def __init__(s):
        super().__init__(); s.stack=[]; s.found={}; s.ids=set(); s.hrefs=[]
    def handle_starttag(s,tag,a):
        a=dict(a)
        if 'id' in a: s.ids.add(a['id'])
        if a.get('href','').startswith('#'): s.hrefs.append(a['href'])
        sec=None
        if tag=='article' and 'section' in (a.get('class') or ''): sec=a.get('id')
        void=tag in ('br','img','input','meta','link','hr','source','col','wbr','path','circle','rect','line','ellipse','polyline','polygon','use','stop')
        if not void: s.stack.append((tag,sec))
        if a.get('data-k'):
            cur=next((x[1] for x in reversed(s.stack) if x[1]),'(header)')
            for k in a['data-k'].split():
                s.found.setdefault(k,set()).add(cur)
    def handle_startendtag(s,tag,a): 
        a=dict(a)
        if 'id' in a: s.ids.add(a['id'])
        if a.get('href','').startswith('#'): s.hrefs.append(a['href'])
    def handle_endtag(s,tag):
        for i in range(len(s.stack)-1,-1,-1):
            if s.stack[i][0]==tag: del s.stack[i:]; break
h=H(); h.feed(html)
missing=[k for k in p if k not in h.found]
print('placed',len(p),'on page',len([k for k in p if k in h.found]),'missing',missing)
mis=[]
for k,v in p.items():
    if k not in h.found: continue
    sec=v['section']; secs=h.found[k]
    want=sec.replace('.','-')
    ok=any(x=='s'+want or x.startswith('s'+want+'-') or ('s'+want).startswith(x+'-') or x=='s'+want.split('-')[0] for x in secs) or (sec=='about' and '(header)' in secs)
    if not ok: mis.append((k,sec,sorted(secs)))
print('section mismatches',len(mis))
for m in mis: print(' ',m)
bad=[x for x in set(h.hrefs) if x!='#' and x[1:].split('/')[0] not in h.ids]
print('in-page links',len(h.hrefs),'broken',sorted(bad))
