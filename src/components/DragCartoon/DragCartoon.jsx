import {Component, createRef} from "react";
import './dragCartoon.scss'
export class DragCartoon extends Component {
    constructor(props) {
        super(props);
        this.bgImgs=['https://pic.imgdb.cn/item/6683bd20d9c307b7e9bdc182.png','https://pic.imgdb.cn/item/6683bd20d9c307b7e9bdc15a.png'];
        this.cartoonDom = createRef();
        this.dotDom = createRef();
        this.canvasDom = createRef();
        this.startOrigin = {x:0,y:0};
        this.angle = 0;
        this.timer = null;
        this.actInx = 0;
        this.isDragIng=false;
        this.moved=false;
        this.drawer=null;
        this.state = {
            bgImg:this.bgImgs[this.actInx],
        }
    }
    componentDidMount() {
        let {bottom:y,left:x} = this.cartoonDom.current.getBoundingClientRect();
        this.startOrigin = {x:x+100,y};
        document.addEventListener('mousemove',this.dragIng);
        document.addEventListener('mouseup',this.dragEnd);
        this.drawer = this.canvasDom.current.getContext('2d');
        this.connectLine()
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove',this.dragIng)
        document.removeEventListener('mouseup',this.dragEnd)
    }
    dragStart = ()=>{
        this.timer&&clearInterval(this.timer)
        this.lineTimer&&clearInterval(this.lineTimer)
        this.isDragIng=true;
    }
    connectLine(){
        let dotP= this.dotDom.current.getBoundingClientRect();
        this.drawer.beginPath();
        let canvasP = this.canvasDom.current.getBoundingClientRect();
        this.drawer.beginPath();
        this.drawer.clearRect(0, 0, 200, 370);
        this.drawer.moveTo(100, 350);
        this.drawer.lineTo(dotP.x - canvasP.x+3,dotP.y - canvasP.y);
        this.drawer.lineWidth = 5;
        this.drawer.strokeStyle = 'black';
        this.drawer.stroke();
        this.drawer.closePath();
    }
    dragIng = (e)=>{
        if(!this.isDragIng)return;
        // 后续的点
        let {clientX ,clientY } = e;
        // 计算弧度                        先y后x             原点y                        原点x
        let radian= Math.atan2(clientY - this.startOrigin.y, clientX - this.startOrigin.x);
        // 弧度转角度
        let moveX = (clientX - this.startOrigin.x)/10;
        moveX = moveX>70?70:moveX;
        let moveY = (clientY - this.startOrigin.y)/10;
        moveY= moveY>100?100:moveY;
        let angle= (radian * (180 / Math.PI) + 90)/1.5;
        this.angle = angle;
        this.moved=true;
        this.connectLine()
        // 处理后的angle可以直接拿来旋转
        this.cartoonDom.current.style.transform = `rotate(${angle}deg) translate(${moveX}px,${moveY}px) rotateY(0deg)`;
    }
    dragEnd = ()=>{
        if(!this.isDragIng)return;
        this.isDragIng = false;
        if(!this.moved){
            // this.moved = false;
            this.cartoonDom.current.style.transform = `rotate(${this.angle}deg) rotateY(90deg)`;
            this.actInx=this.actInx?0:1;
            setTimeout(()=>{
                this.setState({
                    bgImg:this.bgImgs[this.actInx],
                },()=>{
                    this.cartoonDom.current.style.transform = `rotate(${this.angle}deg) rotateY(0deg)`;
                })
            },500)
        }
        this.moved = false;
        this.setState({
            endAngle:this.angle
        },this.startRock)
    }
    startRock(){
        let flag = true;
        this.lineTimer = setInterval(this.connectLine.bind(this));
        this.timer = setInterval(()=>{
            if(this.angle<=0){
                clearInterval(this.timer)
                this.cartoonDom.current.style.transform = `rotate(0deg)`
                return
            }
            this.angle -= (this.angle < 10 ? 1 :this.angle * 0.05);
            flag = !flag;
            this.cartoonDom.current.style.transform = `rotate(${flag?this.angle:-this.angle}deg)`
        },200)
    }
    render() {
        return (
            <div className={"dragCartoon"}>
                <canvas className={'canvas'} width={200} height={370} ref={this.canvasDom}>
                </canvas>
                <div className="cartoonImg"  ref={this.cartoonDom} style={{backgroundImage:`url(${this.state.bgImg})`}}
                onMouseDown={this.dragStart}>
                    <div className="botDot" ref={this.dotDom}></div>
                </div>
                <div className="column"></div>
                <div className="base">
                    <img src="https://pic.imgdb.cn/item/6683bd72d9c307b7e9beb8ea.png" alt=""/>
                </div>
            </div>
        )
    }
}