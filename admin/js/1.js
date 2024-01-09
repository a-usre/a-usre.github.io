function allpostsforadmin()
{
var data=JSON.parse(sessionStorage.getItem("db"));
var n=data.numberofposts.num;
var newpost=document.createElement("button");
var post;
newpost.textContent="addpost(we use the first img added as cover!)";
newpost.setAttribute("type","button");
newpost.setAttribute("id","addbutton");
newpost.addEventListener("click",()=>addpost());

  for(var i=0;i<n;i++)
  {
    post=data.posts[i];
    addline(post);
  }
var D=document.getElementById("D");
D.appendChild(newpost);



}

function addline(post)
{
  var pid=post.id;
  var tbody=document.getElementById("b2");

  var newline=document.createElement("tr");

  var title=document.createElement("td");
  title.appendChild(document.createTextNode(JSON.stringify(post.title)));

  var type=document.createElement("td");
  type.appendChild(document.createTextNode(JSON.stringify(post.type)));

  var time=document.createElement("td");
  time.appendChild(document.createTextNode(JSON.stringify(post.time)));

  var action=document.createElement("td");

  var a1=document.createElement("button");
  var a2=document.createElement("button");
  var a3=document.createElement("button");

  a1.textContent="browse";
  a1.setAttribute("type","button");
  a1.addEventListener("click",()=>browsepost(pid));

  a2.textContent="modify";
  a2.setAttribute("type","button");
  a2.addEventListener("click",()=>modpost(pid));

  a3.textContent="delete";
  a3.setAttribute("type","button");
  
  a3.addEventListener("click",()=>delpost(pid));

  action.appendChild(a1);
  action.appendChild(a2);
  action.appendChild(a3);

  newline.appendChild(title);
  newline.appendChild(type);
  newline.appendChild(time);
  newline.appendChild(action);

  tbody.appendChild(newline);
}



function modpost(pid)
{
  var D=document.getElementById("D");
  var E=document.getElementById("E");
/*   var p=document.createElement("h3");
  p.appendChild(document.createTextNode("still developing. For now, use browse, delete and add post function as a substitude!"));
  D.appendChild(p); */
  while (D.firstChild) {
    D.removeChild(D.firstChild);
  }
  while (E.firstChild) {
    E.removeChild(E.firstChild);
  }
  var data=JSON.parse(sessionStorage.getItem("db"));
  var post,finish,addimg;
  finish=document.createElement("button");
  finish.textContent="finish"
  finish.addEventListener("click",()=>finishmod());
  addimg=document.createElement("button");
  addimg.textContent="addimg"
  addimg.addEventListener("click",()=>addmod());

  for(var i=0;i<data.numberofposts.num;i++)
  {
    if(data.posts[i].id==pid)
    {
      post=data.posts[i];
    }
  }
  var txta,img,bu;
  var i=0;
  for(x in post.content)
  { 

    i+=1;
    if(x[0]=='t')
    {
      txta=document.createElement("textarea");
      txta.setAttribute("class","txt");
      txta.value=post.content[x];
      txta.style.width="600px";
      txta.style.height="100px";
      txta.setAttribute("id","te"+String(i));
      D.appendChild(txta);

    }
    else{
      img=document.createElement("textarea");
      img.setAttribute("class","img");
      img.style.width="600px";
      img.value=post.content[x];
      img.setAttribute("id","te"+String(i));
      D.appendChild(img);
    }
    bu=document.createElement("button");
    /* bu.addEventListener("click",()=>del(String(i))); */
    /* bu.textContent="delete this" */
    bu.setAttribute("id","del"+String(i));
    D.appendChild(bu);
    D.appendChild(document.createElement("br"));

    
  }

  D.appendChild(addimg);
  var E=document.getElementById("E");
  E.appendChild(finish);

/*   sessionStorage.setItem("db",JSON.stringify(data));
  window.open("/admin/admin.html","_self"); */

  function del(j)
  {
  var D=document.getElementById("D");
  var area,bu;
  area=document.getElementById("te"+j);
  bu=document.getElementById("del"+j);
  D.removeChild(area);
  D.removeChild(bu);
  }
  function addmod()
  {
    i++;
    var img,txt;
    img=document.createElement("textarea");
    img.setAttribute("class","img")
    var imgLabel = document.createElement('label');
    imgLabel.textContent = 'Img(URL): ';
    img.setAttribute("id","te"+String(i));
    i++;
    txt=document.createElement("textarea");
    txt.setAttribute("class","txt")
    var txtLabel = document.createElement('label');
    txtLabel.textContent = 'Text: ';
    txt.setAttribute("id","te"+String(i));

    D.appendChild(imgLabel);
    D.appendChild(img);
    D.appendChild(document.createElement('br'));
    D.appendChild(txtLabel);
    D.appendChild(txt);
    D.appendChild(document.createElement('br'));

  }
  function finishmod()
  {
    
    var input,intxt,n;
    for(n=0;i<data.numberofposts.num;n++)
    {
      if(data.posts[n].id==pid)
      {
        break;
      }
    }
    for (var key in data.posts[n].content) {
      if (data.posts[n].content.hasOwnProperty(key)) {
        delete data.posts[n].content[key];
      }
    }
    
    for(var k=1;k<i+1;k++)
    {
      input=document.getElementById("te"+String(k));
      intxt=input.value;
      if(input.classList=="txt")
      {
        data.posts[n].content["text"+String(k-1)]=intxt;
      }
      else
      {
        data.posts[n].content["img"+String(k-1)]=intxt;
      }
    }
    sessionStorage.setItem("db",JSON.stringify(data));
    window.open("/admin/admin.html","_self");
  }
}



