"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var _get=function(a,b,c){for(var d=!0;d;){var e=a,f=b,g=c;d=!1,null===e&&(e=Function.prototype);var h=Object.getOwnPropertyDescriptor(e,f);if(void 0!==h){if("value"in h)return h.value;var i=h.get;if(void 0===i)return;return i.call(g)}var j=Object.getPrototypeOf(e);if(null===j)return;a=j,b=f,c=g,d=!0,h=j=void 0}},Cell=function(a){function b(a){_classCallCheck(this,b),_get(Object.getPrototypeOf(b.prototype),"constructor",this).call(this,a)}return _inherits(b,a),b}(GameObject),_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();window.addEventListener("DOMContentLoaded",function(){new Game("gamecanvas")});var Game=function(){function a(b){var c=this;_classCallCheck(this,a);var d=document.getElementById(b);this.engine=new BABYLON.Engine(d,!0),this.assets=[],this.scene=null,window.addEventListener("resize",function(){c.engine.resize()}),this.run()}return _createClass(a,[{key:"_initScene",value:function(){var a=new BABYLON.Scene(this.engine),b=new BABYLON.FreeCamera("cam",new BABYLON.Vector3(0,30,-30),a);b.setTarget(new BABYLON.Vector3(0,0,0)),b.attachControl(this.engine.getRenderingCanvas());var c=new BABYLON.HemisphericLight("hemi",new BABYLON.Vector3(0,1,0),a);return c.intensity=.9,a}},{key:"run",value:function(){var a=this;this.scene=this._initScene();var b=new BABYLON.AssetsManager(this.scene);b.onFinish=function(){a._initGame(),a.isReady=!0,a.engine.runRenderLoop(function(){a.scene.render()})},b.load()}},{key:"_initGame",value:function(){BABYLON.Mesh.CreateBox("box",2,this.scene),this.scene.debugLayer.show()}}]),a}(),_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_get=function(a,b,c){for(var d=!0;d;){var e=a,f=b,g=c;d=!1,null===e&&(e=Function.prototype);var h=Object.getOwnPropertyDescriptor(e,f);if(void 0!==h){if("value"in h)return h.value;var i=h.get;if(void 0===i)return;return i.call(g)}var j=Object.getPrototypeOf(e);if(null===j)return;a=j,b=f,c=g,d=!0,h=j=void 0}},GameObject=function(a){function b(a){_classCallCheck(this,b),_get(Object.getPrototypeOf(b.prototype),"constructor",this).call(this,"__go__",a.scene),this.game=a,this.isVisible=!1,this._children=[],BABYLON.Tags.AddTagsTo(this,"__go__")}return _inherits(b,a),_createClass(b,[{key:"setReady",value:function(){this.computeWorldMatrix(!0),this._children.forEach(function(a){a.computeWorldMatrix(!0)})}},{key:"addChildren",value:function(a){a.parent=this,this._children.push(a)}},{key:"isCollidingWith",value:function(a){if(BABYLON.Tags.MatchesQuery(a,"__go__")){for(var b=0;b<this._children.length;b++)for(var c=0;c<a._children.length;c++)if(this._children[b].intersectsMesh(a._children[c],!0))return!0}else for(b=0;b<this._children.length;b++)if(this._children[b].intersectsMesh(a,!0))return!0}}]),b}(BABYLON.Mesh);