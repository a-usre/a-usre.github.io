function send_list()
{
    var data=JSON.parse(sessionStorage.getItem("db"));
    var n=data.numberofposts.num
    
    //var form2=document.getElementById("f2");
    var typeid//,img;
    const D=document.getElementById("D");
    while (D.firstChild) {
        D.removeChild(D.firstChild);
      }
    var form1=document.getElementById("f1");
    typeid=form1.querySelector('input[name="type"]:checked');
    if(typeid)
    {typeid=typeid.value;}
    else
    {
        typeid=-1;
    }
    var txt=document.getElementById("in1");
    var post;
    var f=0;
    for(var i=0;i<n;i++)
    {
        post=data.posts[i];
        if(post.type==typeid||typeid==-1)
        {
            for(x in post.content)
            {
                if(x[0]=='t'&&(post.content[x].includes(txt.value)||post.title.includes(txt.value)||post.id==Number(txt.value)))
                {

                        addpost(post);
                        f=1;
                        break;
                
                }
            }
        }
    }
    if(!f)
    {
        var p=document.createElement("p");
        p.appendChild(document.createTextNode("没有找到所需内容。"));
        D.appendChild(p);
    }
}

function init()
{
    var data=JSON.parse(sessionStorage.getItem("db"));
    var n=data.numberofposts.num;
    
    var post;
    for(var i=0;i<n;i++)
    {
        post=data.posts[i];
        addpost(post);
    }
}

function addpost(post)
{
    const div=document.createElement("div");
    const D=document.getElementById("D");
    const h2=document.createElement("h2");
    const h3=document.createElement("h3");
    const p=document.createElement("p");
    const img=document.createElement("img")
    var bu=document.createElement("button");

    h2.appendChild(document.createTextNode(post.title));
    h3.appendChild(document.createTextNode(typename(post.type)));
    p.appendChild(document.createTextNode(post.content.text0.slice(0,100)+"......"));
    bu.addEventListener("click",()=>browsepost(post.id));
    bu.textContent="查看全文";
    img.setAttribute("src",post.content.img0);
    img.style.maxWidth = "150px";
    img.style.maxHeight = "150px";

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(img);
    div.appendChild(document.createElement("br"));
    div.appendChild(bu);
    div.setAttribute("class","d");
    
    D.appendChild(div)
}