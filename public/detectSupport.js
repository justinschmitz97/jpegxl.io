function addClass(a) {
  document.documentElement.classList.add(a);
}
var jxl = new Image();
(jxl.src =
  "data:image/jxl;base64,/woIELASCAgQAFwASxLFgkWAHL0xqnCBCV0qDp901Te/5QM="),
  (jxl.onload = function () {
    addClass("jxl");
  }),
  (jxl.onerror = function () {
    var avif = new Image();
    (avif.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
      (avif.onload = function () {
        addClass("avif");
      }),
      (avif.onerror = function () {
        var webp = new Image();
        (webp.src =
          "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="),
          (webp.onload = function () {
            addClass("webp");
          });
      });
  });
