import {Component} from "react";
import {getPerDayWord} from "../../api/Content.js";
import {DragCartoon} from "../../components/DragCartoon/DragCartoon.jsx";
import './Content.scss'
export default class Content extends Component {
    constructor(props) {
        super(props);
        // https://cn.apihz.cn/api/xinwen/baidu.php?id=88888888&key=88888888
        this.state = {
            bgImg: 'https://files.superbed.cn/proxy/726e6e6a692035356d716a72756e7534797e743478797f787569347975773578282b237f78792e782d2e2f2e297b232b7c2222237f7b282a7f2b2d227b222878222a2b2b2e792234706a7d',
            card: {
                right: 0,
                width: 0,
                height: 0,
                bottom: 0
            },
            cardText:{
                "code": "",
                "message": "",
                "id": "",
                "source": "",
                "author": "",
                "text": ""
            },
            apps: [{
                name: 'Landing',
                icon: 'https://pic.imgdb.cn/item/66821a9ad9c307b7e9244696.png',
                url: 'http://taojun.top',
                inx: 0,
                dragIngInx: -1,
                enterInx: -1,
            }]
        }
    }
    componentDidMount() {
        this.init()
    }
    // computed
    getApps=(inx)=>{
        return this.state.apps.find(i=>i.inx===inx)
    }
    // methods
    dragStart=(inx)=>{
        this.setState({
            dragIngInx:inx
        })
    }
    dragEnter=(inx)=>{
        this.setState({
            enterInx:inx
        })
    }
    dragEnd = (inx)=>{
        this.getApps(inx).inx=this.state.enterInx;
        this.setState({})
    }
    to(inx){
        window.open(this.getApps(inx).url)
    }
    personLoaded=(e)=>{
        let card = e.target.contentDocument.querySelector('svg .cls-2');
        let objWidth = e.target.clientWidth;
        let objHeight = e.target.clientHeight;
        let {left,top,width,height}= card.getBoundingClientRect();
        this.setState({
            card:{
                right:objWidth - width - left +'px',
                width:width+'px',
                height:height+'px',
                bottom:objHeight - height - top +'px'
            },
        })
    }
    init=()=>{
        getPerDayWord().then(res=>{
            res.data.author==='unknown'&&(res.data.author='佚名');
            this.setState({
                cardText:res.data
            })
        })
    }
    render() {
        return (
            <main className={"content"}>
                <DragCartoon></DragCartoon>
                <div className="computer">
                    <object className={'bg'} data="/src/assets/img/computer.svg"></object>
                    <div className={"container"} style={{backgroundImage:`url(${this.state.bgImg})`}}>
                        {Array.from({length:72}).map((_,inx)=><div className={"item"} key={inx} onDragEnter={()=>this.dragEnter(inx)} >
                            {this.getApps(inx)?<div  className={'app'} draggable onClick={()=>this.to(inx)} onDragStart={()=>this.dragStart=(inx)} onDragEnd={()=>this.dragEnd(inx)}>
                                <img src={this.getApps(inx).icon} alt=""/>
                                <p>{this.getApps(inx).name}</p>
                            </div>:''}
                        </div>)}
                    </div>
                </div>
                <div className="person">
                    <object className={'person'} data="/src/assets/img/person.svg" onLoad={this.personLoaded}>
                    </object>
                    <div className="card" style={{...this.state.card}}>
                        <p>{this.state.cardText.text}</p>
                        <p className={'author'}>{this.state.cardText.author}</p>
                    </div>
                </div>
            </main>
        )
    }
}