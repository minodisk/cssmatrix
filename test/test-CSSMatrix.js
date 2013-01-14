TestCase('test-CSSMatrix', {

  'test constructor': function () {
    assertSame(new WebKitCSSMatrix().toString(), new CSSMatrix().toString());
  },

  'test translate': function () {
    var x
      ;
    for (x = -100; x < 100; x++) {
      assertSame([x], new WebKitCSSMatrix().translate(x).toString(), new CSSMatrix().translate(x).toString());
    }
  },

  'test scale': function () {
    var x
      ;
    for (x = -180; x < 180; x++) {
      assertSame([x], new WebKitCSSMatrix().scale(x).toString(), new CSSMatrix().scale(x).toString());
    }
  },

  'test rotate': function () {
    var x
      ;
    for (x = -180; x < 180; x++) {
      assertSame([x], new WebKitCSSMatrix().rotate(x).toString(), new CSSMatrix().rotate(x).toString());
    }
  }

});