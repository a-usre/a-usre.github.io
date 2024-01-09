

function gettime()
{
    var currentDateTime = new Date();
    //var dateString = currentDateTime.toTimeString();
    var hours = currentDateTime.getHours().toString();
    var minutes = currentDateTime.getMinutes().toString();
    var year = currentDateTime.getFullYear().toString();
    var month = (currentDateTime.getMonth() + 1).toString();
    var day = currentDateTime.getDate().toString();
    return year+"."+month+"."+day+" "+hours+":"+minutes;
}

function browsepost(pid)
{
  sessionStorage.setItem("postid",pid);
  window.open("../main/passage.html",'_self');
}




function typename(tid) //unfinished
{
    var name="undefined type";
    if(tid==0)
    {
        name="测试文章";
    }
    else if(tid==1)
    {
        name="趣事轶闻";
    }
    else if(tid==2)
    {
        name="科普";
    }
    else if(tid==3)
    {
        name="新闻热点";
    }
    else if(tid==4)
    {
        name="物品出售";
    }
    
    return name;
}

function getdb()
{
    var xml=new XMLHttpRequest();
    xml.open("get","./posts/db_demo.json",true);
    
    xml.onreadystatechange = function() {
        if (xml.readyState === 4 && xml.status === 200) {
        var obj = JSON.parse(xml.responseText);
        var a=document.getElementById("p1");
        //a.innerHTML= obj.posts[0].id;
        sessionStorage.setItem("db",JSON.stringify(obj));
        }
}
xml.send();
}

function renderpost()
{   
    var pid=sessionStorage.getItem("postid");
    var Data=JSON.parse(sessionStorage.getItem("db"));
    var n=Data.numberofposts.num;
    
    var c=document.getElementById("c");
    c.appendChild(document.createTextNode("pid="+pid));
    for(var i=0;i<n ;i++)
    {
        if(Data.posts[i].id==(pid))
        {
            var B=document.getElementById("B")
            var post=Data.posts[i];

            var title=document.createElement("h2");
            title.appendChild(document.createTextNode(post.title));

            var type=document.createElement("h3");
            type.appendChild(document.createTextNode("文章类型："+typename(post.type)));

            var content=document.createElement("div");
            var text,img;
            for(x in post.content)
            {
                if(x[0]=='t')
                {
                    text=document.createElement("p");
                    text.appendChild(document.createTextNode(post.content[x]));
                    content.appendChild(text);

                }
                else if(x[0]=='i')
                {
                    img=document.createElement("img");
                    img.setAttribute("src",post.content[x]);
                    content.appendChild(img);
                }

            }


            var time=document.createElement("p");
            time.appendChild(document.createTextNode("修改时间："+post.time));

            var comments=document.createElement("div");
            var add=document.createElement("h2");
            add.appendChild(document.createTextNode("所有评论："));
            comments.appendChild(add);
            var m=post.commentnum;
            var author,comcontent,comtime;
            for(var j=0;j<m;j++)
            {
                author="@"+ post.comments[j].author;
                comcontent=post.comments[j].content;
                comtime ="发布时间：" + post.comments[j].time;
                var add1=document.createElement("h4");
                add1.appendChild(document.createTextNode((j+1)+"."+author));
                var add2=document.createElement("p");
                add2.appendChild(document.createTextNode(comcontent));
                var add3=document.createElement("p");
                add3.appendChild(document.createTextNode(comtime));
                comments.appendChild(add1);
                comments.appendChild(add2);
                comments.appendChild(add3);
            }
            var a1=document.createElement("button");
            a1.textContent="add comments";
            a1.setAttribute("type","buttom");
            a1.addEventListener("click",()=>addcomment((pid)));
            comments.appendChild(a1);
            comments.setAttribute("id","b1");

            B.appendChild(title);
            B.appendChild(type);
            B.appendChild(content);
            B.appendChild(time);
            comments.style.border="2px solid"
            
            B.appendChild(comments);

            //sessionStorage.removeItem("postid");
            return;
        }

    }
    console.error('invalid passage id');
    //sessionStorage.removeItem("postid");
    return;
}

function addcomment(pid)
{

var comments=document.getElementById("b1");

const form = document.createElement("form");


const nameLabel = document.createElement("label");
nameLabel.textContent = "姓名: ";
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "name";
nameLabel.appendChild(nameInput);
form.appendChild(nameLabel);
form.appendChild(document.createElement("br"));

const commentLabel = document.createElement("label");
commentLabel.textContent = "评论: ";
const commentInput = document.createElement("input");
commentInput.type = "text";
commentInput.name = "comment";
commentInput.style.width = "600px"; 
//commentInput.style.height = "100px"; 
nameInput.value = "user";
commentInput.value = "text";
commentLabel.appendChild(commentInput);
form.appendChild(commentLabel);
form.appendChild(document.createElement("br"));

const saveButton = document.createElement("button");
saveButton.textContent = "Save Comment";
saveButton.addEventListener("click",function()
{
    comments.removeChild(form);
    comments.removeChild(saveButton);
    var h1=document.createElement("h4");
    h1.appendChild(document.createTextNode("@"+nameInput.value));
    var p1=document.createElement("p");
    p1.appendChild(document.createTextNode(commentInput.value));
    var p2=document.createElement("p");
    p2.appendChild(document.createTextNode("发布时间："+gettime()));
    comments.appendChild(h1);
    comments.appendChild(p1);
    comments.appendChild(p2);
    savecommentstoserver();
})


comments.appendChild(form);
comments.appendChild(saveButton);

}



function savecommentstoserver()
{
    //this may violate my principle. Considering.
}