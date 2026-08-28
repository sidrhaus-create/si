/* Loader wrapper: keeps original Zero Cider runtime intact, then adds Cider House family widget. */
(function(){
  var base='https://sidrhaus-create.github.io/si/';
  function load(src,cb){var s=document.createElement('script');s.src=src;s.onload=function(){if(cb)cb()};document.head.appendChild(s)}
  if(document.readyState==='loading'){
    document.write('<script src="'+base+'zerocider-core.js"><\/script><script src="'+base+'ch-family-widget.js"><\/script>');
  }else{
    load(base+'zerocider-core.js',function(){load(base+'ch-family-widget.js')});
  }
})();
