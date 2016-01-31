//Capture all click
document.querySelector('body').addEventListener('click', function(e){
  console.log('body clicked', e.target);
});

//or
window.onclick =function(e){
  console.log('someone clicked', e.target)
}
      
//get all text
document.body.innerText;


function getAllText(node){
  var allText = [];

  function getNodeText(node){
      if(node && node.childNodes && node.childNodes.length){
          for(var i = 0, len = node.childNodes.length; i<len; i++){
              getNodeText(node.childNodes[i]);
          }
      }
      else{
          allText.push(node.nodeValue);
     }
  }
  getNodeText(node);
  return allText.join('');
}
      

