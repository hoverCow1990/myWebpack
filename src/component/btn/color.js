import $ from "jquery";
import "./style.less";

function ColorBox(name){
	this.dom = $(".bobo");
	this.init();
}

ColorBox.prototype = {
	init(){
		this.dom.css({"width":200,"height":200,"background-color":"#222"}).on("click",this.fn);
	},
	fn(){
		alert(6222);
	}
}


export default ColorBox;