
function addLine()
{
    
    var x=document.getElementById("b2");
    var y=document.createElement("tr");
    var z1=document.createElement("td");
    var z2=document.createElement("td");
    var a=document.createTextNode("new title");
    var b=document.createTextNode("new content");
    var t=document.createTextNode("123");
    y.appendChild(z1);
    y.appendChild(z2);
    z1.appendChild(a);
    z2.appendChild(b);
    x.appendChild(y);

}
function delLine()
{
    var list=document.getElementsByTagName("tr");
    var parent=document.getElementById("b2");
    parent.removeChild(parent.firstChild);
    //if (list.length > 1) {
        //list[list.length-1].parentNode.removeChild(list[list.length-1]);
    //}
}
function delLineAll()
{
    var x=document.getElementById("b2");
    x.innerHTML="";
}