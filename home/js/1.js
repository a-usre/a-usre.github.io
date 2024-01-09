function renderall()
{
    var data=JSON.parse(sessionStorage.getItem("db"));
    var post1=data.posts[data.posts.length-1];
    var post2=data.posts[data.posts.length-2];
    var post3=data.posts[data.posts.length-3];
    
    var h21,h22,h23,h31,h32,h33,p1,p2,p3;
    h21=document.getElementById("h21");
    h22=document.getElementById("h22");
    h23=document.getElementById("h23");
    h31=document.getElementById("h31");
    h32=document.getElementById("h32");
    h33=document.getElementById("h33");
    p1=document.getElementById("p1");
    p2=document.getElementById("p2");
    p3=document.getElementById("p3");

    h21.appendChild(document.createTextNode(post1.title));
    h22.appendChild(document.createTextNode(post2.title));
    h23.appendChild(document.createTextNode(post3.title));
    h31.appendChild(document.createTextNode("文章类型："+typename(post1.type)));
    h32.appendChild(document.createTextNode("文章类型："+typename(post2.type)));
    h33.appendChild(document.createTextNode("文章类型："+typename(post3.type)));
    p1.appendChild(document.createTextNode(post1.content.text0.slice(0,100)+" ......"));
    p2.appendChild(document.createTextNode(post2.content.text0.slice(0,100)+" ......"));
    p3.appendChild(document.createTextNode(post3.content.text0.slice(0,100)+" ......"));

    var b1,b2,b3,i1,i2,i3;
    i1=document .createElement("img");
    i2=document .createElement("img");
    i3=document .createElement("img");
    i1.setAttribute("src",post1.content.img0);
    i2.setAttribute("src",post2.content.img0);
    i3.setAttribute("src",post3.content.img0);
    i2.src=post2.content.img0;
    i3.src=post3.content.img0;
    i1.style.maxWidth = "150px";
    i1.style.maxHeight = "150px";
    i2.style.maxWidth = "150px";
    i2.style.maxHeight = "150px";
    i3.style.maxWidth = "150px";
    i3.style.maxHeight = "150px";


    b1=document.getElementById("b1");
    b2=document.getElementById("b2");
    b3=document.getElementById("b3");

    b1.appendChild(i1);
    b2.appendChild(i2);
    b3.appendChild(i3);

    var b11,b12,b13;
    b11=document.getElementById("b11");
    b12=document.getElementById("b12");
    b13=document.getElementById("b13");

    b11.addEventListener("click",()=>browsepost(post1.id));
    b12.addEventListener("click",()=>browsepost(post2.id));
    b13.addEventListener("click",()=>browsepost(post3.id));
}