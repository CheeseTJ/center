export const fetchAll = (url, options = {}) => new Promise((s,f)=>{
    fetch(url, {...options,mode:'no-cors'}).then(res => {
        console.log(res, 'res')
        try {
            s(res.json())
        }catch (e){
            s(res)
            console.warn(e)
        }
    });
})