function delpost(pid)
{
  var data=JSON.parse(sessionStorage.getItem("db"));
  for(var i=0;i<data.numberofposts.num;i++)
  {
    if(data.posts[i].id==pid)
    {
      data.posts.splice(i,1);
      break;
    }
  }
  data.numberofposts.num--;
  sessionStorage.setItem("db",JSON.stringify(data))
  window.open("/admin/admin.html","_self");
}

function addpost()
{
  var connum=0;
  var D=document.getElementById("D");
  D.removeChild(document.getElementById("addbutton"));
  var E=document.getElementById("E");
  const form = document.createElement('form');
form.setAttribute('id', 'myForm');

const titleLabel = document.createElement('label');
titleLabel.textContent = 'Title: ';
const titleInput = document.createElement('input');
titleInput.setAttribute('type', 'text');
titleInput.setAttribute('name', 'title');
form.appendChild(titleLabel);
form.appendChild(titleInput);

const typeLabel = document.createElement('label');
typeLabel.textContent = 'Type id: ';
const typeInput = document.createElement('input');
typeInput.setAttribute('type', 'text');
typeInput.setAttribute('name', 'type');
form.appendChild(document.createElement('br'));
form.appendChild(typeLabel);
form.appendChild(typeInput);

const contentLabel = document.createElement('label');
contentLabel.textContent = 'Text: ';
var contentInput = document.createElement('textarea');
contentInput.setAttribute('name', 'content');
contentInput.setAttribute("id","text0");
form.appendChild(document.createElement('br'));
form.appendChild(contentLabel);
form.appendChild(contentInput);
E.appendChild(form);

var e1=document.createElement("div"); //add more content
E.appendChild(e1);
/* const button1 = document.createElement('button');
button1.textContent = 'addtext';
E.appendChild(button1); */

const button2 = document.createElement('button');
button2.textContent = 'add img';
button2.addEventListener("click",()=>addimg())
E.appendChild(button2);

const button3 = document.createElement('button');
button3.textContent = 'finish this post';
button3.addEventListener("click",()=>finishpost())
E.appendChild(document.createElement('br'));
E.appendChild(button3);

const button4 = document.createElement('button');
button4.textContent = 'discard this post';
button4.addEventListener("click",()=>discardpost())
E.appendChild(document.createElement('br'));
E.appendChild(button4);

function discardpost()
{
window.open("/admin/admin.html","_self");
}

function finishpost()
{
  var data=JSON.parse(sessionStorage.getItem("db"));
  data.numberofposts.num++;
  var newid=data.posts[data.posts.length-1].id+1
  var newjson={
      "id" : 0,
      "type":0,
      "title":"",
      "content":
      { },
      "time":"",
      "commentnum":0,
      "comments":[]
    }
    newjson.id=newid;
    newjson.time=gettime();
    newjson.title=titleInput.value;
    newjson.type=Number(typeInput.value);
 
  var texts,imgs,tinput,iinput;
  var nownum=0;
  tinput=document.getElementById("text0");
  texts=tinput.value;
  newjson.content["text"+String(nownum)]=texts;
  for(;nownum<connum;)
  {
    nownum++;
    iinput=document.getElementById("img"+String(nownum-1));
    imgs=iinput.value;
    tinput=document.getElementById("text"+String(nownum));
    texts=tinput.value;
    newjson.content["img"+String(nownum-1)]=imgs;
    newjson.content["text"+String(nownum)]=texts;
  }


  data.posts.push(newjson);
  sessionStorage.setItem("db",JSON.stringify(data));
  window.open("/admin/admin.html","_self");
}

function addimg()
{
  var img,txt;
  connum++;
  img=document.createElement("textarea");
  var imgLabel = document.createElement('label');
  imgLabel.textContent = 'Img(URL): ';
  img.setAttribute("id","img"+String(connum-1))

  txt=document.createElement("textarea");
  var txtLabel = document.createElement('label');
  txtLabel.textContent = 'Text: ';
  txt.setAttribute("id","text"+String(connum));
  
  e1.appendChild(imgLabel);
  e1.appendChild(img);
  e1.appendChild(document.createElement('br'));
  e1.appendChild(txtLabel);
  e1.appendChild(txt);
  e1.appendChild(document.createElement('br'));

}

}





function sendjson() {
var newData=JSON.parse(sessionStorage.getItem("db"));
fetch('http://localhost:3000/updateJson', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
})
.then(function(response) {
  if (response.ok) {
    console.log('JSON file updated successfully');
  } else {
    console.error('Failed to update JSON file');
  }
})
.catch(function(error) {
  console.error('Error:', error);
});
}

