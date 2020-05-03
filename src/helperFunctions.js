const debounce = (a, b, c) => {
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
};

// const removeHTMLTags = (str) => {
//   return str.replace(/<[^>]*>?/gm, "");
// };

export default debounce;
