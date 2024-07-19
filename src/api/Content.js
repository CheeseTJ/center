import request from '/src/utils/request.js'
export const getPerDayWord = ()=> new Promise((s,f)=>{
    request.get('https://api.xygeng.cn/one').then(res=>{
        s({
            code:'200',
            id:res.data.data.id,
            source:res.data.data.tag,
            author:res.data.data.origin,
            text:res.data.data.content
        })
    }).catch(()=>{
        request.get('https://v1.hitokoto.cn/').then(res=>{
            s({
                code:'200',
                id:res.data.data.id,
                source:res.data.data.type,
                author:res.data.data.from,
                text:res.data.data['hitokoto']
            })
        }).catch(f)
    })

})
