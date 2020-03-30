function intialize(){
    for(let i=0;i<progress_bar.length;i++){
        animated[i]=false;
    }
}

function timer(id){
    var elt=document.getElementById(id);
    let count=0;
    var scroll=setInterval(function(){
        var cord=elt.getBoundingClientRect();
        if(cord.top<=0 || count>50) clearInterval(scroll);
        else window.scrollBy(0,100);
        count++;
    },20);
}

function fillBars(bar){
    let target=bar.getAttribute('data-value');
    let cur=0;
    let interval=setInterval(function(){
        if(cur>target){
            clearInterval();
            return;
        }
        bar.style.width=cur+"%";
        cur++;
    },10);
}

function checkScroll(){
    for(let i=0;i<progress_bar.length;i++){
        let top=progress_bar[i].getBoundingClientRect().top;
        let bottom=progress_bar[i].getBoundingClientRect().bottom;
        if(!animated[i] && top<=window.innerHeight && bottom>0){
            animated[i]=true;
            fillBars(progress_bar[i]);
        }
        else if(top>window.innerHeight || bottom<0){
            animated[i]=false;
        }
    }
}

var li_click=document.querySelectorAll('nav a');
for(let i=0;i<li_click.length;i++){
    li_click[i].addEventListener('click',function(event){
        event.preventDefault();
        let id=this.textContent.trim().toLowerCase();
        timer(id);
    });
}

var progress_bar=document.querySelectorAll('.skill-progress div');
var skills=document.getElementsByClassName('skills-display')[0];
window.addEventListener('scroll',checkScroll);
var animated=[];
intialize();