(function () {
  var PI = Math.PI
    , RADIAN_PER_DEGREE = PI / 180
    , RADIAN_PER_DEGREE_1_2 = RADIAN_PER_DEGREE / 2
    , SMALL_NUMBER = 1e-8

    , sin = Math.sin
    , cos = Math.cos
    , tan = Math.tan
    ;

  function CSSMatrix(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    this.m11 = m11 != null ? m11 : 1;
    this.m12 = m12 != null ? m12 : 0;
    this.m13 = m13 != null ? m13 : 0;
    this.m14 = m14 != null ? m14 : 0;
    this.m21 = m21 != null ? m21 : 0;
    this.m22 = m22 != null ? m22 : 1;
    this.m23 = m23 != null ? m23 : 0;
    this.m24 = m24 != null ? m24 : 0;
    this.m31 = m31 != null ? m31 : 0;
    this.m32 = m32 != null ? m32 : 0;
    this.m33 = m33 != null ? m33 : 1;
    this.m34 = m34 != null ? m34 : 0;
    this.m41 = m41 != null ? m41 : 0;
    this.m42 = m42 != null ? m42 : 0;
    this.m43 = m43 != null ? m43 : 0;
    this.m44 = m44 != null ? m44 : 1;
  }

  CSSMatrix.prototype.__defineGetter__('a', function () {
    return this.m11;
  });
  CSSMatrix.prototype.__defineSetter__('a', function (value) {
    this.m11 = value;
  });

  CSSMatrix.prototype.__defineGetter__('b', function () {
    return this.m12;
  });
  CSSMatrix.prototype.__defineSetter__('b', function (value) {
    this.m12 = value;
  });

  CSSMatrix.prototype.__defineGetter__('c', function () {
    return this.m21;
  });
  CSSMatrix.prototype.__defineSetter__('c', function (value) {
    this.m21 = value;
  });

  CSSMatrix.prototype.__defineGetter__('d', function () {
    return this.m22;
  });
  CSSMatrix.prototype.__defineSetter__('d', function (value) {
    this.m22 = value;
  });

  CSSMatrix.prototype.__defineGetter__('e', function () {
    return this.m41;
  });
  CSSMatrix.prototype.__defineSetter__('e', function (value) {
    this.m41 = value;
  });

  CSSMatrix.prototype.__defineGetter__('f', function () {
    return this.m42;
  });
  CSSMatrix.prototype.__defineSetter__('f', function (value) {
    this.m42 = value;
  });

  CSSMatrix.prototype.identity = function () {
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m24 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    this.m34 = 0;
    this.m41 = 0;
    this.m42 = 0;
    this.m43 = 0;
    this.m44 = 1;
  };

  CSSMatrix.prototype.clone = function () {
    return new CSSMatrix(
      this.m11, this.m12, this.m13, this.m14,
      this.m21, this.m22, this.m23, this.m24,
      this.m31, this.m32, this.m33, this.m34,
      this.m41, this.m42, this.m43, this.m44
    );
  };

  CSSMatrix.prototype.toString = function () {
    var matrix = [
        this.m11, this.m12, this.m13, this.m14,
        this.m21, this.m22, this.m23, this.m24,
        this.m31, this.m32, this.m33, this.m34,
        this.m41, this.m42, this.m43, this.m44
      ]
      , i, len
      ;
    for (i = 0, len = matrix.length; i < len; i++) {
      if (matrix[i] > -SMALL_NUMBER && matrix[i] < SMALL_NUMBER) {
        matrix[i] = 0;
      }
    }
    if (this.m13 === 0 && this.m14 === 0
      && this.m23 === 0 && this.m24 === 0
      && this.m31 === 0 && this.m32 === 0 && this.m33 === 1 && this.m34 === 0
      && this.m43 === 0 && this.m44 === 1) {
      matrix = [
        this.m11, this.m12,
        this.m21, this.m22,
        this.m41, this.m42
      ];
      return 'matrix(' + matrix.join(', ') + ')';
    }
    return 'matrix3d(' + matrix.join(', ') + ')';
  };

  CSSMatrix.prototype.apply = function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
    if (m11 instanceof CSSMatrix) {
      var matrix = m11
        ;
      m11 = matrix.m11;
      m12 = matrix.m12;
      m13 = matrix.m13;
      m14 = matrix.m14;
      m21 = matrix.m21;
      m22 = matrix.m22;
      m23 = matrix.m23;
      m24 = matrix.m24;
      m31 = matrix.m31;
      m32 = matrix.m32;
      m33 = matrix.m33;
      m34 = matrix.m34;
      m41 = matrix.m41;
      m42 = matrix.m42;
      m43 = matrix.m43;
      m44 = matrix.m44;
    }
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m14 = m14;
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m24 = m24;
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
    this.m34 = m34;
    this.m41 = m41;
    this.m42 = m42;
    this.m43 = m43;
    this.m44 = m44;
    return this;
  };

  CSSMatrix.prototype.concat = function (_m11, _m12, _m13, _m14, _m21, _m22, _m23, _m24, _m31, _m32, _m33, _m34, _m41, _m42, _m43, _m44) {
    if (_m11 instanceof CSSMatrix) {
      var matrix = _m11
        ;
      _m11 = matrix.m11;
      _m12 = matrix.m12;
      _m13 = matrix.m13;
      _m14 = matrix.m14;
      _m21 = matrix.m21;
      _m22 = matrix.m22;
      _m23 = matrix.m23;
      _m24 = matrix.m24;
      _m31 = matrix.m31;
      _m32 = matrix.m32;
      _m33 = matrix.m33;
      _m34 = matrix.m34;
      _m41 = matrix.m41;
      _m42 = matrix.m42;
      _m43 = matrix.m43;
      _m44 = matrix.m44;
    }
    var m11 = this.m11, m12 = this.m12, m13 = this.m13, m14 = this.m14
      , m21 = this.m21, m22 = this.m22, m23 = this.m23, m24 = this.m24
      , m31 = this.m31, m32 = this.m32, m33 = this.m33, m34 = this.m34
      , m41 = this.m41, m42 = this.m42, m43 = this.m43, m44 = this.m44
      ;
    this.m11 = m11 * _m11 + m21 * _m12 + m31 * _m13 + m41 * _m14;
    this.m12 = m12 * _m11 + m22 * _m12 + m32 * _m13 + m42 * _m14;
    this.m13 = m13 * _m11 + m23 * _m12 + m33 * _m13 + m43 * _m14;
    this.m14 = m14 * _m11 + m24 * _m12 + m34 * _m13 + m44 * _m14;
    this.m21 = m11 * _m21 + m21 * _m22 + m31 * _m23 + m41 * _m24;
    this.m22 = m12 * _m21 + m22 * _m22 + m32 * _m23 + m42 * _m24;
    this.m23 = m13 * _m21 + m23 * _m22 + m33 * _m23 + m43 * _m24;
    this.m24 = m14 * _m21 + m24 * _m22 + m34 * _m23 + m44 * _m24;
    this.m31 = m11 * _m31 + m21 * _m32 + m31 * _m33 + m41 * _m34;
    this.m32 = m12 * _m31 + m22 * _m32 + m32 * _m33 + m42 * _m34;
    this.m33 = m13 * _m31 + m23 * _m32 + m33 * _m33 + m43 * _m34;
    this.m34 = m14 * _m31 + m24 * _m32 + m34 * _m33 + m44 * _m34;
    this.m41 = m11 * _m41 + m21 * _m42 + m31 * _m43 + m41 * _m44;
    this.m42 = m12 * _m41 + m22 * _m42 + m32 * _m43 + m42 * _m44;
    this.m43 = m13 * _m41 + m23 * _m42 + m33 * _m43 + m43 * _m44;
    this.m44 = m14 * _m41 + m24 * _m42 + m34 * _m43 + m44 * _m44;
    return this;
  };

  CSSMatrix.prototype.translate = function (x, y, z) {
    x = x != null ? x : 0;
    y = y != null ? y : 0;
    z = z != null ? z : 0;
    return this.concat(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    );
  };

  CSSMatrix.prototype.scale = function (scaleX, scaleY, scaleZ) {
    scaleX = scaleX != null ? scaleX : 1;
    scaleY = scaleY != null ? scaleY : scaleX;
    scaleZ = scaleZ != null ? scaleZ : 1;
    return this.concat(
      scaleX, 0, 0, 0,
      0, scaleY, 0, 0,
      0, 0, scaleZ, 0,
      0, 0, 0, 1
    );
  };

  CSSMatrix.prototype.rotate = function (rotationX, rotationY, rotationZ) {
    rotationX = rotationX != null ? rotationX : 0;
    if (rotationY == null && rotationZ == null) {
      rotationZ = rotationX;
      rotationX = 0;
      rotationY = 0;
    } else {
      rotationY = rotationY != null ? rotationY : 0;
      rotationZ = rotationZ != null ? rotationZ : 0;
    }
    rotationX *= RADIAN_PER_DEGREE;
    rotationY *= RADIAN_PER_DEGREE;
    rotationZ *= RADIAN_PER_DEGREE;

    var s, c, a, b
      ;

    rotationZ /= 2;
    s = sin(rotationZ);
    c = cos(rotationZ);
    a = 1 - 2 * s * s;
    b = 2 * s * c;
    this.concat(
      a, b, 0, 0,
      -b, a, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );

    rotationY /= 2;
    s = sin(rotationY);
    c = cos(rotationY);
    a = 1 - 2 * s * s;
    b = 2 * s * c;
    this.concat(
      a, 0, -b, 0,
      0, 1, 0, 0,
      b, 0, a, 0,
      0, 0, 0, 1
    );

    rotationX /= 2;
    s = sin(rotationX);
    c = cos(rotationX);
    a = 1 - 2 * s * s;
    b = 2 * s * c;
    this.concat(
      1, 0, 0, 0,
      0, a, b, 0,
      0, -b, a, 0,
      0, 0, 0, 1
    );

    return this;
  };

  CSSMatrix.prototype.skew = function (skewX, skewY) {
    return this.concat(
      1, tan(skewY), 0, 0,
      tan(skewX), 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  };

  CSSMatrix.prototype.invert = function () {
    var d, m41, m42, m11, m12, m21, m22;
    m11 = this.m11;
    m12 = this.m12;
    m21 = this.m21;
    m22 = this.m22;
    m41 = this.m41;
    m42 = this.m42;
    d = m11 * m22 - m12 * m21;
    this.m11 = m22 / d;
    this.m12 = -m12 / d;
    this.m21 = -m21 / d;
    this.m22 = m11 / d;
    this.m41 = (m21 * m42 - m22 * m41) / d;
    this.m42 = (m12 * m41 - m11 * m42) / d;
    return this;
  };


  CSSMatrix.prototype.rotateAxisAngle = function (x, y, z, angle) {
    var len = Math.sqrt(x * x + y * y + z * z)
      , c, s, ss, cs, xx, yy, zz, xy, yz, zx
      ;
    if (len === 0) {
      x = 0;
      y = 0;
      z = 1;
    } else if (len !== 1) {
      x /= len;
      y /= len;
      z /= len;
    }
    angle *= RADIAN_PER_DEGREE_1_2;
    c = cos(angle);
    s = sin(angle);
    ss = s * s;
    cs = c * s;
    xx = x * x;
    yy = y * y;
    zz = z * z;
    xy = x * y;
    yz = y * z;
    zx = z * x;
    return this.concat(
      1 - 2 * (yy + zz) * ss, 2 * (xy * ss + z * cs), 2 * (zx * ss - y * cs), 0,
      2 * (xy * ss - z * cs), 1 - 2 * (zz + xx) * ss, 2 * (yz * ss + x * cs), 0,
      2 * (zx * ss + y * cs), 2 * (yz * ss - x * cs), 1 - 2 * (xx + yy) * ss, 0,
      0, 0, 0, 1
    );
  };

  CSSMatrix.prototype.skewX = function (skewX) {
    skewX = skewX != null ? skewX * RADIAN_PER_DEGREE : 0;
    return this.skew(skewX, 0);
  };

  CSSMatrix.prototype.skewY = function (skewY) {
    skewY = skewY != null ? skewY * RADIAN_PER_DEGREE : 0;
    return this.skew(0, skewY);
  };

  CSSMatrix.prototype.setMatrixValue = function () {

  };

  this.CSSMatrix = CSSMatrix;

})();