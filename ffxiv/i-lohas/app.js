(function() {
  var onload = function() {
    var style = document.createElement('style');
    style.innerHTML = '#_wrapper{border:1px solid #787878;padding:10px;margin:20px 0px 10px 0px;}#_result{height:4em;width:100%;overflow:hidden;margin:5px 0px;}';
    document.head.appendChild(style);

    var targetDialog = document.querySelector('.dialogContents') ||
      document.querySelector('.matometePoint .boxWhite');

    var wrapper = document.createElement('div');
    wrapper.id = '_wrapper';

    var result = document.createElement('textarea');
    result.id = '_result';

    var input = document.createElement('input');
    input.capture = 'camera';
    input.type = 'file';
    input.accept = 'image/\*';
    input.onchange = function() {
      Tesseract.recognize(this.files[0]).progress(function(data) {
        result.value = ['処理中(', data.status, ')... ', Math.floor(data.progress * 100), '%'].join('');
      }).then(function(data) {
        result.value = data.text;
        result.style.height = result.scrollHeight + 'px';
      });
    };

    var applyBtn = document.createElement('input');
    applyBtn.type = 'button';
    applyBtn.value = '適用';
    applyBtn.onclick = function() {
      var inputLines = document.querySelectorAll('.inputSection');
      inputLines = inputLines.length === 0 ? document.querySelectorAll('.serialMatometeInput') : inputLines;
      var index = 0;
      result.value.split('\n').forEach(function(line) {
        if (!line || index >= 5) { return; }
        var num = inputLines[index].querySelectorAll('input');
        var code = line.split('-');
        num[0].value = code[0] || '';
        num[1].value = code[1] || '';
        num[2].value = code[2] || '';
        num[3].value = code[3] || '';
        ++index;
      });
      targetDialog.removeChild(wrapper);
    };

    wrapper.appendChild(input);
    wrapper.appendChild(result);
    wrapper.appendChild(applyBtn);
    targetDialog.appendChild(wrapper);
  };

  if (!document.querySelector('#_wrapper') &&
    document.querySelectorAll('.ui-dialog')[1].style.display === 'block') {
    var script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js';
    script.onload = onload;
    document.body.appendChild(script);
  }
})();
