

function addLine()
{
    var date=gettime();
    var x=document.getElementById("b2");
    var y=document.createElement("tr");
    var z1=document.createElement("td");
    var z2=document.createElement("td");
    var z3=document.createElement("td");
    var a=document.createTextNode("new title");
    var b=document.createTextNode("new content");
    var t=document.createTextNode(date);
    y.appendChild(z1);
    y.appendChild(z2);
    y.appendChild(z3);
    z1.appendChild(a);
    z2.appendChild(b);
    z3.appendChild(t)
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
function showpost()
{
    var xml=new XMLHttpRequest();
    xml.open("get","/posts/test.json",true);
    
    xml.onreadystatechange = function() {
        if (xml.readyState === 4 && xml.status === 200) {
        var obj = JSON.parse(xml.responseText);
        var a = document.getElementById("testpost");
        var out = obj.posts[0].title + "<br>" +obj.posts[0].author;
        a.innerHTML = out;
        }
}
xml.send();

}

function showgdata()
{
    var a=document.getElementById("testpost");
    var gdata=JSON.parse(sessionStorage.getItem("db"));
    a.innerHTML= gdata.posts[0].id;
}
