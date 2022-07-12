gxy = [];
gxy["func"] = "";
gxy["px"] = 300;
gxy["py"] = 300;
gxy["xmin"] = -10;
gxy["xmax"] = 10;
gxy["ymin"] = -10;
gxy["ymax"] = 10;

cancount = 0;

function gvars(inname,inval){
  if(gxy[inname]!==null) gxy[inname] = inval;
  if(inname!=="func") gxy[inname] = eval(gxy[inname]);
}

function grapher(){
  allgraph=[];
  allgraph=document.getElementsByClassName("gxy");
  for(a=0;a<allgraph.length;a++){
    ghtml=allgraph[a].innerHTML;
    if(ghtml !== "gxy!") {
      gvars(ghtml.split("=")[0],ghtml.split("=")[1]);
      if(ghtml.split("=")[0]==="func") allgraph[a].innerHTML = "y = "+ghtml.split("=")[1];
      if(ghtml.charAt(ghtml.length-1)==="~") allgraph[a].innerHTML = "";
    }
    if(ghtml === "gxy!") {
      cancount++;
      allgraph[a].innerHTML="<canvas id=\'dcan"+cancount+"\' width=\'"+gxy["px"]+"px\' height=\'"+gxy["py"]+"px\' style=\'border: 1px red solid\'></canvas>";
      ctx = document.getElementById("dcan"+cancount).getContext('2d');
      funcs=[];
      funcs=gxy["func"].split(",");
      for(c=0;c<funcs.length;c++){
        ctx.beginPath();
        ctx.moveTo(-5,gxy["py"]+5);
        for(bx=-5;bx<gxy["px"]+5;bx++){
          xnow=bx/gxy["px"]*(gxy["xmax"]-gxy["xmin"])+gxy["xmin"];
          ynow=eval(funcs[c].replace(/x/gi,"("+xnow.toString()+")"));
          by = (ynow - gxy["ymin"])/(gxy["ymax"]-gxy["ymin"])*gxy["py"];
          ctx.lineTo(bx,gxy["py"] - by);
        }
        ctx.lineTo(gxy["px"]+5,gxy["py"]+5);
        ctx.closePath();
        ctx.lineWidth=3;
        ctx.stroke();
      }
    }
  }
}

window.onload=function(){
  grapher();
}