class Radar {
    el = null

    cxt = null

    /**  */
    centerPointPosition =  [0, 0]
    centerPointRadius =  '7px'
    centerPointBgc =  '#666'

    ringMaxRadius = 0
    ringMaxValue = 0
    ringNum = 0
    ringColor = '#666'
    ringOutRingColor = '#666'

    areaLineColor = '#666'
    areaBorderColor = '#666' 
    areaBgc = '#666'
    areaAngleColor = '#666' 

    labelTxtHasRing = true
    labelTxtRingRadius = 0
    labelTxtFontSize = 0
    labelTxtFontColor = '#666' 
    /**  */
    areaPoint = []

    constructor(id, option) {
        this.el = document.querySelector(id);
        this.cxt = this.el.getContext("2d");

        this.centerPointPosition = option.centerPoint.position 
        this.centerPointRadius = option.centerPoint.radius 
        this.centerPointBgc = option.centerPoint.bgc 

        this.ringMaxRadius = option.ring. maxRadius 
        this.ringMaxValue = option.ring.maxValue
        this.ringNum = option.ring.num 
        this.ringColor = option.ring.color 
        this.ringOutRingColor = option.ring.outRingColor 

        this.areaLineColor = option.area.lineColor 
        this.areaBorderColor = option.area.borderColor 
        this.areaBgc = option.area.bgc 
        this.areaAngleColor = option.area.angleColor

        this.labelTxtHasRings = option.labelTxt.hasRing 
        this.labelTxtRingRadius = option.labelTxt.ringRadius 
        this.labelTxtFontSize = option.labelTxt.fontSize 
        this.labelTxtFontColor = option.labelTxt.fontColor 
    }

    render (data) {
        this.paintRing()
        this.computedAreaPoint(data);
        this.paintArea();
    }

    paintRing () {
        this.paintCenterPoint();
        let space = this.ringMaxRadius / this.ringNum;
        let center = this.centerPointPosition
        let cxt = this.cxt;

        Array.from({ length: this.ringNum }).map((v, i) => {
            cxt.strokeStyle= i == this.ringNum - 1
                                ? this.ringOutRingColor
                                : this.ringColor;
            cxt.beginPath();
            cxt.arc(
                center[0],
                center[1],
                (i+1) * space,0,Math.PI*2,true);
            cxt.closePath();
            cxt.stroke();
        });
    }

    paintCenterPoint () {
        let center = this.centerPointPosition
        let cxt = this.cxt;
        cxt.fillStyle=this.centerPointBgc;
        cxt.beginPath();
        cxt.arc( 
            center[0],
            center[1],
            this.centerPointRadius,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
    }

    computedAreaPoint (data) {
        let centerX = this.centerPointPosition[0];
        let centerY = this.centerPointPosition[1];
        let baseAngle = Math.PI * 2 / data.length;
        this.areaPoint = data.map((v, index) => {
            let value = v.value;
            let distance =( this.ringMaxRadius / this.ringMaxValue   )* value;
            let angle = baseAngle * index
            let xRatio = Math.cos(angle);
            let yRatio = Math.sin(angle);
            let x = distance * xRatio;
            let y = distance * yRatio;
            // ---

            // ---
            return {
                x: ~~x + centerX,
                y: ~~y + centerY,
                distance,
                value,
                name: v.name,
                angle
            }
        })
    }

    paintArea () {
        let areaPoint =Array.from(this.areaPoint);
        let cxt = this.cxt;
        cxt.fillStyle= this.areaBgc;
        cxt.strokeStyle= this.lineColor;

        cxt.beginPath();
        let firstPoint = areaPoint.shift()
        cxt.moveTo(firstPoint.x, firstPoint.y);
        areaPoint.forEach(point => {
            cxt.lineTo(point.x, point.y);
        })
        cxt.lineTo(firstPoint.x, firstPoint.y);
        cxt.closePath();
        cxt.stroke();
        cxt.fill();
    }

    paintAreaAngleTxt (areaPoint) {
        // this.areaPoint.forEach((p, i) => {
        //     let isInner = true;
        //     // 逻辑与显示出现细微差异 需要调整
        //     if (p.value < this.maxValue * 0.9) {
        //         let preValue = 
        //     }
        // })
    }
 
}