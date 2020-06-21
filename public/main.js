const icon = document.querySelector('.nav-icon');
const ullist = document.getElementById('ull');
const flashmessage = document.querySelector('.flashmessage');



// icon.addEventListener('click',()=>{
// ullist.classList.toggle('active')
// ullist.classList.toggle('ullist')
// })

icon.addEventListener('click',()=>{
   document.querySelector('.nav-wrapper').classList.toggle('hide-nav')
  
 
    });
flashmessage.addEventListener('click',function(){
      flashmessage.classList.add('hiddenflash')
   });
