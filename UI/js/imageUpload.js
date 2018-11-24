let selDiv = "";
		
document.addEventListener("DOMContentLoaded", init, false);

function init() {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  selDiv = document.getElementById('selectedFiles');
}
  
function handleFileSelect(e) {
  
  if(!e.target.files || !window.FileReader) return;

  selDiv.innerHTML = "";
  
  const files = e.target.files;
  const filesArr = Array.prototype.slice.call(files);
  filesArr.forEach(function(f) {
    if(!f.type.match("image.*")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      var html = "<img src=\"" + e.target.result + "\">" + "<br clear=\"left\"/>";
      selDiv.innerHTML += html;				
    }
    reader.readAsDataURL(f); 
  });
  
}