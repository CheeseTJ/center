const parser = new DOMParser();
export const fetchSvg=(url,selector)=>new Promise((s,f)=>{
    fetch(url,{
        cors: 'no-cors',
    }).then(r=>r.text()).then(svg=>{
        let svgDoc = parser.parseFromString(svg, "image/svg+xml");
        let svgElement = document.importNode(svgDoc.documentElement, true);
        if(!selector){
            s(svgElement)
            return
        }
        s(true)
        if (selector instanceof HTMLElement){
            selector.innerHTML=null;
            selector.appendChild(svgElement)
            return;
        }
        let dom= document.querySelector(selector)
            if(!dom){
                console.error('No element found with selector: ', selector)
            }
            dom.innerHTML = '';
            dom.appendChild(svgElement)
    })
})
