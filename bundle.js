/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(44);
	} else {
	  module.exports = require('./cjs/react.development.js');
	}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var ReactIs = require('react-is');

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(35)();
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson

	    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
	    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
	    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
	    is furnished to do so, subject to the following conditions:

	    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	/*global module*/
	(function() {

	    var userContext,
	        userInstance,
	        pipe = function(param, val) {
	            param.value = val;
	        },
	        Super = Object.create(null, {
	            activate: {
	                writable: true,
	                value: function(doActivate) {
	                    if (doActivate) {
	                        this.input.disconnect();
	                        this.input.connect(this.activateNode);
	                        if (this.activateCallback) {
	                            this.activateCallback(doActivate);
	                        }
	                    } else {
	                        this.input.disconnect();
	                        this.input.connect(this.output);
	                    }
	                }
	            },
	            bypass: {
	                get: function() {
	                    return this._bypass;
	                },
	                set: function(value) {
	                    if (this._lastBypassValue === value) {
	                        return;
	                    }
	                    this._bypass = value;
	                    this.activate(!value);
	                    this._lastBypassValue = value;
	                }
	            },
	            connect: {
	                value: function(target) {
	                    this.output.connect(target);
	                }
	            },
	            disconnect: {
	                value: function(target) {
	                    this.output.disconnect(target);
	                }
	            },
	            connectInOrder: {
	                value: function(nodeArray) {
	                    var i = nodeArray.length - 1;
	                    while (i--) {
	                        if (!nodeArray[i].connect) {
	                            return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
	                        }
	                        if (nodeArray[i + 1].input) {
	                            nodeArray[i].connect(nodeArray[i + 1].input);
	                        } else {
	                            nodeArray[i].connect(nodeArray[i + 1]);
	                        }
	                    }
	                }
	            },
	            getDefaults: {
	                value: function() {
	                    var result = {};
	                    for (var key in this.defaults) {
	                        result[key] = this.defaults[key].value;
	                    }
	                    return result;
	                }
	            },
	            automate: {
	                value: function(property, value, duration, startTime) {
	                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
	                        dur = duration ? ~~(duration / 1000) : 0,
	                        _is = this.defaults[property],
	                        param = this[property],
	                        method;

	                    if (param) {
	                        if (_is.automatable) {
	                            if (!duration) {
	                                method = "setValueAtTime";
	                            } else {
	                                method = "linearRampToValueAtTime";
	                                param.cancelScheduledValues(start);
	                                param.setValueAtTime(param.value, start);
	                            }
	                            param[method](value, dur + start);
	                        } else {
	                            param = value;
	                        }
	                    } else {
	                        console.error("Invalid Property for " + this.name);
	                    }
	                }
	            }
	        }),
	        FLOAT = "float",
	        BOOLEAN = "boolean",
	        STRING = "string",
	        INT = "int";

	    if (typeof module !== "undefined" && module.exports) {
	        module.exports = Tuna;
	    } else if (true) {
	        window.define("Tuna", definition);
	    } else {
	        window.Tuna = Tuna;
	    }

	    function definition() {
	        return Tuna;
	    }

	    function Tuna(context) {
	        if (!(this instanceof Tuna)) {
	            return new Tuna(context);
	        }

	        var _window = typeof window === 'undefined' ? {} : window;

	        if (!_window.AudioContext) {
	            _window.AudioContext = _window.webkitAudioContext;
	        }
	        if (!context) {
	            console.log("tuna.js: Missing audio context! Creating a new context for you.");
	            context = _window.AudioContext && (new _window.AudioContext());
	        }
	        if (!context) {
	            throw new Error("Tuna cannot initialize because this environment does not support web audio.");
	        }
	        connectify(context);
	        userContext = context;
	        userInstance = this;
	    }

	    function connectify(context) {
	        if (context.__connectified__ === true) return;

	        var gain = context.createGain(),
	            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
	            oconnect = proto.connect;

	        proto.connect = shimConnect;
	        context.__connectified__ = true; // Prevent overriding connect more than once

	        function shimConnect() {
	            var node = arguments[0];
	            arguments[0] = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
	            oconnect.apply(this, arguments);
	            return node;
	        }
	    }

	    function dbToWAVolume(db) {
	        return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
	    }

	    function fmod(x, y) {
	        // http://kevin.vanzonneveld.net
	        // *     example 1: fmod(5.7, 1.3);
	        // *     returns 1: 0.5
	        var tmp, tmp2, p = 0,
	            pY = 0,
	            l = 0.0,
	            l2 = 0.0;

	        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
	        p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
	        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
	        pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;

	        if (pY > p) {
	            p = pY;
	        }

	        tmp2 = (x % y);

	        if (p < -100 || p > 20) {
	            // toFixed will give an out of bound error so we fix it like this:
	            l = Math.round(Math.log(tmp2) / Math.log(10));
	            l2 = Math.pow(10, l);

	            return (tmp2 / l2).toFixed(l - p) * l2;
	        } else {
	            return parseFloat(tmp2.toFixed(-p));
	        }
	    }

	    function sign(x) {
	        if (x === 0) {
	            return 1;
	        } else {
	            return Math.abs(x) / x;
	        }
	    }

	    function tanh(n) {
	        return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
	    }

	    function initValue(userVal, defaultVal) {
	        return userVal === undefined ? defaultVal : userVal;
	    }

	    Tuna.prototype.Bitcrusher = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var phaser = 0,
	            last = 0,
	            input, output, step, i, length;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	            output = e.outputBuffer.getChannelData(0),
	            step = Math.pow(1 / 2, this.bits);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                phaser += this.normfreq;
	                if (phaser >= 1.0) {
	                    phaser -= 1.0;
	                    last = step * Math.floor(input[i] / step + 0.5);
	                }
	                output[i] = last;
	            }
	        };

	        this.bits = properties.bits || this.defaults.bits.value;
	        this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
	        name: {
	            value: "Bitcrusher"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bits: {
	                    value: 4,
	                    min: 1,
	                    max: 16,
	                    automatable: false,
	                    type: INT
	                },
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                normfreq: {
	                    value: 0.1,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        bits: {
	            enumerable: true,
	            get: function() {
	                return this.processor.bits;
	            },
	            set: function(value) {
	                this.processor.bits = value;
	            }
	        },
	        normfreq: {
	            enumerable: true,
	            get: function() {
	                return this.processor.normfreq;
	            },
	            set: function(value) {
	                this.processor.normfreq = value;
	            }
	        }
	    });

	    Tuna.prototype.Cabinet = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = this.newConvolver(properties.impulsePath || "../impulses/impulse_guitar.wav");
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.convolver.input);
	        this.convolver.output.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.makeupGain = initValue(properties.makeupGain, this.defaults.makeupGain);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Cabinet.prototype = Object.create(Super, {
	        name: {
	            value: "Cabinet"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                makeupGain: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = value;
	            }
	        },
	        newConvolver: {
	            value: function(impulsePath) {
	                return new userInstance.Convolver({
	                    impulse: impulsePath,
	                    dryLevel: 0,
	                    wetLevel: 1
	                });
	            }
	        }
	    });

	    Tuna.prototype.Chorus = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.attenuator = this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.delayL = userContext.createDelay();
	        this.delayR = userContext.createDelay();
	        this.feedbackGainNodeLR = userContext.createGain();
	        this.feedbackGainNodeRL = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.output = userContext.createGain();

	        this.lfoL = new userInstance.LFO({
	            target: this.delayL.delayTime,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.delayR.delayTime,
	            callback: pipe
	        });

	        this.input.connect(this.attenuator);
	        this.attenuator.connect(this.output);
	        this.attenuator.connect(this.splitter);
	        this.splitter.connect(this.delayL, 0);
	        this.splitter.connect(this.delayR, 1);
	        this.delayL.connect(this.feedbackGainNodeLR);
	        this.delayR.connect(this.feedbackGainNodeRL);
	        this.feedbackGainNodeLR.connect(this.delayR);
	        this.feedbackGainNodeRL.connect(this.delayL);
	        this.delayL.connect(this.merger, 0, 0);
	        this.delayR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.delay = initValue(properties.delay, this.defaults.delay.value);
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.lfoR.phase = Math.PI / 2;
	        this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Chorus.prototype = Object.create(Super, {
	        name: {
	            value: "Chorus"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                feedback: {
	                    value: 0.4,
	                    min: 0,
	                    max: 0.95,
	                    automatable: false,
	                    type: FLOAT
	                },
	                delay: {
	                    value: 0.0045,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 1.5,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        delay: {
	            enumerable: true,
	            get: function() {
	                return this._delay;
	            },
	            set: function(value) {
	                this._delay = 0.0002 * (Math.pow(10, value) * 2);
	                this.lfoL.offset = this._delay;
	                this.lfoR.offset = this._delay;
	                this._depth = this._depth;
	            }
	        },
	        depth: {
	            enumerable: true,
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._depth * this._delay;
	                this.lfoR.oscillation = this._depth * this._delay;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeLR.gain.value = this._feedback;
	                this.feedbackGainNodeRL.gain.value = this._feedback;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        }
	    });

	    Tuna.prototype.Compressor = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.compNode = this.activateNode = userContext.createDynamicsCompressor();
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.compNode.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.automakeup = initValue(properties.automakeup, this.defaults.automakeup.value);
	        this.makeupGain = initValue(properties.makeupGain, this.defaults.makeupGain.value);
	        this.threshold = initValue(properties.threshold, this.defaults.threshold.value);
	        this.release = initValue(properties.release, this.defaults.release.value);
	        this.attack = initValue(properties.attack, this.defaults.attack.value);
	        this.ratio = properties.ratio || this.defaults.ratio.value;
	        this.knee = initValue(properties.knee, this.defaults.knee.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Compressor.prototype = Object.create(Super, {
	        name: {
	            value: "Compressor"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                threshold: {
	                    value: -20,
	                    min: -60,
	                    max: 0,
	                    automatable: true,
	                    type: FLOAT
	                },
	                release: {
	                    value: 250,
	                    min: 10,
	                    max: 2000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                makeupGain: {
	                    value: 1,
	                    min: 1,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                attack: {
	                    value: 1,
	                    min: 0,
	                    max: 1000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                ratio: {
	                    value: 4,
	                    min: 1,
	                    max: 50,
	                    automatable: true,
	                    type: FLOAT
	                },
	                knee: {
	                    value: 5,
	                    min: 0,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                automakeup: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        computeMakeup: {
	            value: function() {
	                var magicCoefficient = 4, // raise me if the output is too hot
	                    c = this.compNode;
	                return -(c.threshold.value - c.threshold.value / c.ratio.value) / magicCoefficient;
	            }
	        },
	        automakeup: {
	            enumerable: true,
	            get: function() {
	                return this._automakeup;
	            },
	            set: function(value) {
	                this._automakeup = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        threshold: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.threshold;
	            },
	            set: function(value) {
	                this.compNode.threshold.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        ratio: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.ratio;
	            },
	            set: function(value) {
	                this.compNode.ratio.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        knee: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.knee;
	            },
	            set: function(value) {
	                this.compNode.knee.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        attack: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.attack;
	            },
	            set: function(value) {
	                this.compNode.attack.value = value / 1000;
	            }
	        },
	        release: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.release;
	            },
	            set: function(value) {
	                this.compNode.release.value = value / 1000;
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = dbToWAVolume(value);
	            }
	        }
	    });

	    Tuna.prototype.Convolver = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = userContext.createConvolver();
	        this.dry = userContext.createGain();
	        this.filterLow = userContext.createBiquadFilter();
	        this.filterHigh = userContext.createBiquadFilter();
	        this.wet = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filterLow);
	        this.activateNode.connect(this.dry);
	        this.filterLow.connect(this.filterHigh);
	        this.filterHigh.connect(this.convolver);
	        this.convolver.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	        this.highCut = properties.highCut || this.defaults.highCut.value;
	        this.buffer = properties.impulse || "../impulses/ir_rev_short.wav";
	        this.lowCut = properties.lowCut || this.defaults.lowCut.value;
	        this.level = initValue(properties.level, this.defaults.level.value);
	        this.filterHigh.type = "lowpass";
	        this.filterLow.type = "highpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Convolver.prototype = Object.create(Super, {
	        name: {
	            value: "Convolver"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                highCut: {
	                    value: 22050,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                lowCut: {
	                    value: 20,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                level: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        lowCut: {
	            get: function() {
	                return this.filterLow.frequency;
	            },
	            set: function(value) {
	                this.filterLow.frequency.value = value;
	            }
	        },
	        highCut: {
	            get: function() {
	                return this.filterHigh.frequency;
	            },
	            set: function(value) {
	                this.filterHigh.frequency.value = value;
	            }
	        },
	        level: {
	            get: function() {
	                return this.output.gain;
	            },
	            set: function(value) {
	                this.output.gain.value = value;
	            }
	        },
	        dryLevel: {
	            get: function() {
	                return this.dry.gain;
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        wetLevel: {
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        buffer: {
	            enumerable: false,
	            get: function() {
	                return this.convolver.buffer;
	            },
	            set: function(impulse) {
	                var convolver = this.convolver,
	                    xhr = new XMLHttpRequest();
	                if (!impulse) {
	                    console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
	                    return;
	                }
	                xhr.open("GET", impulse, true);
	                xhr.responseType = "arraybuffer";
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4) {
	                        if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
	                            userContext.decodeAudioData(xhr.response, function(buffer) {
	                                convolver.buffer = buffer;
	                            }, function(e) {
	                                if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
	                            });
	                        }
	                    }
	                };
	                xhr.send(null);
	            }
	        }
	    });

	    Tuna.prototype.Delay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.dry = userContext.createGain();
	        this.wet = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.delay = userContext.createDelay(10);
	        this.feedbackNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.delay);
	        this.activateNode.connect(this.dry);
	        this.delay.connect(this.filter);
	        this.filter.connect(this.feedbackNode);
	        this.feedbackNode.connect(this.delay);
	        this.feedbackNode.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.delayTime = properties.delayTime || this.defaults.delayTime.value;
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	        this.cutoff = properties.cutoff || this.defaults.cutoff.value;
	        this.filter.type = "lowpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Delay.prototype = Object.create(Super, {
	        name: {
	            value: "Delay"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTime: {
	                    value: 100,
	                    min: 20,
	                    max: 1000,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.45,
	                    min: 0,
	                    max: 0.9,
	                    automatable: true,
	                    type: FLOAT
	                },
	                cutoff: {
	                    value: 20000,
	                    min: 20,
	                    max: 20000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        delayTime: {
	            enumerable: true,
	            get: function() {
	                return this.delay.delayTime;
	            },
	            set: function(value) {
	                this.delay.delayTime.value = value / 1000;
	            }
	        },
	        wetLevel: {
	            enumerable: true,
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        dryLevel: {
	            enumerable: true,
	            get: function() {
	                return this.dry.gain;
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this.feedbackNode.gain;
	            },
	            set: function(value) {
	                this.feedbackNode.gain.value = value;
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.Filter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filter);
	        this.filter.connect(this.output);

	        this.frequency = properties.frequency || this.defaults.frequency.value;
	        this.Q = properties.resonance || this.defaults.Q.value;
	        this.filterType = initValue(properties.filterType, this.defaults.filterType.value);
	        this.gain = initValue(properties.gain, this.defaults.gain.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Filter.prototype = Object.create(Super, {
	        name: {
	            value: "Filter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                frequency: {
	                    value: 800,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                Q: {
	                    value: 1,
	                    min: 0.001,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                gain: {
	                    value: 0,
	                    min: -40,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                filterType: {
	                    value: "lowpass",
	                    automatable: false,
	                    type: STRING
	                }
	            }
	        },
	        filterType: {
	            enumerable: true,
	            get: function() {
	                return this.filter.type;
	            },
	            set: function(value) {
	                this.filter.type = value;
	            }
	        },
	        Q: {
	            enumerable: true,
	            get: function() {
	                return this.filter.Q;
	            },
	            set: function(value) {
	                this.filter.Q.value = value;
	            }
	        },
	        gain: {
	            enumerable: true,
	            get: function() {
	                return this.filter.gain;
	            },
	            set: function(value) {
	                this.filter.gain.value = value;
	            }
	        },
	        frequency: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.MoogFilter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var in1, in2, in3, in4, out1, out2, out3, out4;
	        in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
	        var input, output, f, fb, i, length, inputFactor;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	                output = e.outputBuffer.getChannelData(0),
	                f = this.cutoff * 1.16,
	                inputFactor = 0.35013 * (f * f) * (f * f);
	            fb = this.resonance * (1.0 - 0.15 * f * f);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                input[i] -= out4 * fb;
	                input[i] *= inputFactor;
	                out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
	                in1 = input[i];
	                out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
	                in2 = out1;
	                out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
	                in3 = out2;
	                out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
	                in4 = out3;
	                output[i] = out4;
	            }
	        };

	        this.cutoff = initValue(properties.cutoff, this.defaults.cutoff.value);
	        this.resonance = initValue(properties.resonance, this.defaults.resonance.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
	        name: {
	            value: "MoogFilter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                cutoff: {
	                    value: 0.065,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 3.5,
	                    min: 0.0,
	                    max: 4.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.processor.cutoff;
	            },
	            set: function(value) {
	                this.processor.cutoff = value;
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this.processor.resonance;
	            },
	            set: function(value) {
	                this.processor.resonance = value;
	            }
	        }
	    });

	    Tuna.prototype.Overdrive = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.inputDrive = userContext.createGain();
	        this.waveshaper = userContext.createWaveShaper();
	        this.outputDrive = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.inputDrive);
	        this.inputDrive.connect(this.waveshaper);
	        this.waveshaper.connect(this.outputDrive);
	        this.outputDrive.connect(this.output);

	        this.ws_table = new Float32Array(this.k_nSamples);
	        this.drive = initValue(properties.drive, this.defaults.drive.value);
	        this.outputGain = initValue(properties.outputGain, this.defaults.outputGain.value);
	        this.curveAmount = initValue(properties.curveAmount, this.defaults.curveAmount.value);
	        this.algorithmIndex = initValue(properties.algorithmIndex, this.defaults.algorithmIndex.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Overdrive.prototype = Object.create(Super, {
	        name: {
	            value: "Overdrive"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                drive: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                outputGain: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                curveAmount: {
	                    value: 0.725,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                algorithmIndex: {
	                    value: 0,
	                    min: 0,
	                    max: 5,
	                    automatable: false,
	                    type: INT
	                }
	            }
	        },
	        k_nSamples: {
	            value: 8192
	        },
	        drive: {
	            get: function() {
	                return this.inputDrive.gain;
	            },
	            set: function(value) {
	                this._drive = value;
	            }
	        },
	        curveAmount: {
	            get: function() {
	                return this._curveAmount;
	            },
	            set: function(value) {
	                this._curveAmount = value;
	                if (this._algorithmIndex === undefined) {
	                    this._algorithmIndex = 0;
	                }
	                this.waveshaperAlgorithms[this._algorithmIndex](this._curveAmount, this.k_nSamples, this.ws_table);
	                this.waveshaper.curve = this.ws_table;
	            }
	        },
	        outputGain: {
	            get: function() {
	                return this.outputDrive.gain;
	            },
	            set: function(value) {
	                this._outputGain = dbToWAVolume(value);
	            }
	        },
	        algorithmIndex: {
	            get: function() {
	                return this._algorithmIndex;
	            },
	            set: function(value) {
	                this._algorithmIndex = value;
	                this.curveAmount = this._curveAmount;
	            }
	        },
	        waveshaperAlgorithms: {
	            value: [
	                function(amount, n_samples, ws_table) {
	                    amount = Math.min(amount, 0.9999);
	                    var k = 2 * amount / (1 - amount),
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
	                        ws_table[i] = tanh(y);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, a = 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
	                        ws_table[i] = tanh(y * 2);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        abx = Math.abs(x);
	                        if (abx < a) y = abx;
	                        else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
	                        else if (abx > 1) y = abx;
	                        ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
	                    }
	                },
	                function(amount, n_samples, ws_table) { // fixed curve, amount doesn't do anything, the distortion is just from the drive
	                    var i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        if (x < -0.08905) {
	                            ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) - 0.032847)) + 0.01;
	                        } else if (x >= -0.08905 && x < 0.320018) {
	                            ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
	                        } else {
	                            ws_table[i] = 0.630035;
	                        }
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var a = 2 + Math.round(amount * 14),
	                        // we go from 2 to 16 bits, keep in mind for the UI
	                        bits = Math.round(Math.pow(2, a - 1)),
	                        // real number of quantization steps divided by 2
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = Math.round(x * bits) / bits;
	                    }
	                }
	            ]
	        }
	    });

	    Tuna.prototype.Phaser = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(2);
	        this.filtersL = [];
	        this.filtersR = [];
	        this.feedbackGainNodeL = userContext.createGain();
	        this.feedbackGainNodeR = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.filteredSignal = userContext.createGain();
	        this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.filtersL,
	            callback: this.callback
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.filtersR,
	            callback: this.callback
	        });

	        var i = this.stage;
	        while (i--) {
	            this.filtersL[i] = userContext.createBiquadFilter();
	            this.filtersR[i] = userContext.createBiquadFilter();
	            this.filtersL[i].type = "allpass";
	            this.filtersR[i].type = "allpass";
	        }
	        this.input.connect(this.splitter);
	        this.input.connect(this.output);
	        this.splitter.connect(this.filtersL[0], 0, 0);
	        this.splitter.connect(this.filtersR[0], 1, 0);
	        this.connectInOrder(this.filtersL);
	        this.connectInOrder(this.filtersR);
	        this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
	        this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
	        this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
	        this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
	        this.feedbackGainNodeL.connect(this.filtersL[0]);
	        this.feedbackGainNodeR.connect(this.filtersR[0]);
	        this.merger.connect(this.output);

	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Phaser.prototype = Object.create(Super, {
	        name: {
	            value: "Phaser"
	        },
	        stage: {
	            value: 4
	        },
	        defaults: {
	            writable: true,
	            value: {
	                rate: {
	                    value: 0.1,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.6,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 40,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                baseModulationFrequency: {
	                    value: 700,
	                    min: 500,
	                    max: 1500,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        callback: {
	            value: function(filters, value) {
	                for (var stage = 0; stage < 4; stage++) {
	                    filters[stage].frequency.value = value;
	                }
	            }
	        },
	        depth: {
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
	                this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
	            }
	        },
	        rate: {
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        baseModulationFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseModulationFrequency;
	            },
	            set: function(value) {
	                this._baseModulationFrequency = value;
	                this.lfoL.offset = this._baseModulationFrequency;
	                this.lfoR.offset = this._baseModulationFrequency;
	                this._depth = this._depth;
	            }
	        },
	        feedback: {
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeL.gain.value = this._feedback;
	                this.feedbackGainNodeR.gain.value = this._feedback;
	            }
	        },
	        stereoPhase: {
	            get: function() {
	                return this._stereoPhase;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR._phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.PingPongDelay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.wetLevel = userContext.createGain();
	        this.stereoToMonoMix = userContext.createGain();
	        this.feedbackLevel = userContext.createGain();
	        this.output = userContext.createGain();
	        this.delayLeft = userContext.createDelay(10);
	        this.delayRight = userContext.createDelay(10);

	        this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.merger = userContext.createChannelMerger(2);

	        this.activateNode.connect(this.splitter);
	        this.splitter.connect(this.stereoToMonoMix, 0, 0);
	        this.splitter.connect(this.stereoToMonoMix, 1, 0);
	        this.stereoToMonoMix.gain.value = .5;
	        this.stereoToMonoMix.connect(this.wetLevel);
	        this.wetLevel.connect(this.delayLeft);
	        this.feedbackLevel.connect(this.delayLeft);
	        this.delayLeft.connect(this.delayRight);
	        this.delayRight.connect(this.feedbackLevel);
	        this.delayLeft.connect(this.merger, 0, 0);
	        this.delayRight.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);
	        this.activateNode.connect(this.output);

	        this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
	        this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
	        this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
	        this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
	        name: {
	            value: "PingPongDelay"
	        },
	        delayTimeLeft: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeLeft;
	            },
	            set: function(value) {
	                this._delayTimeLeft = value;
	                this.delayLeft.delayTime.value = value / 1000;
	            }
	        },
	        delayTimeRight: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeRight;
	            },
	            set: function(value) {
	                this._delayTimeRight = value;
	                this.delayRight.delayTime.value = value / 1000;
	            }
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTimeLeft: {
	                    value: 200,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                delayTimeRight: {
	                    value: 400,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                feedback: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        }
	    });

	    Tuna.prototype.Tremolo = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(
	                2),
	            this.amplitudeL = userContext.createGain(),
	            this.amplitudeR = userContext.createGain(),
	            this.merger = userContext.createChannelMerger(2),
	            this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.amplitudeL.gain,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.amplitudeR.gain,
	            callback: pipe
	        });

	        this.input.connect(this.splitter);
	        this.splitter.connect(this.amplitudeL, 0);
	        this.splitter.connect(this.amplitudeR, 1);
	        this.amplitudeL.connect(this.merger, 0, 0);
	        this.amplitudeR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.rate = properties.rate || this.defaults.rate.value;
	        this.intensity = initValue(properties.intensity, this.defaults.intensity.value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

	        this.lfoL.offset = 1 - (this.intensity / 2);
	        this.lfoR.offset = 1 - (this.intensity / 2);
	        this.lfoL.phase = this.stereoPhase * Math.PI / 180;

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Tremolo.prototype = Object.create(Super, {
	        name: {
	            value: "Tremolo"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                intensity: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 0,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 5,
	                    min: 0.1,
	                    max: 11,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        intensity: {
	            enumerable: true,
	            get: function() {
	                return this._intensity;
	            },
	            set: function(value) {
	                this._intensity = value;
	                this.lfoL.offset = 1 - this._intensity / 2;
	                this.lfoR.offset = 1 - this._intensity / 2;
	                this.lfoL.oscillation = this._intensity;
	                this.lfoR.oscillation = this._intensity;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        stereoPhase: {
	            enumerable: true,
	            get: function() {
	                return this._stereoPhase;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR.phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.WahWah = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.envelopeFollower = new userInstance.EnvelopeFollower({
	            target: this,
	            callback: function(context, value) {
	                context.sweep = value;
	            }
	        });
	        this.filterBp = userContext.createBiquadFilter();
	        this.filterPeaking = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        //Connect AudioNodes
	        this.activateNode.connect(this.filterBp);
	        this.filterBp.connect(this.filterPeaking);
	        this.filterPeaking.connect(this.output);

	        //Set Properties
	        this.init();
	        this.automode = initValue(properties.enableAutoMode, this.defaults.automode.value);
	        this.resonance = properties.resonance || this.defaults.resonance.value;
	        this.sensitivity = initValue(properties.sensitivity, this.defaults.sensitivity.value);
	        this.baseFrequency = initValue(properties.baseFrequency, this.defaults.baseFrequency.value);
	        this.excursionOctaves = properties.excursionOctaves || this.defaults.excursionOctaves.value;
	        this.sweep = initValue(properties.sweep, this.defaults.sweep.value);

	        this.activateNode.gain.value = 2;
	        this.envelopeFollower.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.WahWah.prototype = Object.create(Super, {
	        name: {
	            value: "WahWah"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                automode: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                baseFrequency: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                excursionOctaves: {
	                    value: 2,
	                    min: 1,
	                    max: 6,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sweep: {
	                    value: 0.2,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 10,
	                    min: 1,
	                    max: 100,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sensitivity: {
	                    value: 0.5,
	                    min: -1,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        activateCallback: {
	            value: function(value) {
	                this.automode = value;
	            }
	        },
	        automode: {
	            get: function() {
	                return this._automode;
	            },
	            set: function(value) {
	                this._automode = value;
	                if (value) {
	                    this.activateNode.connect(this.envelopeFollower.input);
	                    this.envelopeFollower.activate(true);
	                } else {
	                    this.envelopeFollower.activate(false);
	                    this.activateNode.disconnect();
	                    this.activateNode.connect(this.filterBp);
	                }
	            }
	        },
	        filterFreqTimeout: {
	            value: 0
	        },
	        setFilterFreq: {
	            value: function() {
	                try {
	                    this.filterBp.frequency.value = Math.min(22050, this._baseFrequency + this._excursionFrequency * this._sweep);
	                    this.filterPeaking.frequency.value = Math.min(22050, this._baseFrequency + this._excursionFrequency * this._sweep);
	                } catch (e) {
	                    clearTimeout(this.filterFreqTimeout);
	                    //put on the next cycle to let all init properties be set
	                    this.filterFreqTimeout = setTimeout(function() {
	                        this.setFilterFreq();
	                    }.bind(this), 0);
	                }
	            }
	        },
	        sweep: {
	            enumerable: true,
	            get: function() {
	                return this._sweep.value;
	            },
	            set: function(value) {
	                this._sweep = Math.pow(value > 1 ? 1 : value < 0 ? 0 : value, this._sensitivity);
	                this.setFilterFreq();
	            }
	        },
	        baseFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseFrequency;
	            },
	            set: function(value) {
	                this._baseFrequency = 50 * Math.pow(10, value * 2);
	                this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	                this.setFilterFreq();
	            }
	        },
	        excursionOctaves: {
	            enumerable: true,
	            get: function() {
	                return this._excursionOctaves;
	            },
	            set: function(value) {
	                this._excursionOctaves = value;
	                this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	                this.setFilterFreq();
	            }
	        },
	        sensitivity: {
	            enumerable: true,
	            get: function() {
	                return this._sensitivity;
	            },
	            set: function(value) {
	                this._sensitivity = Math.pow(10, value);
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this._resonance;
	            },
	            set: function(value) {
	                this._resonance = value;
	                this.filterPeaking.Q = this._resonance;
	            }
	        },
	        init: {
	            value: function() {
	                this.output.gain.value = 1;
	                this.filterPeaking.type = "peaking";
	                this.filterBp.type = "bandpass";
	                this.filterPeaking.frequency.value = 100;
	                this.filterPeaking.gain.value = 20;
	                this.filterPeaking.Q.value = 5;
	                this.filterBp.frequency.value = 100;
	                this.filterBp.Q.value = 1;
	            }
	        }
	    });

	    Tuna.prototype.EnvelopeFollower = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.jsNode = this.output = userContext.createScriptProcessor(this.buffersize, 1, 1);

	        this.input.connect(this.output);

	        this.attackTime = initValue(properties.attackTime, this.defaults.attackTime.value);
	        this.releaseTime = initValue(properties.releaseTime, this.defaults.releaseTime.value);
	        this._envelope = 0;
	        this.target = properties.target || {};
	        this.callback = properties.callback || function() {};
	    };
	    Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
	        name: {
	            value: "EnvelopeFollower"
	        },
	        defaults: {
	            value: {
	                attackTime: {
	                    value: 0.003,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                },
	                releaseTime: {
	                    value: 0.5,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        buffersize: {
	            value: 256
	        },
	        envelope: {
	            value: 0
	        },
	        sampleRate: {
	            value: 44100
	        },
	        attackTime: {
	            enumerable: true,
	            get: function() {
	                return this._attackTime;
	            },
	            set: function(value) {
	                this._attackTime = value;
	                this._attackC = Math.exp(-1 / this._attackTime * this.sampleRate / this.buffersize);
	            }
	        },
	        releaseTime: {
	            enumerable: true,
	            get: function() {
	                return this._releaseTime;
	            },
	            set: function(value) {
	                this._releaseTime = value;
	                this._releaseC = Math.exp(-1 / this._releaseTime * this.sampleRate / this.buffersize);
	            }
	        },
	        callback: {
	            get: function() {
	                return this._callback;
	            },
	            set: function(value) {
	                if (typeof value === "function") {
	                    this._callback = value;
	                } else {
	                    console.error("tuna.js: " + this.name + ": Callback must be a function!");
	                }
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                this.activated = doActivate;
	                if (doActivate) {
	                    this.jsNode.connect(userContext.destination);
	                    this.jsNode.onaudioprocess = this.returnCompute(this);
	                } else {
	                    this.jsNode.disconnect();
	                    this.jsNode.onaudioprocess = null;
	                }
	            }
	        },
	        returnCompute: {
	            value: function(instance) {
	                return function(event) {
	                    instance.compute(event);
	                };
	            }
	        },
	        compute: {
	            value: function(event) {
	                var count = event.inputBuffer.getChannelData(0).length,
	                    channels = event.inputBuffer.numberOfChannels,
	                    current, chan, rms, i;
	                chan = rms = i = 0;
	                if (channels > 1) { //need to mixdown
	                    for (i = 0; i < count; ++i) {
	                        for (; chan < channels; ++chan) {
	                            current = event.inputBuffer.getChannelData(chan)[i];
	                            rms += (current * current) / channels;
	                        }
	                    }
	                } else {
	                    for (i = 0; i < count; ++i) {
	                        current = event.inputBuffer.getChannelData(0)[i];
	                        rms += (current * current);
	                    }
	                }
	                rms = Math.sqrt(rms);

	                if (this._envelope < rms) {
	                    this._envelope *= this._attackC;
	                    this._envelope += (1 - this._attackC) * rms;
	                } else {
	                    this._envelope *= this._releaseC;
	                    this._envelope += (1 - this._releaseC) * rms;
	                }
	                this._callback(this._target, this._envelope);
	            }
	        }
	    });

	    Tuna.prototype.LFO = function(properties) {
	        //Instantiate AudioNode
	        this.output = userContext.createScriptProcessor(256, 1, 1);
	        this.activateNode = userContext.destination;

	        //Set Properties
	        this.frequency = initValue(properties.frequency, this.defaults.frequency.value);
	        this.offset = initValue(properties.offset, this.defaults.offset.value);
	        this.oscillation = initValue(properties.oscillation, this.defaults.oscillation.value);
	        this.phase = initValue(properties.phase, this.defaults.phase.value);
	        this.target = properties.target || {};
	        this.output.onaudioprocess = this.callback(properties.callback || function() {});
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.LFO.prototype = Object.create(Super, {
	        name: {
	            value: "LFO"
	        },
	        bufferSize: {
	            value: 256
	        },
	        sampleRate: {
	            value: 44100
	        },
	        defaults: {
	            value: {
	                frequency: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: false,
	                    type: FLOAT
	                },
	                offset: {
	                    value: 0.85,
	                    min: 0,
	                    max: 22049,
	                    automatable: false,
	                    type: FLOAT
	                },
	                oscillation: {
	                    value: 0.3,
	                    min: -22050,
	                    max: 22050,
	                    automatable: false,
	                    type: FLOAT
	                },
	                phase: {
	                    value: 0,
	                    min: 0,
	                    max: 2 * Math.PI,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        frequency: {
	            get: function() {
	                return this._frequency;
	            },
	            set: function(value) {
	                this._frequency = value;
	                this._phaseInc = 2 * Math.PI * this._frequency * this.bufferSize / this.sampleRate;
	            }
	        },
	        offset: {
	            get: function() {
	                return this._offset;
	            },
	            set: function(value) {
	                this._offset = value;
	            }
	        },
	        oscillation: {
	            get: function() {
	                return this._oscillation;
	            },
	            set: function(value) {
	                this._oscillation = value;
	            }
	        },
	        phase: {
	            get: function() {
	                return this._phase;
	            },
	            set: function(value) {
	                this._phase = value;
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                if (!doActivate) {
	                    this.output.disconnect(userContext.destination);
	                } else {
	                    this.output.connect(userContext.destination);
	                }
	            }
	        },
	        callback: {
	            value: function(callback) {
	                var that = this;
	                return function() {
	                    that._phase += that._phaseInc;
	                    if (that._phase > 2 * Math.PI) {
	                        that._phase = 0;
	                    }
	                    callback(that._target, that._offset + that._oscillation * Math.sin(that._phase));
	                };
	            }
	        }
	    });

	    Tuna.toString = Tuna.prototype.toString = function() {
	        return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
	    };
	})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(49);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	var Voltage = __webpack_require__(50)
	var isNum = function (n) { return typeof n === 'number' }

	var NUMS = ['duration', 't1', 't2', 't3', 't4', 'l1', 'l2', 'l3']
	var DEFAULTS = {
	  duration: Infinity, l1: 1, l2: 0.2, l3: 0.8,
	  t1: 0.01, t2: 0.1, t3: 0, t4: 0.2
	}

	function rampFn (l) {
	  return l ? 'linearRampToValueAtTime' : 'exponentialRampToValueAtTime'
	}
	function ramp (l, node, level, time) { node.gain[rampFn(l)](level, time) }

	/**
	 * Create an envelope generator.
	 * @param {AudioContext} ac - the audio context
	 * @param {Object} options - (Optional) the envelope options
	 * @return {AudioNode} the envelope generator node
	 */
	function Contour (ac, options) {
	  var env = ac.createGain()
	  var opts = Contour.params(options, env)
	  var isL = opts.ramp === 'linear'

	  var tail = ac.createGain()
	  tail.connect(env)
	  var head = ac.createGain()
	  head.connect(tail)
	  var cv = Voltage(ac)
	  cv.connect(head)

	  env.start = function (time) {
	    time = Math.max(time || 0, ac.currentTime)
	    if (env.onstart) env.onstart(time)
	    cv.start(time)
	    head.gain.setValueAtTime(0, time)
	    head.gain.setValueAtTime(0.01, time + 0.000001)
	    ramp(isL, head, opts.l1, time + opts.t1)
	    ramp(isL, head, opts.l2, time + opts.t1 + opts.t2)
	    ramp(isL, head, opts.l3, time + opts.t1 + opts.t2 + opts.t3)
	    if (isFinite(opts.duration)) env.stop(time + opts.duration)
	  }

	  env.stop = function (time) {
	    time = Math.max(time || 0, ac.currentTime)
	    tail.gain.cancelScheduledValues(time)
	    tail.gain.setValueAtTime(env.gain.value, time)
	    var endsAt = time + opts.t4
	    ramp(isL, tail, 0.0001, endsAt)
	    if (env.onended) {
	      var s = Voltage(ac, 0)
	      s.connect(ac.destination)
	      s.onended = env.onended
	      s.start(ac.currentTime)
	      s.stop(endsAt)
	    }
	    return endsAt
	  }
	  return env
	}

	Contour.params = function (options, dest) {
	  dest = dest || {}
	  options = options || {}
	  NUMS.forEach(function (name) {
	    dest[name] = isNum(options[name]) ? options[name] : DEFAULTS[name]
	  })
	  if (isNum(options.attack)) dest.t1 = options.attack
	  if (isNum(options.decay)) dest.t2 = options.decay
	  if (isNum(options.sustain)) dest.l3 = options.sustain
	  if (isNum(options.release)) dest.t4 = options.release
	  dest.ramp = options.ramp === 'exponential' ? options.ramp : 'linear'
	  return dest
	}

	module.exports = Contour


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _src = __webpack_require__(7);

	var _polysynth = __webpack_require__(11);

	var _polysynth2 = _interopRequireDefault(_polysynth);

	var _visualization = __webpack_require__(12);

	var _visualization2 = _interopRequireDefault(_visualization);

	__webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Demo = function (_Component) {
	  _inherits(Demo, _Component);

	  function Demo(props) {
	    _classCallCheck(this, Demo);

	    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

	    _this.state = {
	      playing: true,
	      lightMode: true
	    };

	    _this.handleAudioProcess = _this.handleAudioProcess.bind(_this);
	    _this.handlePlayToggle = _this.handlePlayToggle.bind(_this);
	    _this.toggleLightMode = _this.toggleLightMode.bind(_this);
	    return _this;
	  }

	  _createClass(Demo, [{
	    key: "handleAudioProcess",
	    value: function handleAudioProcess(analyser) {
	      this.visualization.audioProcess(analyser);
	    }
	  }, {
	    key: "handlePlayToggle",
	    value: function handlePlayToggle() {
	      this.setState({
	        playing: !this.state.playing
	      });
	    }
	  }, {
	    key: "toggleLightMode",
	    value: function toggleLightMode() {
	      this.setState({ lightMode: !this.state.lightMode });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        "div",
	        {
	          style: this.state.lightMode ? {
	            paddingTop: "30px"
	          } : {
	            backgroundColor: "#000",
	            width: "100%",
	            height: "100%",
	            paddingTop: "30px"
	          }
	        },
	        _react2.default.createElement(
	          _src.Song,
	          { playing: this.state.playing, tempo: 90 },
	          _react2.default.createElement(
	            _src.Analyser,
	            { onAudioProcess: this.handleAudioProcess },
	            _react2.default.createElement(
	              _src.Sequencer,
	              { resolution: 16, bars: 1 },
	              _react2.default.createElement(_src.Sampler, { sample: "samples/kick.wav", steps: [0, 2, 8, 10] }),
	              _react2.default.createElement(_src.Sampler, { sample: "samples/snare.wav", steps: [4, 12] })
	            ),
	            _react2.default.createElement(
	              _src.Sequencer,
	              { resolution: 16, bars: 2 },
	              _react2.default.createElement(_polysynth2.default, {
	                steps: [[0, 1, ["c3", "d#3", "g3"]], [2, 1, ["c4"]], [8, 1, ["c3", "d#3", "g3"]], [10, 1, ["c4"]], [12, 1, ["c3", "d#3", "g3"]], [14, 1, ["d#4"]], [16, 1, ["f3", "g#3", "c4"]], [18, 1, ["f3", "g#3", "c4"]], [24, 1, ["f3", "g#3", "c4"]], [26, 1, ["f3", "g#3", "c4"]], [28, 1, ["f3", "g#3", "c4"]], [30, 1, ["f3", "g#3", "c4"]]]
	              })
	            ),
	            _react2.default.createElement(
	              _src.Sequencer,
	              { resolution: 16, bars: 2 },
	              _react2.default.createElement(_src.Synth, {
	                type: "sine",
	                steps: [[0, 8, "c2"], [8, 4, "c2"], [12, 4, "d#2"], [16, 8, "f2"], [24, 8, "f1"]]
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { style: { textAlign: "center" } },
	          _react2.default.createElement(
	            "h2",
	            null,
	            "ENJOY CODING WHILE PLAYING THIS BEAT"
	          )
	        ),
	        _react2.default.createElement(_visualization2.default, {
	          ref: function ref(c) {
	            _this2.visualization = c;
	          }
	        }),
	        _react2.default.createElement(
	          "button",
	          {
	            className: "react-music-button",
	            type: "button",
	            onClick: this.handlePlayToggle
	          },
	          this.state.playing ? "Stop" : "Play"
	        )
	      );
	    }
	  }]);

	  return Demo;
	}(_react.Component);

	exports.default = Demo;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Synth = exports.Song = exports.Sampler = exports.Sequencer = exports.Reverb = exports.PingPong = exports.Overdrive = exports.Monosynth = exports.MoogFilter = exports.LFO = exports.Gain = exports.Filter = exports.Delay = exports.Compressor = exports.Chorus = exports.Bitcrusher = exports.Bus = exports.Analyser = undefined;

	var _analyser = __webpack_require__(13);

	var _analyser2 = _interopRequireDefault(_analyser);

	var _bitcrusher = __webpack_require__(14);

	var _bitcrusher2 = _interopRequireDefault(_bitcrusher);

	var _bus = __webpack_require__(15);

	var _bus2 = _interopRequireDefault(_bus);

	var _chorus = __webpack_require__(16);

	var _chorus2 = _interopRequireDefault(_chorus);

	var _compressor = __webpack_require__(17);

	var _compressor2 = _interopRequireDefault(_compressor);

	var _delay = __webpack_require__(18);

	var _delay2 = _interopRequireDefault(_delay);

	var _filter = __webpack_require__(19);

	var _filter2 = _interopRequireDefault(_filter);

	var _gain = __webpack_require__(20);

	var _gain2 = _interopRequireDefault(_gain);

	var _lfo = __webpack_require__(21);

	var _lfo2 = _interopRequireDefault(_lfo);

	var _monosynth = __webpack_require__(22);

	var _monosynth2 = _interopRequireDefault(_monosynth);

	var _moogFilter = __webpack_require__(23);

	var _moogFilter2 = _interopRequireDefault(_moogFilter);

	var _overdrive = __webpack_require__(24);

	var _overdrive2 = _interopRequireDefault(_overdrive);

	var _pingPong = __webpack_require__(25);

	var _pingPong2 = _interopRequireDefault(_pingPong);

	var _reverb = __webpack_require__(26);

	var _reverb2 = _interopRequireDefault(_reverb);

	var _sequencer = __webpack_require__(28);

	var _sequencer2 = _interopRequireDefault(_sequencer);

	var _sampler = __webpack_require__(27);

	var _sampler2 = _interopRequireDefault(_sampler);

	var _song = __webpack_require__(29);

	var _song2 = _interopRequireDefault(_song);

	var _synth = __webpack_require__(30);

	var _synth2 = _interopRequireDefault(_synth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Analyser = _analyser2.default;
	exports.Bus = _bus2.default;
	exports.Bitcrusher = _bitcrusher2.default;
	exports.Chorus = _chorus2.default;
	exports.Compressor = _compressor2.default;
	exports.Delay = _delay2.default;
	exports.Filter = _filter2.default;
	exports.Gain = _gain2.default;
	exports.LFO = _lfo2.default;
	exports.MoogFilter = _moogFilter2.default;
	exports.Monosynth = _monosynth2.default;
	exports.Overdrive = _overdrive2.default;
	exports.PingPong = _pingPong2.default;
	exports.Reverb = _reverb2.default;
	exports.Sequencer = _sequencer2.default;
	exports.Sampler = _sampler2.default;
	exports.Song = _song2.default;
	exports.Synth = _synth2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	!function(t,n){ true?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.NoteParser=t.NoteParser||{})}(this,function(t){"use strict";function n(t,n){return Array(n+1).join(t)}function r(t){return"number"==typeof t}function e(t){return"string"==typeof t}function u(t){return void 0!==t}function c(t,n){return Math.pow(2,(t-69)/12)*(n||440)}function o(){return b}function i(t,n,r){if("string"!=typeof t)return null;var e=b.exec(t);if(!e||!n&&e[4])return null;var u={letter:e[1].toUpperCase(),acc:e[2].replace(/x/g,"##")};u.pc=u.letter+u.acc,u.step=(u.letter.charCodeAt(0)+3)%7,u.alt="b"===u.acc[0]?-u.acc.length:u.acc.length;var o=A[u.step]+u.alt;return u.chroma=o<0?12+o:o%12,e[3]&&(u.oct=+e[3],u.midi=o+12*(u.oct+1),u.freq=c(u.midi,r)),n&&(u.tonicOf=e[4]),u}function f(t){return r(t)?t<0?n("b",-t):n("#",t):""}function a(t){return r(t)?""+t:""}function l(t,n,r){return null===t||void 0===t?null:t.step?l(t.step,t.alt,t.oct):t<0||t>6?null:C.charAt(t)+f(n)+a(r)}function p(t){if((r(t)||e(t))&&t>=0&&t<128)return+t;var n=i(t);return n&&u(n.midi)?n.midi:null}function s(t,n){var r=p(t);return null===r?null:c(r,n)}function d(t){return(i(t)||{}).letter}function m(t){return(i(t)||{}).acc}function h(t){return(i(t)||{}).pc}function v(t){return(i(t)||{}).step}function g(t){return(i(t)||{}).alt}function x(t){return(i(t)||{}).chroma}function y(t){return(i(t)||{}).oct}var b=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/,A=[0,2,4,5,7,9,11],C="CDEFGAB";t.regex=o,t.parse=i,t.build=l,t.midi=p,t.freq=s,t.letter=d,t.acc=m,t.pc=h,t.step=v,t.alt=g,t.chroma=x,t.oct=y});
	//# sourceMappingURL=note-parser.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _demo = __webpack_require__(6);

	var _demo2 = _interopRequireDefault(_demo);

	var _reactHotLoader = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(
	  _reactHotLoader.AppContainer,
	  null,
	  _react2.default.createElement(_demo2.default, null)
	), document.getElementById("root"));

	module.hot && module.hot.accept("./demo", function () {
	  var NextDemo = __webpack_require__(6).default;
	  _reactDom2.default.render(_react2.default.createElement(
	    _reactHotLoader.AppContainer,
	    null,
	    _react2.default.createElement(NextDemo, null)
	  ), document.getElementById("root"));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _src = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Polysynth = function Polysynth(props) {
	  return _react2.default.createElement(
	    _src.Delay,
	    null,
	    _react2.default.createElement(
	      _src.Reverb,
	      null,
	      _react2.default.createElement(_src.Synth, {
	        type: 'sine',
	        gain: 0.15,
	        steps: props.steps
	      }),
	      _react2.default.createElement(
	        _src.MoogFilter,
	        { bufferSize: 4096 },
	        _react2.default.createElement(_src.Synth, {
	          type: 'square',
	          gain: 0.15,
	          transpose: 1,
	          steps: props.steps
	        })
	      )
	    )
	  );
	};

	Polysynth.propTypes = {
	  steps: _propTypes2.default.array
	};

	exports.default = Polysynth;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Visualization = function (_Component) {
	  _inherits(Visualization, _Component);

	  function Visualization(props) {
	    _classCallCheck(this, Visualization);

	    var _this = _possibleConstructorReturn(this, (Visualization.__proto__ || Object.getPrototypeOf(Visualization)).call(this, props));

	    _this.audioProcess = _this.audioProcess.bind(_this);
	    return _this;
	  }

	  _createClass(Visualization, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.ctx = this.canvas.getContext('2d');
	    }
	  }, {
	    key: 'audioProcess',
	    value: function audioProcess(analyser) {
	      if (this.ctx) {
	        var gradient = this.ctx.createLinearGradient(0, 0, 0, 512);
	        gradient.addColorStop(1, '#000000');
	        gradient.addColorStop(0.75, '#2ecc71');
	        gradient.addColorStop(0.25, '#f1c40f');
	        gradient.addColorStop(0, '#e74c3c');

	        var array = new Uint8Array(analyser.frequencyBinCount);
	        analyser.getByteFrequencyData(array);
	        this.ctx.clearRect(0, 0, 800, 512);
	        this.ctx.fillStyle = gradient;

	        for (var i = 0; i < array.length; i++) {
	          var value = array[i];
	          this.ctx.fillRect(i * 12, 512, 10, value * -2);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement('canvas', {
	        className: 'react-music-canvas',
	        width: 800,
	        height: 512,
	        ref: function ref(c) {
	          _this2.canvas = c;
	        }
	      });
	    }
	  }]);

	  return Visualization;
	}(_react.Component);

	exports.default = Visualization;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Analyser = function (_Component) {
	  _inherits(Analyser, _Component);

	  function Analyser(props, context) {
	    _classCallCheck(this, Analyser);

	    var _this = _possibleConstructorReturn(this, (Analyser.__proto__ || Object.getPrototypeOf(Analyser)).call(this, props));

	    _this.visualization = context.audioContext.createScriptProcessor(2048, 1, 1);
	    _this.visualization.connect(context.audioContext.destination);

	    _this.connectNode = context.audioContext.createAnalyser();
	    _this.connectNode.connect(context.connectNode);
	    _this.applyProps = _this.applyProps.bind(_this);

	    _this.visualization.onaudioprocess = function () {
	      if (props.onAudioProcess) {
	        props.onAudioProcess(_this.connectNode);
	      }
	    };
	    return _this;
	  }

	  _createClass(Analyser, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.applyProps(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.applyProps(nextProps);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'applyProps',
	    value: function applyProps(props) {
	      for (var prop in props) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = props[prop];
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Analyser;
	}(_react.Component);

	Analyser.propTypes = {
	  children: _propTypes2.default.node,
	  fftSize: _propTypes2.default.number,
	  onAudioProcess: _propTypes2.default.func,
	  smoothingTimeConstant: _propTypes2.default.number
	};
	Analyser.defaultProps = {
	  fftSize: 128,
	  onAudioProcess: function onAudioProcess() {},
	  smoothingTimeConstant: 0.3
	};
	Analyser.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Analyser.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Analyser;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Bitcrusher = function (_Component) {
	  _inherits(Bitcrusher, _Component);

	  function Bitcrusher(props, context) {
	    _classCallCheck(this, Bitcrusher);

	    var _this = _possibleConstructorReturn(this, (Bitcrusher.__proto__ || Object.getPrototypeOf(Bitcrusher)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Bitcrusher({
	      bits: props.bits,
	      normfreq: props.normfreq,
	      bufferSize: props.bufferSize
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Bitcrusher, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Bitcrusher;
	}(_react.Component);

	Bitcrusher.propTypes = {
	  bits: _propTypes2.default.number,
	  bufferSize: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  normfreq: _propTypes2.default.number
	};
	Bitcrusher.defaultProps = {
	  bits: 8,
	  bufferSize: 256,
	  normfreq: 0.1
	};
	Bitcrusher.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Bitcrusher.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Bitcrusher;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bus = function (_Component) {
	  _inherits(Bus, _Component);

	  function Bus(props, context) {
	    _classCallCheck(this, Bus);

	    var _this = _possibleConstructorReturn(this, (Bus.__proto__ || Object.getPrototypeOf(Bus)).call(this, props));

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Bus, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var master = this.context.getMaster();
	      master.busses[this.props.id] = this.connectNode;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var master = this.context.getMaster();
	      delete master.busses[this.props.id];

	      this.connectNode.gain.value = nextProps.gain;
	      master.busses[nextProps.id] = this.connectNode;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	      delete this.context.getMaster().busses[this.props.id];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Bus;
	}(_react.Component);

	Bus.propTypes = {
	  children: _propTypes2.default.node,
	  gain: _propTypes2.default.number,
	  id: _propTypes2.default.string.isRequired
	};
	Bus.defaultProps = {
	  gain: 0.5
	};
	Bus.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func
	};
	Bus.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func
	};
	exports.default = Bus;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Chorus = function (_Component) {
	  _inherits(Chorus, _Component);

	  function Chorus(props, context) {
	    _classCallCheck(this, Chorus);

	    var _this = _possibleConstructorReturn(this, (Chorus.__proto__ || Object.getPrototypeOf(Chorus)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Chorus({
	      feedback: props.feedback,
	      rate: props.rate,
	      delay: props.delay,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Chorus, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Chorus;
	}(_react.Component);

	Chorus.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  delay: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  rate: _propTypes2.default.number
	};
	Chorus.defaultProps = {
	  bypass: 0,
	  delay: 0.0045,
	  feedback: 0.2,
	  rate: 1.5
	};
	Chorus.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Chorus.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Chorus;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Compressor = function (_Component) {
	  _inherits(Compressor, _Component);

	  function Compressor(props, context) {
	    _classCallCheck(this, Compressor);

	    var _this = _possibleConstructorReturn(this, (Compressor.__proto__ || Object.getPrototypeOf(Compressor)).call(this, props));

	    _this.connectNode = context.audioContext.createDynamicsCompressor();
	    _this.connectNode.connect(context.connectNode);

	    _this.applyProps = _this.applyProps.bind(_this);
	    return _this;
	  }

	  _createClass(Compressor, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.applyProps(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.applyProps(nextProps);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'applyProps',
	    value: function applyProps(props) {
	      for (var prop in props) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop].value = props[prop];
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Compressor;
	}(_react.Component);

	Compressor.propTypes = {
	  attack: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  knee: _propTypes2.default.number,
	  ratio: _propTypes2.default.number,
	  release: _propTypes2.default.number,
	  threshold: _propTypes2.default.number
	};
	Compressor.defaultProps = {
	  attack: 0.003,
	  knee: 32,
	  ratio: 12,
	  release: 0.25,
	  threshold: -24
	};
	Compressor.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Compressor.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Compressor;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Delay = function (_Component) {
	  _inherits(Delay, _Component);

	  function Delay(props, context) {
	    _classCallCheck(this, Delay);

	    var _this = _possibleConstructorReturn(this, (Delay.__proto__ || Object.getPrototypeOf(Delay)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Delay({
	      feedback: props.feedback,
	      delayTime: props.delayTime,
	      wetLevel: props.wetLevel,
	      dryLevel: props.dryLevel,
	      cutoff: props.cutoff,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Delay, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Delay;
	}(_react.Component);

	Delay.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  cutoff: _propTypes2.default.number,
	  delayTime: _propTypes2.default.number,
	  dryLevel: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	Delay.defaultProps = {
	  bypass: 0,
	  cutoff: 2000,
	  delayTime: 150,
	  dryLevel: 1,
	  feedback: 0.45,
	  wetLevel: 0.25
	};
	Delay.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Delay.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Delay;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Filter = function (_Component) {
	  _inherits(Filter, _Component);

	  function Filter(props, context) {
	    _classCallCheck(this, Filter);

	    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

	    _this.connectNode = context.audioContext.createBiquadFilter();
	    _this.connectNode.connect(context.connectNode);

	    _this.applyProps = _this.applyProps.bind(_this);
	    return _this;
	  }

	  _createClass(Filter, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.applyProps(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.applyProps(nextProps);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'applyProps',
	    value: function applyProps(props) {
	      for (var prop in props) {
	        if (this.connectNode[prop]) {
	          if (_typeof(this.connectNode[prop]) === 'object') {
	            this.connectNode[prop].value = props[prop];
	          } else {
	            this.connectNode[prop] = props[prop];
	          }
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Filter;
	}(_react.Component);

	Filter.propTypes = {
	  children: _propTypes2.default.node,
	  frequency: _propTypes2.default.number,
	  gain: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'])
	};
	Filter.defaultProps = {
	  frequency: 2000,
	  gain: 0,
	  type: 'lowpass'
	};
	Filter.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Filter.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Filter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Gain = function (_Component) {
	  _inherits(Gain, _Component);

	  function Gain(props, context) {
	    _classCallCheck(this, Gain);

	    var _this = _possibleConstructorReturn(this, (Gain.__proto__ || Object.getPrototypeOf(Gain)).call(this, props));

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.amount;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Gain, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.connectNode.gain.value = nextProps.amount;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Gain;
	}(_react.Component);

	Gain.propTypes = {
	  amount: _propTypes2.default.number,
	  children: _propTypes2.default.node
	};
	Gain.defaultProps = {
	  amount: 1.0
	};
	Gain.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Gain.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Gain;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LFO = function (_Component) {
	  _inherits(LFO, _Component);

	  function LFO() {
	    _classCallCheck(this, LFO);

	    return _possibleConstructorReturn(this, (LFO.__proto__ || Object.getPrototypeOf(LFO)).apply(this, arguments));
	  }

	  _createClass(LFO, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var volumeGain = this.context.audioContext.createGain();
	      volumeGain.gain.value = this.props.gain;
	      this.osc = this.context.audioContext.createOscillator();
	      this.osc.frequency.value = this.props.frequency;
	      this.osc.type = this.props.type;
	      this.osc.connect(volumeGain);
	      volumeGain.connect(this.props.connect(this.context.connectNode));

	      this.osc.start(this.context.audioContext.currentTime);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.osc.stop();
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return LFO;
	}(_react.Component);

	LFO.displayName = 'Synth';
	LFO.propTypes = {
	  children: _propTypes2.default.node,
	  connect: _propTypes2.default.func,
	  frequency: _propTypes2.default.number,
	  gain: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle'])
	};
	LFO.defaultProps = {
	  connect: function connect(node) {
	    return node.gain;
	  },
	  frequency: 1,
	  gain: 0.5,
	  type: 'sine'
	};
	LFO.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = LFO;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _noteParser = __webpack_require__(8);

	var _noteParser2 = _interopRequireDefault(_noteParser);

	var _audioContour = __webpack_require__(5);

	var _audioContour2 = _interopRequireDefault(_audioContour);

	var _uuid = __webpack_require__(4);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Monosynth = function (_Component) {
	  _inherits(Monosynth, _Component);

	  function Monosynth(props, context) {
	    _classCallCheck(this, Monosynth);

	    var _this = _possibleConstructorReturn(this, (Monosynth.__proto__ || Object.getPrototypeOf(Monosynth)).call(this, props));

	    _this.getSteps = _this.getSteps.bind(_this);
	    _this.playStep = _this.playStep.bind(_this);

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Monosynth, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.id = _uuid2.default.v1();
	      var master = this.context.getMaster();
	      master.instruments[this.id] = this.getSteps;

	      this.amplitudeGain = this.context.audioContext.createGain();
	      this.amplitudeGain.gain.value = 0;
	      this.amplitudeGain.connect(this.connectNode);

	      this.osc = this.context.audioContext.createOscillator();
	      this.osc.type = this.props.type;
	      this.osc.connect(this.amplitudeGain);

	      if (this.props.busses) {
	        this.props.busses.forEach(function (bus) {
	          if (master.busses[bus]) {
	            _this2.osc.connect(master.busses[bus]);
	          }
	        });
	      }

	      this.osc.start(this.context.audioContext.currentTime);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var master = this.context.getMaster();
	      delete master.instruments[this.id];
	      this.osc.stop();
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'getSteps',
	    value: function getSteps(playbackTime) {
	      var _this3 = this;

	      var totalBars = this.context.getMaster().getMaxBars();
	      var loopCount = totalBars / this.context.bars;

	      var _loop = function _loop(i) {
	        var barOffset = _this3.context.barInterval * _this3.context.bars * i / 1000;
	        var stepInterval = _this3.context.barInterval / _this3.context.resolution;
	        _this3.props.steps.forEach(function (step, index) {
	          var time = barOffset + step[0] * stepInterval / 1000;
	          var glide = false;

	          if (index !== 0) {
	            var lastTime = barOffset + _this3.props.steps[index - 1][0] * stepInterval / 1000;
	            var lastDuration = _this3.props.steps[index - 1][1] * stepInterval / 1000;
	            glide = lastTime + lastDuration > time;
	          }

	          _this3.context.scheduler.insert(playbackTime + time, _this3.playStep, {
	            time: playbackTime,
	            step: step,
	            glide: glide
	          });
	        });
	      };

	      for (var i = 0; i < loopCount; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: 'createOscillator',
	    value: function createOscillator() {
	      var _arguments = Array.prototype.slice.call(arguments),
	          time = _arguments[0],
	          note = _arguments[1],
	          duration = _arguments[2],
	          glide = _arguments[3];

	      var transposed = note.slice(0, -1) + (parseInt(note[note.length - 1], 0) + parseInt(this.props.transpose, 0));

	      var env = (0, _audioContour2.default)(this.context.audioContext, {
	        attack: this.props.envelope.attack,
	        decay: this.props.envelope.decay,
	        sustain: this.props.envelope.sustain,
	        release: this.props.envelope.release
	      });

	      env.connect(this.amplitudeGain.gain);
	      this.osc.frequency.setTargetAtTime(_noteParser2.default.freq(transposed), time, glide ? this.props.glide : 0.001);

	      env.start(time);
	      env.stop(this.context.audioContext.currentTime + duration);
	    }
	  }, {
	    key: 'playStep',
	    value: function playStep(e) {
	      var _e$args = e.args,
	          step = _e$args.step,
	          glide = _e$args.glide,
	          time = _e$args.time;

	      var note = step[2];
	      var stepInterval = this.context.barInterval / this.context.resolution;
	      var duration = step[1] * stepInterval / 1000;
	      this.createOscillator(time, note, duration, glide);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Monosynth;
	}(_react.Component);

	Monosynth.displayName = 'Synth';
	Monosynth.propTypes = {
	  busses: _propTypes2.default.array,
	  children: _propTypes2.default.node,
	  envelope: _propTypes2.default.shape({
	    attack: _propTypes2.default.number,
	    decay: _propTypes2.default.number,
	    sustain: _propTypes2.default.number,
	    release: _propTypes2.default.number
	  }),
	  gain: _propTypes2.default.number,
	  glide: _propTypes2.default.number,
	  steps: _propTypes2.default.array.isRequired,
	  transpose: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired
	};
	Monosynth.defaultProps = {
	  envelope: {
	    attack: 0.01,
	    decay: 0.2,
	    sustain: 0.2,
	    release: 0.2
	  },
	  gain: 0.5,
	  glide: 0.1,
	  transpose: 0
	};
	Monosynth.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	Monosynth.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Monosynth;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var MoogFilter = function (_Component) {
	  _inherits(MoogFilter, _Component);

	  function MoogFilter(props, context) {
	    _classCallCheck(this, MoogFilter);

	    var _this = _possibleConstructorReturn(this, (MoogFilter.__proto__ || Object.getPrototypeOf(MoogFilter)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.MoogFilter({
	      cutoff: props.cutoff,
	      resonance: props.resonance,
	      bufferSize: props.bufferSize
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(MoogFilter, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return MoogFilter;
	}(_react.Component);

	MoogFilter.propTypes = {
	  bufferSize: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  cutoff: _propTypes2.default.number,
	  resonance: _propTypes2.default.number
	};
	MoogFilter.defaultProps = {
	  bufferSize: 256,
	  cutoff: 0.065,
	  resonance: 3.5
	};
	MoogFilter.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	MoogFilter.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = MoogFilter;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Overdrive = function (_Component) {
	  _inherits(Overdrive, _Component);

	  function Overdrive(props, context) {
	    _classCallCheck(this, Overdrive);

	    var _this = _possibleConstructorReturn(this, (Overdrive.__proto__ || Object.getPrototypeOf(Overdrive)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Overdrive({
	      outputGain: props.outputGain,
	      drive: props.drive,
	      curveAmount: props.curveAmount,
	      algorithmIndex: props.algorithmIndex,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Overdrive, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Overdrive;
	}(_react.Component);

	Overdrive.propTypes = {
	  algorithmIndex: _propTypes2.default.number,
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  curveAmount: _propTypes2.default.number,
	  drive: _propTypes2.default.number,
	  outputGain: _propTypes2.default.number
	};
	Overdrive.defaultProps = {
	  algorithmIndex: 0,
	  bypass: 0,
	  curveAmount: 1,
	  drive: 0.7,
	  outputGain: 0.5
	};
	Overdrive.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Overdrive.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Overdrive;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var PingPong = function (_Component) {
	  _inherits(PingPong, _Component);

	  function PingPong(props, context) {
	    _classCallCheck(this, PingPong);

	    var _this = _possibleConstructorReturn(this, (PingPong.__proto__ || Object.getPrototypeOf(PingPong)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.PingPongDelay({
	      wetLevel: props.wetLevel,
	      feedback: props.feedback,
	      delayTimeLeft: props.delayTimeLeft,
	      delayTimeRight: props.delayTimeRight
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(PingPong, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return PingPong;
	}(_react.Component);

	PingPong.propTypes = {
	  children: _propTypes2.default.node,
	  delayTimeLeft: _propTypes2.default.number,
	  delayTimeRight: _propTypes2.default.number,
	  feedback: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	PingPong.defaultProps = {
	  delayTimeLeft: 150,
	  delayTimeRight: 200,
	  feedback: 0.3,
	  wetLevel: 0.5
	};
	PingPong.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	PingPong.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = PingPong;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tunajs = __webpack_require__(3);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-restricted-syntax */


	var Reverb = function (_Component) {
	  _inherits(Reverb, _Component);

	  function Reverb(props, context) {
	    _classCallCheck(this, Reverb);

	    var _this = _possibleConstructorReturn(this, (Reverb.__proto__ || Object.getPrototypeOf(Reverb)).call(this, props));

	    var tuna = new _tunajs2.default(context.audioContext);

	    _this.connectNode = new tuna.Convolver({
	      highCut: props.highCut,
	      lowCut: props.lowCut,
	      dryLevel: props.dryLevel,
	      wetLevel: props.wetLevel,
	      level: props.level,
	      impulse: props.impulse,
	      bypass: props.bypass
	    });

	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Reverb, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      for (var prop in nextProps) {
	        if (this.connectNode[prop]) {
	          this.connectNode[prop] = nextProps[prop];
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Reverb;
	}(_react.Component);

	Reverb.propTypes = {
	  bypass: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  dryLevel: _propTypes2.default.number,
	  highCut: _propTypes2.default.number,
	  impulse: _propTypes2.default.string,
	  level: _propTypes2.default.number,
	  lowCut: _propTypes2.default.number,
	  wetLevel: _propTypes2.default.number
	};
	Reverb.defaultProps = {
	  bypass: 0,
	  dryLevel: 0.5,
	  highCut: 22050,
	  impulse: 'reverb/room.wav',
	  level: 1,
	  lowCut: 20,
	  wetLevel: 1
	};
	Reverb.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	Reverb.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  connectNode: _propTypes2.default.object
	};
	exports.default = Reverb;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _uuid = __webpack_require__(4);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _bufferLoader = __webpack_require__(31);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sampler = function (_Component) {
	  _inherits(Sampler, _Component);

	  function Sampler(props, context) {
	    _classCallCheck(this, Sampler);

	    var _this = _possibleConstructorReturn(this, (Sampler.__proto__ || Object.getPrototypeOf(Sampler)).call(this, props));

	    _this.bufferLoaded = _this.bufferLoaded.bind(_this);
	    _this.getSteps = _this.getSteps.bind(_this);
	    _this.playStep = _this.playStep.bind(_this);

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Sampler, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.id = _uuid2.default.v1();

	      var master = this.context.getMaster();
	      master.instruments[this.id] = this.getSteps;
	      master.buffers[this.id] = 1;

	      var bufferLoader = new _bufferLoader.BufferLoader(this.context.audioContext, [this.props.sample], this.bufferLoaded);

	      bufferLoader.load();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.connectNode.gain.value = nextProps.gain;
	      if (this.props.sample !== nextProps.sample) {
	        var master = this.context.getMaster();
	        delete master.buffers[this.id];

	        this.id = _uuid2.default.v1();
	        master.buffers[this.id] = 1;

	        var bufferLoader = new _bufferLoader.BufferLoader(this.context.audioContext, [nextProps.sample], this.bufferLoaded);

	        bufferLoader.load();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var master = this.context.getMaster();

	      delete master.buffers[this.id];
	      delete master.instruments[this.id];
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'getSteps',
	    value: function getSteps(playbackTime) {
	      var _this2 = this;

	      var totalBars = this.context.getMaster().getMaxBars();
	      var loopCount = totalBars / this.context.bars;

	      var _loop = function _loop(i) {
	        var barOffset = _this2.context.barInterval * _this2.context.bars * i / 1000;
	        var stepInterval = _this2.context.barInterval / _this2.context.resolution;

	        _this2.props.steps.forEach(function (step) {
	          var stepValue = Array.isArray(step) ? step[0] : step;
	          var time = barOffset + stepValue * stepInterval / 1000;

	          _this2.context.scheduler.insert(playbackTime + time, _this2.playStep, {
	            time: playbackTime,
	            step: step
	          });
	        });
	      };

	      for (var i = 0; i < loopCount; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: 'playStep',
	    value: function playStep(e) {
	      var source = this.context.audioContext.createBufferSource();
	      source.buffer = this.buffer;
	      if (source.detune) {
	        if (Array.isArray(e.args.step)) {
	          source.detune.value = (this.props.detune + e.args.step[1]) * 100;
	        } else {
	          source.detune.value = this.props.detune;
	        }
	      }
	      source.connect(this.connectNode);

	      if (this.props.busses) {
	        var master = this.context.getMaster();
	        this.props.busses.forEach(function (bus) {
	          if (master.busses[bus]) {
	            source.connect(master.busses[bus]);
	          }
	        });
	      }

	      source.start(e.args.playbackTime);
	      this.context.scheduler.nextTick(e.args.playbackTime + this.buffer.duration, function () {
	        source.disconnect();
	      });
	    }
	  }, {
	    key: 'bufferLoaded',
	    value: function bufferLoaded(buffers) {
	      this.buffer = buffers[0];
	      var master = this.context.getMaster();
	      delete master.buffers[this.id];
	      this.context.bufferLoaded();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Sampler;
	}(_react.Component);

	Sampler.displayName = 'Sampler';
	Sampler.propTypes = {
	  busses: _propTypes2.default.array,
	  children: _propTypes2.default.node,
	  detune: _propTypes2.default.number,
	  gain: _propTypes2.default.number,
	  sample: _propTypes2.default.string.isRequired,
	  steps: _propTypes2.default.array.isRequired
	};
	Sampler.defaultProps = {
	  detune: 0,
	  gain: 0.5
	};
	Sampler.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  bufferLoaded: _propTypes2.default.func,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	Sampler.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  bufferLoaded: _propTypes2.default.func,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Sampler;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _uuid = __webpack_require__(4);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sequencer = function (_Component) {
	  _inherits(Sequencer, _Component);

	  function Sequencer() {
	    _classCallCheck(this, Sequencer);

	    return _possibleConstructorReturn(this, (Sequencer.__proto__ || Object.getPrototypeOf(Sequencer)).apply(this, arguments));
	  }

	  _createClass(Sequencer, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        bars: this.props.bars,
	        resolution: this.props.resolution
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.id = _uuid2.default.v1();
	      var master = this.context.getMaster();
	      master.bars[this.id] = this.props.bars;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var master = this.context.getMaster();
	      master.bars[this.id] = nextProps.bars;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      delete this.context.getMaster().bars[this.id];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Sequencer;
	}(_react.Component);

	Sequencer.propTypes = {
	  bars: _propTypes2.default.number,
	  children: _propTypes2.default.node,
	  resolution: _propTypes2.default.number
	};
	Sequencer.defaultProps = {
	  bars: 1,
	  resolution: 16
	};
	Sequencer.contextTypes = {
	  getMaster: _propTypes2.default.func
	};
	Sequencer.childContextTypes = {
	  bars: _propTypes2.default.number,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number
	};
	exports.default = Sequencer;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _scheduler = __webpack_require__(32);

	var _scheduler2 = _interopRequireDefault(_scheduler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable no-loop-func, react/no-did-mount-set-state */


	var Song = function (_Component) {
	  _inherits(Song, _Component);

	  function Song(props) {
	    _classCallCheck(this, Song);

	    var _this = _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).call(this, props));

	    _this.state = {
	      buffersLoaded: false
	    };

	    _this.barInterval = 60000 / props.tempo * 4;
	    _this.bars = {};
	    _this.buffers = {};
	    _this.instruments = {};
	    _this.busses = {};

	    _this.loop = _this.loop.bind(_this);
	    _this.bufferLoaded = _this.bufferLoaded.bind(_this);
	    _this.getMaster = _this.getMaster.bind(_this);
	    _this.getMaxBars = _this.getMaxBars.bind(_this);

	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    _this.audioContext = new AudioContext();

	    _this.scheduler = new _scheduler2.default({
	      context: _this.audioContext
	    });
	    return _this;
	  }

	  _createClass(Song, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        tempo: this.props.tempo,
	        audioContext: this.audioContext,
	        barInterval: this.barInterval,
	        bufferLoaded: this.bufferLoaded,
	        connectNode: this.audioContext.destination,
	        getMaster: this.getMaster,
	        scheduler: this.scheduler
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (Object.keys(this.buffers).length === 0) {
	        this.setState({
	          buffersLoaded: true
	        });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.barInterval = 60000 / nextProps.tempo * 4;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _this2 = this;

	      if (prevState.buffersLoaded !== this.state.buffersLoaded || prevProps.playing !== this.props.playing) {
	        if (this.state.buffersLoaded === true && this.props.playing === true) {
	          setTimeout(function () {
	            _this2.scheduler.start(_this2.loop);
	          }, 0);
	        } else {
	          this.scheduler.stop(true);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.audioContext.close();
	    }
	  }, {
	    key: 'getMaster',
	    value: function getMaster() {
	      return this;
	    }
	  }, {
	    key: 'getMaxBars',
	    value: function getMaxBars() {
	      var _this3 = this;

	      return Math.max.apply(Math, _toConsumableArray(Object.keys(this.bars).map(function (b) {
	        return _this3.bars[b];
	      })));
	    }
	  }, {
	    key: 'bufferLoaded',
	    value: function bufferLoaded() {
	      if (Object.keys(this.buffers).length === 0) {
	        this.setState({
	          buffersLoaded: true
	        });
	      }
	    }
	  }, {
	    key: 'loop',
	    value: function loop(e) {
	      var _this4 = this;

	      var maxBars = Object.keys(this.bars).length ? this.getMaxBars() : 1;
	      Object.keys(this.instruments).forEach(function (id) {
	        var callback = _this4.instruments[id];
	        callback(e.playbackTime);
	      });
	      this.scheduler.insert(e.playbackTime + this.barInterval * maxBars / 1000, this.loop);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Song;
	}(_react.Component);

	Song.propTypes = {
	  children: _propTypes2.default.node,
	  playing: _propTypes2.default.bool,
	  tempo: _propTypes2.default.number
	};
	Song.defaultProps = {
	  playing: false,
	  tempo: 90
	};
	Song.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  barInterval: _propTypes2.default.number,
	  bufferLoaded: _propTypes2.default.func,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Song;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _noteParser = __webpack_require__(8);

	var _noteParser2 = _interopRequireDefault(_noteParser);

	var _audioContour = __webpack_require__(5);

	var _audioContour2 = _interopRequireDefault(_audioContour);

	var _uuid = __webpack_require__(4);

	var _uuid2 = _interopRequireDefault(_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/* eslint-disable max-statements */


	var Synth = function (_Component) {
	  _inherits(Synth, _Component);

	  function Synth(props, context) {
	    _classCallCheck(this, Synth);

	    var _this = _possibleConstructorReturn(this, (Synth.__proto__ || Object.getPrototypeOf(Synth)).call(this, props));

	    _this.getSteps = _this.getSteps.bind(_this);
	    _this.playStep = _this.playStep.bind(_this);

	    _this.connectNode = context.audioContext.createGain();
	    _this.connectNode.gain.value = props.gain;
	    _this.connectNode.connect(context.connectNode);
	    return _this;
	  }

	  _createClass(Synth, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return _extends({}, this.context, {
	        connectNode: this.connectNode
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.id = _uuid2.default.v1();
	      var master = this.context.getMaster();
	      master.instruments[this.id] = this.getSteps;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.connectNode.gain.value = nextProps.gain;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var master = this.context.getMaster();
	      delete master.instruments[this.id];
	      this.connectNode.disconnect();
	    }
	  }, {
	    key: 'getSteps',
	    value: function getSteps(playbackTime) {
	      var _this2 = this;

	      var totalBars = this.context.getMaster().getMaxBars();
	      var loopCount = totalBars / this.context.bars;

	      var _loop = function _loop(i) {
	        var barOffset = _this2.context.barInterval * _this2.context.bars * i / 1000;
	        var stepInterval = _this2.context.barInterval / _this2.context.resolution;
	        _this2.props.steps.forEach(function (step) {
	          var time = barOffset + step[0] * stepInterval / 1000;

	          _this2.context.scheduler.insert(playbackTime + time, _this2.playStep, {
	            time: playbackTime,
	            step: step
	          });
	        });
	      };

	      for (var i = 0; i < loopCount; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: 'createOscillator',
	    value: function createOscillator(time, note, duration) {
	      var amplitudeGain = this.context.audioContext.createGain();
	      amplitudeGain.gain.value = 0;
	      amplitudeGain.connect(this.connectNode);

	      var env = (0, _audioContour2.default)(this.context.audioContext, {
	        attack: this.props.envelope.attack,
	        decay: this.props.envelope.decay,
	        sustain: this.props.envelope.sustain,
	        release: this.props.envelope.release
	      });

	      env.connect(amplitudeGain.gain);

	      var osc = this.context.audioContext.createOscillator();
	      var transposed = note.slice(0, -1) + (parseInt(note[note.length - 1], 0) + parseInt(this.props.transpose, 0));

	      osc.frequency.value = _noteParser2.default.freq(transposed);
	      osc.type = this.props.type;
	      osc.connect(amplitudeGain);

	      if (this.props.busses) {
	        var master = this.context.getMaster();
	        this.props.busses.forEach(function (bus) {
	          if (master.busses[bus]) {
	            osc.connect(master.busses[bus]);
	          }
	        });
	      }

	      osc.start(time);
	      env.start(time);

	      var finish = env.stop(this.context.audioContext.currentTime + duration);
	      osc.stop(finish);
	    }
	  }, {
	    key: 'playStep',
	    value: function playStep(e) {
	      var _this3 = this;

	      var _e$args = e.args,
	          step = _e$args.step,
	          time = _e$args.time;

	      var notes = step[2];
	      var stepInterval = this.context.barInterval / this.context.resolution;
	      var duration = step[1] * stepInterval / 1000;

	      if (Array.isArray(notes)) {
	        notes.forEach(function (n) {
	          _this3.createOscillator(time, n, duration);
	        });
	      } else {
	        this.createOscillator(time, notes, duration);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Synth;
	}(_react.Component);

	Synth.displayName = 'Synth';
	Synth.propTypes = {
	  busses: _propTypes2.default.array,
	  children: _propTypes2.default.node,
	  envelope: _propTypes2.default.shape({
	    attack: _propTypes2.default.number,
	    decay: _propTypes2.default.number,
	    sustain: _propTypes2.default.number,
	    release: _propTypes2.default.number
	  }),
	  gain: _propTypes2.default.number,
	  steps: _propTypes2.default.array.isRequired,
	  transpose: _propTypes2.default.number,
	  type: _propTypes2.default.oneOf(['sine', 'square', 'sawtooth', 'triangle']).isRequired
	};
	Synth.defaultProps = {
	  envelope: {
	    attack: 0.01,
	    decay: 0.2,
	    sustain: 0.2,
	    release: 0.2
	  },
	  gain: 0.5,
	  transpose: 0
	};
	Synth.contextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	Synth.childContextTypes = {
	  audioContext: _propTypes2.default.object,
	  bars: _propTypes2.default.number,
	  barInterval: _propTypes2.default.number,
	  connectNode: _propTypes2.default.object,
	  getMaster: _propTypes2.default.func,
	  resolution: _propTypes2.default.number,
	  scheduler: _propTypes2.default.object,
	  tempo: _propTypes2.default.number
	};
	exports.default = Synth;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/* eslint-disable no-console */
	var BufferLoader = exports.BufferLoader = function BufferLoader(context, urlList, callback) {
	  this.context = context;
	  this.urlList = urlList;
	  this.onload = callback;
	  this.bufferList = [];
	  this.loadCount = 0;
	};

	BufferLoader.prototype.loadBuffer = function loadBuffer(url, index) {
	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);
	  request.responseType = 'arraybuffer';

	  var self = this;

	  request.onload = function onload() {
	    self.context.decodeAudioData(request.response, function (buffer) {
	      if (!buffer) {
	        console.error('error decoding file data: ' + url);
	        return;
	      }
	      self.bufferList[index] = buffer;
	      if (++self.loadCount === self.urlList.length) {
	        self.onload(self.bufferList);
	      }
	    }, function (error) {
	      console.error('decodeAudioData error', error);
	    });
	  };

	  request.onerror = function onError() {
	    console.error('BufferLoader: XHR error');
	  };

	  request.send();
	};

	BufferLoader.prototype.load = function load() {
	  for (var i = 0; i < this.urlList.length; ++i) {
	    this.loadBuffer(this.urlList[i], i);
	  }
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scheduler = function () {
	  function Scheduler(opts) {
	    _classCallCheck(this, Scheduler);

	    this.context = opts.context;
	    this.interval = 0.025;
	    this.aheadTime = 0.0;
	    this.playbackTime = this.context.currentTime;

	    this.timerID = 0;
	    this.scheduleID = 0;
	    this.schedules = [];
	  }

	  _createClass(Scheduler, [{
	    key: 'start',
	    value: function start(callback, args) {
	      var _this = this;

	      var loop = function loop() {
	        var t0 = _this.context.currentTime;
	        var t1 = t0 + _this.aheadTime;

	        _this.process(t0, t1);
	      };

	      if (this.timerID === 0) {
	        this.timerID = setInterval(loop, this.interval * 1000);

	        if (callback) {
	          this.insert(this.context.currentTime, callback, args);
	          loop();
	        }
	      } else {
	        this.insert(this.context.currentTime, callback, args);
	      }

	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop(reset) {
	      if (this.timerID !== 0) {
	        clearInterval(this.timerID);
	        this.timerID = 0;
	      }

	      if (reset) {
	        this.schedules.splice(0);
	      }

	      return this;
	    }
	  }, {
	    key: 'insert',
	    value: function insert(time, callback, args) {
	      var id = ++this.scheduleID;
	      var event = { id: id, time: time, callback: callback, args: args };

	      if (this.schedules.length === 0 || this.schedules[this.schedules.length - 1].time <= time) {
	        this.schedules.push(event);
	      } else {
	        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
	          if (time < this.schedules[i].time) {
	            this.schedules.splice(i, 0, event);
	            break;
	          }
	        }
	      }

	      return id;
	    }
	  }, {
	    key: 'nextTick',
	    value: function nextTick(time, callback, args) {
	      return this.insert(time + this.aheadTime, callback, args);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(scheduleID) {
	      if (typeof scheduleID === 'number') {
	        for (var i = 0, imax = this.schedules.length; i < imax; i++) {
	          if (scheduleID === this.schedules[i].id) {
	            this.schedules.splice(i, 1);
	            break;
	          }
	        }
	      }

	      return scheduleID;
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this.schedules.splice(0);
	    }
	  }, {
	    key: 'process',
	    value: function process(t0, t1) {
	      this.playbackTime = t0;

	      while (this.schedules.length && this.schedules[0].time < t1) {
	        var event = this.schedules.shift();
	        var playbackTime = event.time;
	        var args = event.args;

	        this.playbackTime = playbackTime;

	        event.callback({ playbackTime: playbackTime, args: args });
	      }

	      this.playbackTime = t0;
	    }
	  }]);

	  return Scheduler;
	}();

	exports.default = Scheduler;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(34)();
	// imports


	// module
	exports.push([module.id, ".react-music-canvas {\n  display: block;\n  margin: 0 auto 0;\n  border: 1px solid #aaa;\n  padding: 10px;\n}\n\n.react-music-button {\n  display: block;\n  text-decoration: none;\n  background-color: #f7f7f7;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));\n  background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);\n  background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);\n  color: #a7a7a7;\n  margin: 30px auto;\n  width: 108px;\n  height: 108px;\n  position: relative;\n  text-align: center;\n  line-height: 108px;\n  border-radius: 50%;\n  box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;\n  border: solid 1px transparent;\n  outline: none;\n  font-size: 16px;\n  text-transform: uppercase;\n}\n\n.react-music-button:before {\n  content: \"\";\n  display: block;\n  background: #fff;\n  border-top: 2px solid #ddd;\n  position: absolute;\n  top: -9px;\n  left: -9px;\n  bottom: -9px;\n  right: -9px;\n  z-index: -1;\n  border-radius: 50%;\n  box-shadow: inset 0px 8px 48px #ddd;\n}\n\n.react-music-button:active {\n  box-shadow: none;\n  border: solid 1px #a7a7a7;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {display:none;}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n", ""]);

	// exports


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(36);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.13.1
	 * react-dom.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	/*
	 Modernizr 3.0.0pre (Custom Build) | MIT
	*/
	'use strict';var aa=__webpack_require__(1),n=__webpack_require__(9),r=__webpack_require__(46);function u(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(u(227));
	function ba(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var da=!1,ea=null,fa=!1,ha=null,ia={onError:function(a){da=!0;ea=a}};function ja(a,b,c,d,e,f,g,h,k){da=!1;ea=null;ba.apply(ia,arguments)}function ka(a,b,c,d,e,f,g,h,k){ja.apply(this,arguments);if(da){if(da){var l=ea;da=!1;ea=null}else throw Error(u(198));fa||(fa=!0,ha=l)}}var la=null,ma=null,na=null;
	function oa(a,b,c){var d=a.type||"unknown-event";a.currentTarget=na(c);ka(d,b,void 0,a);a.currentTarget=null}var pa=null,qa={};
	function ra(){if(pa)for(var a in qa){var b=qa[a],c=pa.indexOf(a);if(!(-1<c))throw Error(u(96,a));if(!sa[c]){if(!b.extractEvents)throw Error(u(97,a));sa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;if(ta.hasOwnProperty(h))throw Error(u(99,h));ta[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ua(k[e],g,h);e=!0}else f.registrationName?(ua(f.registrationName,g,h),e=!0):e=!1;if(!e)throw Error(u(98,d,a));}}}}
	function ua(a,b,c){if(va[a])throw Error(u(100,a));va[a]=b;wa[a]=b.eventTypes[c].dependencies}var sa=[],ta={},va={},wa={};function xa(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];if(!qa.hasOwnProperty(c)||qa[c]!==d){if(qa[c])throw Error(u(102,c));qa[c]=d;b=!0}}b&&ra()}var ya=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),za=null,Aa=null,Ba=null;
	function Ca(a){if(a=ma(a)){if("function"!==typeof za)throw Error(u(280));var b=a.stateNode;b&&(b=la(b),za(a.stateNode,a.type,b))}}function Da(a){Aa?Ba?Ba.push(a):Ba=[a]:Aa=a}function Ea(){if(Aa){var a=Aa,b=Ba;Ba=Aa=null;Ca(a);if(b)for(a=0;a<b.length;a++)Ca(b[a])}}function Fa(a,b){return a(b)}function Ga(a,b,c,d,e){return a(b,c,d,e)}function Ha(){}var Ia=Fa,Ja=!1,Ka=!1;function La(){if(null!==Aa||null!==Ba)Ha(),Ea()}
	function Ma(a,b,c){if(Ka)return a(b,c);Ka=!0;try{return Ia(a,b,c)}finally{Ka=!1,La()}}var Na=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Oa=Object.prototype.hasOwnProperty,Pa={},Qa={};
	function Ra(a){if(Oa.call(Qa,a))return!0;if(Oa.call(Pa,a))return!1;if(Na.test(a))return Qa[a]=!0;Pa[a]=!0;return!1}function Sa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
	function Ta(a,b,c,d){if(null===b||"undefined"===typeof b||Sa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f}var C={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){C[a]=new v(a,0,!1,a,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];C[b]=new v(b,1,!1,a[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){C[a]=new v(a,2,!1,a.toLowerCase(),null,!1)});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){C[a]=new v(a,2,!1,a,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){C[a]=new v(a,3,!1,a.toLowerCase(),null,!1)});
	["checked","multiple","muted","selected"].forEach(function(a){C[a]=new v(a,3,!0,a,null,!1)});["capture","download"].forEach(function(a){C[a]=new v(a,4,!1,a,null,!1)});["cols","rows","size","span"].forEach(function(a){C[a]=new v(a,6,!1,a,null,!1)});["rowSpan","start"].forEach(function(a){C[a]=new v(a,5,!1,a.toLowerCase(),null,!1)});var Ua=/[\-:]([a-z])/g;function Va(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Ua,
	Va);C[b]=new v(b,1,!1,a,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Ua,Va);C[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Ua,Va);C[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(a){C[a]=new v(a,1,!1,a.toLowerCase(),null,!1)});
	C.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(a){C[a]=new v(a,1,!1,a.toLowerCase(),null,!0)});var Wa=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Wa.hasOwnProperty("ReactCurrentDispatcher")||(Wa.ReactCurrentDispatcher={current:null});Wa.hasOwnProperty("ReactCurrentBatchConfig")||(Wa.ReactCurrentBatchConfig={suspense:null});
	function Xa(a,b,c,d){var e=C.hasOwnProperty(b)?C[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Ta(b,c,e,d)&&(c=null),d||null===e?Ra(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
	var Ya=/^(.*)[\\\/]/,E="function"===typeof Symbol&&Symbol.for,Za=E?Symbol.for("react.element"):60103,$a=E?Symbol.for("react.portal"):60106,ab=E?Symbol.for("react.fragment"):60107,bb=E?Symbol.for("react.strict_mode"):60108,cb=E?Symbol.for("react.profiler"):60114,db=E?Symbol.for("react.provider"):60109,eb=E?Symbol.for("react.context"):60110,fb=E?Symbol.for("react.concurrent_mode"):60111,gb=E?Symbol.for("react.forward_ref"):60112,hb=E?Symbol.for("react.suspense"):60113,ib=E?Symbol.for("react.suspense_list"):
	60120,jb=E?Symbol.for("react.memo"):60115,kb=E?Symbol.for("react.lazy"):60116,lb=E?Symbol.for("react.block"):60121,mb="function"===typeof Symbol&&Symbol.iterator;function nb(a){if(null===a||"object"!==typeof a)return null;a=mb&&a[mb]||a["@@iterator"];return"function"===typeof a?a:null}function ob(a){if(-1===a._status){a._status=0;var b=a._ctor;b=b();a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}}
	function pb(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ab:return"Fragment";case $a:return"Portal";case cb:return"Profiler";case bb:return"StrictMode";case hb:return"Suspense";case ib:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case eb:return"Context.Consumer";case db:return"Context.Provider";case gb:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":
	"ForwardRef");case jb:return pb(a.type);case lb:return pb(a.render);case kb:if(a=1===a._status?a._result:null)return pb(a)}return null}function qb(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=pb(a.type);c=null;d&&(c=pb(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(Ya,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f}b+=c;a=a.return}while(a);return b}
	function rb(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function sb(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function tb(a){var b=sb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
	null;delete a[b]}}}}function xb(a){a._valueTracker||(a._valueTracker=tb(a))}function yb(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=sb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function zb(a,b){var c=b.checked;return n({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
	function Ab(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=rb(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Bb(a,b){b=b.checked;null!=b&&Xa(a,"checked",b,!1)}
	function Cb(a,b){Bb(a,b);var c=rb(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Db(a,b.type,c):b.hasOwnProperty("defaultValue")&&Db(a,b.type,rb(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
	function Eb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
	function Db(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Fb(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function Gb(a,b){a=n({children:void 0},b);if(b=Fb(b.children))a.children=b;return a}
	function Hb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+rb(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
	function Ib(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(u(91));return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Jb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(u(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(u(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:rb(c)}}
	function Kb(a,b){var c=rb(b.value),d=rb(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function Lb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var Mb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function Nb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ob(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Nb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var Pb,Qb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Mb.svg||"innerHTML"in a)a.innerHTML=b;else{Pb=Pb||document.createElement("div");Pb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Pb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
	function Rb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}function Sb(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Tb={animationend:Sb("Animation","AnimationEnd"),animationiteration:Sb("Animation","AnimationIteration"),animationstart:Sb("Animation","AnimationStart"),transitionend:Sb("Transition","TransitionEnd")},Ub={},Vb={};
	ya&&(Vb=document.createElement("div").style,"AnimationEvent"in window||(delete Tb.animationend.animation,delete Tb.animationiteration.animation,delete Tb.animationstart.animation),"TransitionEvent"in window||delete Tb.transitionend.transition);function Wb(a){if(Ub[a])return Ub[a];if(!Tb[a])return a;var b=Tb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Vb)return Ub[a]=b[c];return a}
	var Xb=Wb("animationend"),Yb=Wb("animationiteration"),Zb=Wb("animationstart"),$b=Wb("transitionend"),ac="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bc=new ("function"===typeof WeakMap?WeakMap:Map);function cc(a){var b=bc.get(a);void 0===b&&(b=new Map,bc.set(a,b));return b}
	function dc(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.effectTag&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function ec(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function fc(a){if(dc(a)!==a)throw Error(u(188));}
	function gc(a){var b=a.alternate;if(!b){b=dc(a);if(null===b)throw Error(u(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return fc(e),a;if(f===d)return fc(e),b;f=f.sibling}throw Error(u(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
	c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(u(189));}}if(c.alternate!==d)throw Error(u(190));}if(3!==c.tag)throw Error(u(188));return c.stateNode.current===c?a:b}function hc(a){a=gc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
	function ic(a,b){if(null==b)throw Error(u(30));if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function jc(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var kc=null;
	function lc(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++)oa(a,b[d],c[d]);else b&&oa(a,b,c);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function mc(a){null!==a&&(kc=ic(kc,a));a=kc;kc=null;if(a){jc(a,lc);if(kc)throw Error(u(95));if(fa)throw a=ha,fa=!1,ha=null,a;}}
	function nc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function oc(a){if(!ya)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}var pc=[];function qc(a){a.topLevelType=null;a.nativeEvent=null;a.targetInst=null;a.ancestors.length=0;10>pc.length&&pc.push(a)}
	function rc(a,b,c,d){if(pc.length){var e=pc.pop();e.topLevelType=a;e.eventSystemFlags=d;e.nativeEvent=b;e.targetInst=c;return e}return{topLevelType:a,eventSystemFlags:d,nativeEvent:b,targetInst:c,ancestors:[]}}
	function sc(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d=c;if(3===d.tag)d=d.stateNode.containerInfo;else{for(;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo}if(!d)break;b=c.tag;5!==b&&6!==b||a.ancestors.push(c);c=tc(d)}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=nc(a.nativeEvent);d=a.topLevelType;var f=a.nativeEvent,g=a.eventSystemFlags;0===c&&(g|=64);for(var h=null,k=0;k<sa.length;k++){var l=sa[k];l&&(l=l.extractEvents(d,b,f,e,g))&&(h=
	ic(h,l))}mc(h)}}function uc(a,b,c){if(!c.has(a)){switch(a){case "scroll":vc(b,"scroll",!0);break;case "focus":case "blur":vc(b,"focus",!0);vc(b,"blur",!0);c.set("blur",null);c.set("focus",null);break;case "cancel":case "close":oc(a)&&vc(b,a,!0);break;case "invalid":case "submit":case "reset":break;default:-1===ac.indexOf(a)&&F(a,b)}c.set(a,null)}}
	var wc,xc,yc,zc=!1,Ac=[],Bc=null,Cc=null,Dc=null,Ec=new Map,Fc=new Map,Gc=[],Hc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),Ic="focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");
	function Jc(a,b){var c=cc(b);Hc.forEach(function(a){uc(a,b,c)});Ic.forEach(function(a){uc(a,b,c)})}function Kc(a,b,c,d,e){return{blockedOn:a,topLevelType:b,eventSystemFlags:c|32,nativeEvent:e,container:d}}
	function Lc(a,b){switch(a){case "focus":case "blur":Bc=null;break;case "dragenter":case "dragleave":Cc=null;break;case "mouseover":case "mouseout":Dc=null;break;case "pointerover":case "pointerout":Ec.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Fc.delete(b.pointerId)}}function Mc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=Kc(b,c,d,e,f),null!==b&&(b=Nc(b),null!==b&&xc(b)),a;a.eventSystemFlags|=d;return a}
	function Oc(a,b,c,d,e){switch(b){case "focus":return Bc=Mc(Bc,a,b,c,d,e),!0;case "dragenter":return Cc=Mc(Cc,a,b,c,d,e),!0;case "mouseover":return Dc=Mc(Dc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Ec.set(f,Mc(Ec.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Fc.set(f,Mc(Fc.get(f)||null,a,b,c,d,e)),!0}return!1}
	function Pc(a){var b=tc(a.target);if(null!==b){var c=dc(b);if(null!==c)if(b=c.tag,13===b){if(b=ec(c),null!==b){a.blockedOn=b;r.unstable_runWithPriority(a.priority,function(){yc(c)});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Qc(a){if(null!==a.blockedOn)return!1;var b=Rc(a.topLevelType,a.eventSystemFlags,a.container,a.nativeEvent);if(null!==b){var c=Nc(b);null!==c&&xc(c);a.blockedOn=b;return!1}return!0}
	function Sc(a,b,c){Qc(a)&&c.delete(b)}function Tc(){for(zc=!1;0<Ac.length;){var a=Ac[0];if(null!==a.blockedOn){a=Nc(a.blockedOn);null!==a&&wc(a);break}var b=Rc(a.topLevelType,a.eventSystemFlags,a.container,a.nativeEvent);null!==b?a.blockedOn=b:Ac.shift()}null!==Bc&&Qc(Bc)&&(Bc=null);null!==Cc&&Qc(Cc)&&(Cc=null);null!==Dc&&Qc(Dc)&&(Dc=null);Ec.forEach(Sc);Fc.forEach(Sc)}function Uc(a,b){a.blockedOn===b&&(a.blockedOn=null,zc||(zc=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Tc)))}
	function Vc(a){function b(b){return Uc(b,a)}if(0<Ac.length){Uc(Ac[0],a);for(var c=1;c<Ac.length;c++){var d=Ac[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Bc&&Uc(Bc,a);null!==Cc&&Uc(Cc,a);null!==Dc&&Uc(Dc,a);Ec.forEach(b);Fc.forEach(b);for(c=0;c<Gc.length;c++)d=Gc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Gc.length&&(c=Gc[0],null===c.blockedOn);)Pc(c),null===c.blockedOn&&Gc.shift()}
	var Wc={},Yc=new Map,Zc=new Map,$c=["abort","abort",Xb,"animationEnd",Yb,"animationIteration",Zb,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking",
	"seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",$b,"transitionEnd","waiting","waiting"];function ad(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1],f="on"+(e[0].toUpperCase()+e.slice(1));f={phasedRegistrationNames:{bubbled:f,captured:f+"Capture"},dependencies:[d],eventPriority:b};Zc.set(d,b);Yc.set(d,f);Wc[e]=f}}
	ad("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0);
	ad("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);ad($c,2);for(var bd="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),cd=0;cd<bd.length;cd++)Zc.set(bd[cd],0);
	var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function F(a,b){vc(b,a,!1)}function vc(a,b,c){var d=Zc.get(b);switch(void 0===d?2:d){case 0:d=gd.bind(null,b,1,a);break;case 1:d=hd.bind(null,b,1,a);break;default:d=id.bind(null,b,1,a)}c?a.addEventListener(b,d,!0):a.addEventListener(b,d,!1)}function gd(a,b,c,d){Ja||Ha();var e=id,f=Ja;Ja=!0;try{Ga(e,a,b,c,d)}finally{(Ja=f)||La()}}function hd(a,b,c,d){ed(dd,id.bind(null,a,b,c,d))}
	function id(a,b,c,d){if(fd)if(0<Ac.length&&-1<Hc.indexOf(a))a=Kc(null,a,b,c,d),Ac.push(a);else{var e=Rc(a,b,c,d);if(null===e)Lc(a,d);else if(-1<Hc.indexOf(a))a=Kc(e,a,b,c,d),Ac.push(a);else if(!Oc(e,a,b,c,d)){Lc(a,d);a=rc(a,d,null,b);try{Ma(sc,a)}finally{qc(a)}}}}
	function Rc(a,b,c,d){c=nc(d);c=tc(c);if(null!==c){var e=dc(c);if(null===e)c=null;else{var f=e.tag;if(13===f){c=ec(e);if(null!==c)return c;c=null}else if(3===f){if(e.stateNode.hydrate)return 3===e.tag?e.stateNode.containerInfo:null;c=null}else e!==c&&(c=null)}}a=rc(a,d,c,b);try{Ma(sc,a)}finally{qc(a)}return null}
	var jd={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
	floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},kd=["Webkit","ms","Moz","O"];Object.keys(jd).forEach(function(a){kd.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);jd[b]=jd[a]})});function ld(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||jd.hasOwnProperty(a)&&jd[a]?(""+b).trim():b+"px"}
	function md(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=ld(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var nd=n({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function od(a,b){if(b){if(nd[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(u(137,a,""));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(u(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(u(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(u(62,""));}}
	function pd(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var qd=Mb.html;function rd(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=cc(a);b=wa[b];for(var d=0;d<b.length;d++)uc(b[d],a,c)}function sd(){}
	function td(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ud(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function vd(a,b){var c=ud(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=ud(c)}}
	function wd(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?wd(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function xd(){for(var a=window,b=td();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=td(a.document)}return b}
	function yd(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}var zd="$",Ad="/$",Bd="$?",Cd="$!",Dd=null,Ed=null;function Fd(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
	function Gd(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var Hd="function"===typeof setTimeout?setTimeout:void 0,Id="function"===typeof clearTimeout?clearTimeout:void 0;function Jd(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}
	function Kd(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if(c===zd||c===Cd||c===Bd){if(0===b)return a;b--}else c===Ad&&b++}a=a.previousSibling}return null}var Ld=Math.random().toString(36).slice(2),Md="__reactInternalInstance$"+Ld,Nd="__reactEventHandlers$"+Ld,Od="__reactContainere$"+Ld;
	function tc(a){var b=a[Md];if(b)return b;for(var c=a.parentNode;c;){if(b=c[Od]||c[Md]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Kd(a);null!==a;){if(c=a[Md])return c;a=Kd(a)}return b}a=c;c=a.parentNode}return null}function Nc(a){a=a[Md]||a[Od];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Pd(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(u(33));}function Qd(a){return a[Nd]||null}
	function Rd(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}
	function Sd(a,b){var c=a.stateNode;if(!c)return null;var d=la(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==typeof c)throw Error(u(231,
	b,typeof c));return c}function Td(a,b,c){if(b=Sd(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=ic(c._dispatchListeners,b),c._dispatchInstances=ic(c._dispatchInstances,a)}function Ud(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=Rd(b);for(b=c.length;0<b--;)Td(c[b],"captured",a);for(b=0;b<c.length;b++)Td(c[b],"bubbled",a)}}
	function Vd(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Sd(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=ic(c._dispatchListeners,b),c._dispatchInstances=ic(c._dispatchInstances,a))}function Wd(a){a&&a.dispatchConfig.registrationName&&Vd(a._targetInst,null,a)}function Xd(a){jc(a,Ud)}var Yd=null,Zd=null,$d=null;
	function ae(){if($d)return $d;var a,b=Zd,c=b.length,d,e="value"in Yd?Yd.value:Yd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return $d=e.slice(a,1<d?1-d:void 0)}function be(){return!0}function ce(){return!1}
	function G(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?be:ce;this.isPropagationStopped=ce;return this}
	n(G.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=be)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=be)},persist:function(){this.isPersistent=be},isPersistent:ce,destructor:function(){var a=this.constructor.Interface,
	b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=ce;this._dispatchInstances=this._dispatchListeners=null}});G.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
	G.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;n(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=n({},d.Interface,a);c.extend=d.extend;de(c);return c};de(G);function ee(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
	function fe(a){if(!(a instanceof this))throw Error(u(279));a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function de(a){a.eventPool=[];a.getPooled=ee;a.release=fe}var ge=G.extend({data:null}),he=G.extend({data:null}),ie=[9,13,27,32],je=ya&&"CompositionEvent"in window,ke=null;ya&&"documentMode"in document&&(ke=document.documentMode);
	var le=ya&&"TextEvent"in window&&!ke,me=ya&&(!je||ke&&8<ke&&11>=ke),ne=String.fromCharCode(32),oe={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
	captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},pe=!1;
	function qe(a,b){switch(a){case "keyup":return-1!==ie.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function re(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var se=!1;function te(a,b){switch(a){case "compositionend":return re(b);case "keypress":if(32!==b.which)return null;pe=!0;return ne;case "textInput":return a=b.data,a===ne&&pe?null:a;default:return null}}
	function ue(a,b){if(se)return"compositionend"===a||!je&&qe(a,b)?(a=ae(),$d=Zd=Yd=null,se=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return me&&"ko"!==b.locale?null:b.data;default:return null}}
	var ve={eventTypes:oe,extractEvents:function(a,b,c,d){var e;if(je)b:{switch(a){case "compositionstart":var f=oe.compositionStart;break b;case "compositionend":f=oe.compositionEnd;break b;case "compositionupdate":f=oe.compositionUpdate;break b}f=void 0}else se?qe(a,c)&&(f=oe.compositionEnd):"keydown"===a&&229===c.keyCode&&(f=oe.compositionStart);f?(me&&"ko"!==c.locale&&(se||f!==oe.compositionStart?f===oe.compositionEnd&&se&&(e=ae()):(Yd=d,Zd="value"in Yd?Yd.value:Yd.textContent,se=!0)),f=ge.getPooled(f,
	b,c,d),e?f.data=e:(e=re(c),null!==e&&(f.data=e)),Xd(f),e=f):e=null;(a=le?te(a,c):ue(a,c))?(b=he.getPooled(oe.beforeInput,b,c,d),b.data=a,Xd(b)):b=null;return null===e?b:null===b?e:[e,b]}},we={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!we[a.type]:"textarea"===b?!0:!1}
	var ye={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function ze(a,b,c){a=G.getPooled(ye.change,a,b,c);a.type="change";Da(c);Xd(a);return a}var Ae=null,Be=null;function Ce(a){mc(a)}function De(a){var b=Pd(a);if(yb(b))return a}function Ee(a,b){if("change"===a)return b}var Fe=!1;ya&&(Fe=oc("input")&&(!document.documentMode||9<document.documentMode));
	function Ge(){Ae&&(Ae.detachEvent("onpropertychange",He),Be=Ae=null)}function He(a){if("value"===a.propertyName&&De(Be))if(a=ze(Be,a,nc(a)),Ja)mc(a);else{Ja=!0;try{Fa(Ce,a)}finally{Ja=!1,La()}}}function Ie(a,b,c){"focus"===a?(Ge(),Ae=b,Be=c,Ae.attachEvent("onpropertychange",He)):"blur"===a&&Ge()}function Je(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return De(Be)}function Ke(a,b){if("click"===a)return De(b)}function Le(a,b){if("input"===a||"change"===a)return De(b)}
	var Me={eventTypes:ye,_isInputEventSupported:Fe,extractEvents:function(a,b,c,d){var e=b?Pd(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Ee;else if(xe(e))if(Fe)g=Le;else{g=Je;var h=Ie}else(f=e.nodeName)&&"input"===f.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(g=Ke);if(g&&(g=g(a,b)))return ze(g,c,d);h&&h(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Db(e,"number",e.value)}},Ne=G.extend({view:null,detail:null}),
	Oe={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pe(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Oe[a])?!!b[a]:!1}function Qe(){return Pe}
	var Re=0,Se=0,Te=!1,Ue=!1,Ve=Ne.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Qe,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=Re;Re=a.screenX;return Te?"mousemove"===a.type?a.screenX-b:0:(Te=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;
	var b=Se;Se=a.screenY;return Ue?"mousemove"===a.type?a.screenY-b:0:(Ue=!0,0)}}),We=Ve.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),Xe={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
	dependencies:["pointerout","pointerover"]}},Ye={eventTypes:Xe,extractEvents:function(a,b,c,d,e){var f="mouseover"===a||"pointerover"===a,g="mouseout"===a||"pointerout"===a;if(f&&0===(e&32)&&(c.relatedTarget||c.fromElement)||!g&&!f)return null;f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window;if(g){if(g=b,b=(b=c.relatedTarget||c.toElement)?tc(b):null,null!==b){var h=dc(b);if(b!==h||5!==b.tag&&6!==b.tag)b=null}}else g=null;if(g===b)return null;if("mouseout"===a||"mouseover"===
	a){var k=Ve;var l=Xe.mouseLeave;var m=Xe.mouseEnter;var p="mouse"}else if("pointerout"===a||"pointerover"===a)k=We,l=Xe.pointerLeave,m=Xe.pointerEnter,p="pointer";a=null==g?f:Pd(g);f=null==b?f:Pd(b);l=k.getPooled(l,g,c,d);l.type=p+"leave";l.target=a;l.relatedTarget=f;c=k.getPooled(m,b,c,d);c.type=p+"enter";c.target=f;c.relatedTarget=a;d=g;p=b;if(d&&p)a:{k=d;m=p;g=0;for(a=k;a;a=Rd(a))g++;a=0;for(b=m;b;b=Rd(b))a++;for(;0<g-a;)k=Rd(k),g--;for(;0<a-g;)m=Rd(m),a--;for(;g--;){if(k===m||k===m.alternate)break a;
	k=Rd(k);m=Rd(m)}k=null}else k=null;m=k;for(k=[];d&&d!==m;){g=d.alternate;if(null!==g&&g===m)break;k.push(d);d=Rd(d)}for(d=[];p&&p!==m;){g=p.alternate;if(null!==g&&g===m)break;d.push(p);p=Rd(p)}for(p=0;p<k.length;p++)Vd(k[p],"bubbled",l);for(p=d.length;0<p--;)Vd(d[p],"captured",c);return 0===(e&64)?[l]:[l,c]}};function Ze(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var $e="function"===typeof Object.is?Object.is:Ze,af=Object.prototype.hasOwnProperty;
	function bf(a,b){if($e(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!af.call(b,c[d])||!$e(a[c[d]],b[c[d]]))return!1;return!0}
	var cf=ya&&"documentMode"in document&&11>=document.documentMode,df={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},ef=null,ff=null,gf=null,hf=!1;
	function jf(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if(hf||null==ef||ef!==td(c))return null;c=ef;"selectionStart"in c&&yd(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return gf&&bf(gf,c)?null:(gf=c,a=G.getPooled(df.select,ff,a,b),a.type="select",a.target=ef,Xd(a),a)}
	var kf={eventTypes:df,extractEvents:function(a,b,c,d,e,f){e=f||(d.window===d?d.document:9===d.nodeType?d:d.ownerDocument);if(!(f=!e)){a:{e=cc(e);f=wa.onSelect;for(var g=0;g<f.length;g++)if(!e.has(f[g])){e=!1;break a}e=!0}f=!e}if(f)return null;e=b?Pd(b):window;switch(a){case "focus":if(xe(e)||"true"===e.contentEditable)ef=e,ff=b,gf=null;break;case "blur":gf=ff=ef=null;break;case "mousedown":hf=!0;break;case "contextmenu":case "mouseup":case "dragend":return hf=!1,jf(c,d);case "selectionchange":if(cf)break;
	case "keydown":case "keyup":return jf(c,d)}return null}},lf=G.extend({animationName:null,elapsedTime:null,pseudoElement:null}),mf=G.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),nf=Ne.extend({relatedTarget:null});function of(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
	var pf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
	116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rf=Ne.extend({key:function(a){if(a.key){var b=pf[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=of(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?qf[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Qe,charCode:function(a){return"keypress"===
	a.type?of(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?of(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),sf=Ve.extend({dataTransfer:null}),tf=Ne.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Qe}),uf=G.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),vf=Ve.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
	a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),wf={eventTypes:Wc,extractEvents:function(a,b,c,d){var e=Yc.get(a);if(!e)return null;switch(a){case "keypress":if(0===of(c))return null;case "keydown":case "keyup":a=rf;break;case "blur":case "focus":a=nf;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=
	Ve;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=sf;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=tf;break;case Xb:case Yb:case Zb:a=lf;break;case $b:a=uf;break;case "scroll":a=Ne;break;case "wheel":a=vf;break;case "copy":case "cut":case "paste":a=mf;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=
	We;break;default:a=G}b=a.getPooled(e,b,c,d);Xd(b);return b}};if(pa)throw Error(u(101));pa=Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));ra();var xf=Nc;la=Qd;ma=xf;na=Pd;xa({SimpleEventPlugin:wf,EnterLeaveEventPlugin:Ye,ChangeEventPlugin:Me,SelectEventPlugin:kf,BeforeInputEventPlugin:ve});var yf=[],zf=-1;function H(a){0>zf||(a.current=yf[zf],yf[zf]=null,zf--)}
	function I(a,b){zf++;yf[zf]=a.current;a.current=b}var Af={},J={current:Af},K={current:!1},Bf=Af;function Cf(a,b){var c=a.type.contextTypes;if(!c)return Af;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function L(a){a=a.childContextTypes;return null!==a&&void 0!==a}
	function Df(){H(K);H(J)}function Ef(a,b,c){if(J.current!==Af)throw Error(u(168));I(J,b);I(K,c)}function Ff(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(u(108,pb(b)||"Unknown",e));return n({},c,{},d)}function Gf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Af;Bf=J.current;I(J,a);I(K,K.current);return!0}
	function Hf(a,b,c){var d=a.stateNode;if(!d)throw Error(u(169));c?(a=Ff(a,b,Bf),d.__reactInternalMemoizedMergedChildContext=a,H(K),H(J),I(J,a)):H(K);I(K,c)}
	var If=r.unstable_runWithPriority,Jf=r.unstable_scheduleCallback,Kf=r.unstable_cancelCallback,Lf=r.unstable_requestPaint,Mf=r.unstable_now,Nf=r.unstable_getCurrentPriorityLevel,Of=r.unstable_ImmediatePriority,Pf=r.unstable_UserBlockingPriority,Qf=r.unstable_NormalPriority,Rf=r.unstable_LowPriority,Sf=r.unstable_IdlePriority,Tf={},Uf=r.unstable_shouldYield,Vf=void 0!==Lf?Lf:function(){},Wf=null,Xf=null,Yf=!1,Zf=Mf(),$f=1E4>Zf?Mf:function(){return Mf()-Zf};
	function ag(){switch(Nf()){case Of:return 99;case Pf:return 98;case Qf:return 97;case Rf:return 96;case Sf:return 95;default:throw Error(u(332));}}function bg(a){switch(a){case 99:return Of;case 98:return Pf;case 97:return Qf;case 96:return Rf;case 95:return Sf;default:throw Error(u(332));}}function cg(a,b){a=bg(a);return If(a,b)}function dg(a,b,c){a=bg(a);return Jf(a,b,c)}function eg(a){null===Wf?(Wf=[a],Xf=Jf(Of,fg)):Wf.push(a);return Tf}function gg(){if(null!==Xf){var a=Xf;Xf=null;Kf(a)}fg()}
	function fg(){if(!Yf&&null!==Wf){Yf=!0;var a=0;try{var b=Wf;cg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});Wf=null}catch(c){throw null!==Wf&&(Wf=Wf.slice(a+1)),Jf(Of,gg),c;}finally{Yf=!1}}}function hg(a,b,c){c/=10;return 1073741821-(((1073741821-a+b/10)/c|0)+1)*c}function ig(a,b){if(a&&a.defaultProps){b=n({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c])}return b}var jg={current:null},kg=null,lg=null,mg=null;function ng(){mg=lg=kg=null}
	function og(a){var b=jg.current;H(jg);a.type._context._currentValue=b}function pg(a,b){for(;null!==a;){var c=a.alternate;if(a.childExpirationTime<b)a.childExpirationTime=b,null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);else if(null!==c&&c.childExpirationTime<b)c.childExpirationTime=b;else break;a=a.return}}function qg(a,b){kg=a;mg=lg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(a.expirationTime>=b&&(rg=!0),a.firstContext=null)}
	function sg(a,b){if(mg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)mg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===lg){if(null===kg)throw Error(u(308));lg=b;kg.dependencies={expirationTime:0,firstContext:b,responders:null}}else lg=lg.next=b}return a._currentValue}var tg=!1;function ug(a){a.updateQueue={baseState:a.memoizedState,baseQueue:null,shared:{pending:null},effects:null}}
	function vg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,baseQueue:a.baseQueue,shared:a.shared,effects:a.effects})}function wg(a,b){a={expirationTime:a,suspenseConfig:b,tag:0,payload:null,callback:null,next:null};return a.next=a}function xg(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
	function yg(a,b){var c=a.alternate;null!==c&&vg(c,a);a=a.updateQueue;c=a.baseQueue;null===c?(a.baseQueue=b.next=b,b.next=b):(b.next=c.next,c.next=b)}
	function zg(a,b,c,d){var e=a.updateQueue;tg=!1;var f=e.baseQueue,g=e.shared.pending;if(null!==g){if(null!==f){var h=f.next;f.next=g.next;g.next=h}f=g;e.shared.pending=null;h=a.alternate;null!==h&&(h=h.updateQueue,null!==h&&(h.baseQueue=g))}if(null!==f){h=f.next;var k=e.baseState,l=0,m=null,p=null,x=null;if(null!==h){var z=h;do{g=z.expirationTime;if(g<d){var ca={expirationTime:z.expirationTime,suspenseConfig:z.suspenseConfig,tag:z.tag,payload:z.payload,callback:z.callback,next:null};null===x?(p=x=
	ca,m=k):x=x.next=ca;g>l&&(l=g)}else{null!==x&&(x=x.next={expirationTime:1073741823,suspenseConfig:z.suspenseConfig,tag:z.tag,payload:z.payload,callback:z.callback,next:null});Ag(g,z.suspenseConfig);a:{var D=a,t=z;g=b;ca=c;switch(t.tag){case 1:D=t.payload;if("function"===typeof D){k=D.call(ca,k,g);break a}k=D;break a;case 3:D.effectTag=D.effectTag&-4097|64;case 0:D=t.payload;g="function"===typeof D?D.call(ca,k,g):D;if(null===g||void 0===g)break a;k=n({},k,g);break a;case 2:tg=!0}}null!==z.callback&&
	(a.effectTag|=32,g=e.effects,null===g?e.effects=[z]:g.push(z))}z=z.next;if(null===z||z===h)if(g=e.shared.pending,null===g)break;else z=f.next=g.next,g.next=h,e.baseQueue=f=g,e.shared.pending=null}while(1)}null===x?m=k:x.next=p;e.baseState=m;e.baseQueue=x;Bg(l);a.expirationTime=l;a.memoizedState=k}}
	function Cg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=e;e=c;if("function"!==typeof d)throw Error(u(191,d));d.call(e)}}}var Dg=Wa.ReactCurrentBatchConfig,Eg=(new aa.Component).refs;function Fg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:n({},b,c);a.memoizedState=c;0===a.expirationTime&&(a.updateQueue.baseState=c)}
	var Jg={isMounted:function(a){return(a=a._reactInternalFiber)?dc(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e=wg(d,e);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);xg(a,e);Ig(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e=wg(d,e);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);xg(a,e);Ig(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=Gg(),d=Dg.suspense;
	c=Hg(c,a,d);d=wg(c,d);d.tag=2;void 0!==b&&null!==b&&(d.callback=b);xg(a,d);Ig(a,c)}};function Kg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!bf(c,d)||!bf(e,f):!0}
	function Lg(a,b,c){var d=!1,e=Af;var f=b.contextType;"object"===typeof f&&null!==f?f=sg(f):(e=L(b)?Bf:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Cf(a,e):Af);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Jg;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Mg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Jg.enqueueReplaceState(b,b.state,null)}
	function Ng(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Eg;ug(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=sg(f):(f=L(b)?Bf:J.current,e.context=Cf(a,f));zg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Fg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
	(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Jg.enqueueReplaceState(e,e.state,null),zg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.effectTag|=4)}var Og=Array.isArray;
	function Pg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(u(309));var d=c.stateNode}if(!d)throw Error(u(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Eg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(u(284));if(!c._owner)throw Error(u(290,a));}return a}
	function Qg(a,b){if("textarea"!==a.type)throw Error(u(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,""));}
	function Rg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Sg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
	2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Tg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Pg(a,b,c),d.return=a,d;d=Ug(c.type,c.key,c.props,null,a.mode,d);d.ref=Pg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
	c.implementation)return b=Vg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Wg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function p(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Tg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Za:return c=Ug(b.type,b.key,b.props,null,a.mode,c),c.ref=Pg(a,null,b),c.return=a,c;case $a:return b=Vg(b,a.mode,c),b.return=a,b}if(Og(b)||
	nb(b))return b=Wg(b,a.mode,c,null),b.return=a,b;Qg(a,b)}return null}function x(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Za:return c.key===e?c.type===ab?m(a,b,c.props.children,d,e):k(a,b,c,d):null;case $a:return c.key===e?l(a,b,c,d):null}if(Og(c)||nb(c))return null!==e?null:m(a,b,c,d,null);Qg(a,c)}return null}function z(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
	a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Za:return a=a.get(null===d.key?c:d.key)||null,d.type===ab?m(b,a,d.props.children,e,d.key):k(b,a,d,e);case $a:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Og(d)||nb(d))return a=a.get(c)||null,m(b,a,d,e,null);Qg(b,d)}return null}function ca(e,g,h,k){for(var l=null,t=null,m=g,y=g=0,A=null;null!==m&&y<h.length;y++){m.index>y?(A=m,m=null):A=m.sibling;var q=x(e,m,h[y],k);if(null===q){null===m&&(m=A);break}a&&
	m&&null===q.alternate&&b(e,m);g=f(q,g,y);null===t?l=q:t.sibling=q;t=q;m=A}if(y===h.length)return c(e,m),l;if(null===m){for(;y<h.length;y++)m=p(e,h[y],k),null!==m&&(g=f(m,g,y),null===t?l=m:t.sibling=m,t=m);return l}for(m=d(e,m);y<h.length;y++)A=z(m,e,y,h[y],k),null!==A&&(a&&null!==A.alternate&&m.delete(null===A.key?y:A.key),g=f(A,g,y),null===t?l=A:t.sibling=A,t=A);a&&m.forEach(function(a){return b(e,a)});return l}function D(e,g,h,l){var k=nb(h);if("function"!==typeof k)throw Error(u(150));h=k.call(h);
	if(null==h)throw Error(u(151));for(var m=k=null,t=g,y=g=0,A=null,q=h.next();null!==t&&!q.done;y++,q=h.next()){t.index>y?(A=t,t=null):A=t.sibling;var D=x(e,t,q.value,l);if(null===D){null===t&&(t=A);break}a&&t&&null===D.alternate&&b(e,t);g=f(D,g,y);null===m?k=D:m.sibling=D;m=D;t=A}if(q.done)return c(e,t),k;if(null===t){for(;!q.done;y++,q=h.next())q=p(e,q.value,l),null!==q&&(g=f(q,g,y),null===m?k=q:m.sibling=q,m=q);return k}for(t=d(e,t);!q.done;y++,q=h.next())q=z(t,e,y,q.value,l),null!==q&&(a&&null!==
	q.alternate&&t.delete(null===q.key?y:q.key),g=f(q,g,y),null===m?k=q:m.sibling=q,m=q);a&&t.forEach(function(a){return b(e,a)});return k}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ab&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case Za:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ab){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,
	k.sibling);d=e(k,f.props);d.ref=Pg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ab?(d=Wg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Ug(f.type,f.key,f.props,null,a.mode,h),h.ref=Pg(a,d,f),h.return=a,a=h)}return g(a);case $a:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=
	d.sibling}d=Vg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Tg(f,a.mode,h),d.return=a,a=d),g(a);if(Og(f))return ca(a,d,f,h);if(nb(f))return D(a,d,f,h);l&&Qg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:throw a=a.type,Error(u(152,a.displayName||a.name||"Component"));}return c(a,d)}}var Xg=Rg(!0),Yg=Rg(!1),Zg={},$g={current:Zg},ah={current:Zg},bh={current:Zg};
	function ch(a){if(a===Zg)throw Error(u(174));return a}function dh(a,b){I(bh,b);I(ah,a);I($g,Zg);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:Ob(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=Ob(b,a)}H($g);I($g,b)}function eh(){H($g);H(ah);H(bh)}function fh(a){ch(bh.current);var b=ch($g.current);var c=Ob(b,a.type);b!==c&&(I(ah,a),I($g,c))}function gh(a){ah.current===a&&(H($g),H(ah))}var M={current:0};
	function hh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||c.data===Bd||c.data===Cd))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.effectTag&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}function ih(a,b){return{responder:a,props:b}}
	var jh=Wa.ReactCurrentDispatcher,kh=Wa.ReactCurrentBatchConfig,lh=0,N=null,O=null,P=null,mh=!1;function Q(){throw Error(u(321));}function nh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!$e(a[c],b[c]))return!1;return!0}
	function oh(a,b,c,d,e,f){lh=f;N=b;b.memoizedState=null;b.updateQueue=null;b.expirationTime=0;jh.current=null===a||null===a.memoizedState?ph:qh;a=c(d,e);if(b.expirationTime===lh){f=0;do{b.expirationTime=0;if(!(25>f))throw Error(u(301));f+=1;P=O=null;b.updateQueue=null;jh.current=rh;a=c(d,e)}while(b.expirationTime===lh)}jh.current=sh;b=null!==O&&null!==O.next;lh=0;P=O=N=null;mh=!1;if(b)throw Error(u(300));return a}
	function th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}function uh(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else{if(null===a)throw Error(u(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a}return P}
	function vh(a,b){return"function"===typeof b?b(a):b}
	function wh(a){var b=uh(),c=b.queue;if(null===c)throw Error(u(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.expirationTime;if(l<lh){var m={expirationTime:k.expirationTime,suspenseConfig:k.suspenseConfig,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null};null===h?(g=h=m,f=d):h=h.next=m;l>N.expirationTime&&
	(N.expirationTime=l,Bg(l))}else null!==h&&(h=h.next={expirationTime:1073741823,suspenseConfig:k.suspenseConfig,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),Ag(l,k.suspenseConfig),d=k.eagerReducer===a?k.eagerState:a(d,k.action);k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;$e(d,b.memoizedState)||(rg=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
	function xh(a){var b=uh(),c=b.queue;if(null===c)throw Error(u(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);$e(f,b.memoizedState)||(rg=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
	function yh(a){var b=th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:vh,lastRenderedState:a};a=a.dispatch=zh.bind(null,N,a);return[b.memoizedState,a]}function Ah(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}
	function Bh(){return uh().memoizedState}function Ch(a,b,c,d){var e=th();N.effectTag|=a;e.memoizedState=Ah(1|b,c,void 0,void 0===d?null:d)}function Dh(a,b,c,d){var e=uh();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&nh(d,g.deps)){Ah(b,c,f,d);return}}N.effectTag|=a;e.memoizedState=Ah(1|b,c,f,d)}function Eh(a,b){return Ch(516,4,a,b)}function Fh(a,b){return Dh(516,4,a,b)}function Gh(a,b){return Dh(4,2,a,b)}
	function Hh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Ih(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Dh(4,2,Hh.bind(null,b,a),c)}function Jh(){}function Kh(a,b){th().memoizedState=[a,void 0===b?null:b];return a}function Lh(a,b){var c=uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
	function Mh(a,b){var c=uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&nh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Nh(a,b,c){var d=ag();cg(98>d?98:d,function(){a(!0)});cg(97<d?97:d,function(){var d=kh.suspense;kh.suspense=void 0===b?null:b;try{a(!1),c()}finally{kh.suspense=d}})}
	function zh(a,b,c){var d=Gg(),e=Dg.suspense;d=Hg(d,a,e);e={expirationTime:d,suspenseConfig:e,action:c,eagerReducer:null,eagerState:null,next:null};var f=b.pending;null===f?e.next=e:(e.next=f.next,f.next=e);b.pending=e;f=a.alternate;if(a===N||null!==f&&f===N)mh=!0,e.expirationTime=lh,N.expirationTime=lh;else{if(0===a.expirationTime&&(null===f||0===f.expirationTime)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.eagerReducer=f;e.eagerState=h;if($e(h,g))return}catch(k){}finally{}Ig(a,
	d)}}
	var sh={readContext:sg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useResponder:Q,useDeferredValue:Q,useTransition:Q},ph={readContext:sg,useCallback:Kh,useContext:sg,useEffect:Eh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Ch(4,2,Hh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Ch(4,2,a,b)},useMemo:function(a,b){var c=th();b=void 0===b?null:b;a=a();c.memoizedState=[a,
	b];return a},useReducer:function(a,b,c){var d=th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=zh.bind(null,N,a);return[d.memoizedState,a]},useRef:function(a){var b=th();a={current:a};return b.memoizedState=a},useState:yh,useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=yh(a),d=c[0],e=c[1];Eh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=
	c}},[a,b]);return d},useTransition:function(a){var b=yh(!1),c=b[0];b=b[1];return[Kh(Nh.bind(null,b,a),[b,a]),c]}},qh={readContext:sg,useCallback:Lh,useContext:sg,useEffect:Fh,useImperativeHandle:Ih,useLayoutEffect:Gh,useMemo:Mh,useReducer:wh,useRef:Bh,useState:function(){return wh(vh)},useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=wh(vh),d=c[0],e=c[1];Fh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=c}},[a,b]);return d},useTransition:function(a){var b=
	wh(vh),c=b[0];b=b[1];return[Lh(Nh.bind(null,b,a),[b,a]),c]}},rh={readContext:sg,useCallback:Lh,useContext:sg,useEffect:Fh,useImperativeHandle:Ih,useLayoutEffect:Gh,useMemo:Mh,useReducer:xh,useRef:Bh,useState:function(){return xh(vh)},useDebugValue:Jh,useResponder:ih,useDeferredValue:function(a,b){var c=xh(vh),d=c[0],e=c[1];Fh(function(){var c=kh.suspense;kh.suspense=void 0===b?null:b;try{e(a)}finally{kh.suspense=c}},[a,b]);return d},useTransition:function(a){var b=xh(vh),c=b[0];b=b[1];return[Lh(Nh.bind(null,
	b,a),[b,a]),c]}},Oh=null,Ph=null,Qh=!1;function Rh(a,b){var c=Sh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
	function Th(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
	function Uh(a){if(Qh){var b=Ph;if(b){var c=b;if(!Th(a,b)){b=Jd(c.nextSibling);if(!b||!Th(a,b)){a.effectTag=a.effectTag&-1025|2;Qh=!1;Oh=a;return}Rh(Oh,c)}Oh=a;Ph=Jd(b.firstChild)}else a.effectTag=a.effectTag&-1025|2,Qh=!1,Oh=a}}function Vh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;Oh=a}
	function Wh(a){if(a!==Oh)return!1;if(!Qh)return Vh(a),Qh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Gd(b,a.memoizedProps))for(b=Ph;b;)Rh(a,b),b=Jd(b.nextSibling);Vh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(u(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if(c===Ad){if(0===b){Ph=Jd(a.nextSibling);break a}b--}else c!==zd&&c!==Cd&&c!==Bd||b++}a=a.nextSibling}Ph=null}}else Ph=Oh?Jd(a.stateNode.nextSibling):null;return!0}
	function Xh(){Ph=Oh=null;Qh=!1}var Yh=Wa.ReactCurrentOwner,rg=!1;function R(a,b,c,d){b.child=null===a?Yg(b,null,c,d):Xg(b,a.child,c,d)}function Zh(a,b,c,d,e){c=c.render;var f=b.ref;qg(b,e);d=oh(a,b,c,d,f,e);if(null!==a&&!rg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),$h(a,b,e);b.effectTag|=1;R(a,b,d,e);return b.child}
	function ai(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!bi(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ci(a,b,g,d,e,f);a=Ug(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:bf,c(e,d)&&a.ref===b.ref))return $h(a,b,f);b.effectTag|=1;a=Sg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
	function ci(a,b,c,d,e,f){return null!==a&&bf(a.memoizedProps,d)&&a.ref===b.ref&&(rg=!1,e<f)?(b.expirationTime=a.expirationTime,$h(a,b,f)):di(a,b,c,d,f)}function ei(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function di(a,b,c,d,e){var f=L(c)?Bf:J.current;f=Cf(b,f);qg(b,e);c=oh(a,b,c,d,f,e);if(null!==a&&!rg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),$h(a,b,e);b.effectTag|=1;R(a,b,c,e);return b.child}
	function fi(a,b,c,d,e){if(L(c)){var f=!0;Gf(b)}else f=!1;qg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Lg(b,c,d),Ng(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=sg(l):(l=L(c)?Bf:J.current,l=Cf(b,l));var m=c.getDerivedStateFromProps,p="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;p||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
	"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Mg(b,g,d,l);tg=!1;var x=b.memoizedState;g.state=x;zg(b,d,g,e);k=b.memoizedState;h!==d||x!==k||K.current||tg?("function"===typeof m&&(Fg(b,c,m,d),k=b.memoizedState),(h=tg||Kg(b,c,h,d,x,k,l))?(p||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
	typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1)}else g=b.stateNode,vg(a,b),h=b.memoizedProps,g.props=b.type===b.elementType?h:ig(b.type,h),k=g.context,l=c.contextType,"object"===typeof l&&null!==l?l=sg(l):(l=L(c)?Bf:J.current,l=Cf(b,l)),m=c.getDerivedStateFromProps,(p="function"===typeof m||"function"===
	typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Mg(b,g,d,l),tg=!1,k=b.memoizedState,g.state=k,zg(b,d,g,e),x=b.memoizedState,h!==d||k!==x||K.current||tg?("function"===typeof m&&(Fg(b,c,m,d),x=b.memoizedState),(m=tg||Kg(b,c,h,d,k,x,l))?(p||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
	x,l),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,l)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=l,d=m):
	("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),d=!1);return gi(a,b,c,d,f,e)}
	function gi(a,b,c,d,e,f){ei(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Hf(b,c,!1),$h(a,b,f);d=b.stateNode;Yh.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=Xg(b,a.child,null,f),b.child=Xg(b,null,h,f)):R(a,b,h,f);b.memoizedState=d.state;e&&Hf(b,c,!0);return b.child}function hi(a){var b=a.stateNode;b.pendingContext?Ef(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Ef(a,b.context,!1);dh(a,b.containerInfo)}
	var ii={dehydrated:null,retryTime:0};
	function ji(a,b,c){var d=b.mode,e=b.pendingProps,f=M.current,g=!1,h;(h=0!==(b.effectTag&64))||(h=0!==(f&2)&&(null===a||null!==a.memoizedState));h?(g=!0,b.effectTag&=-65):null!==a&&null===a.memoizedState||void 0===e.fallback||!0===e.unstable_avoidThisFallback||(f|=1);I(M,f&1);if(null===a){void 0!==e.fallback&&Uh(b);if(g){g=e.fallback;e=Wg(null,d,0,null);e.return=b;if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=Wg(g,d,c,null);c.return=
	b;e.sibling=c;b.memoizedState=ii;b.child=e;return c}d=e.children;b.memoizedState=null;return b.child=Yg(b,null,d,c)}if(null!==a.memoizedState){a=a.child;d=a.sibling;if(g){e=e.fallback;c=Sg(a,a.pendingProps);c.return=b;if(0===(b.mode&2)&&(g=null!==b.memoizedState?b.child.child:b.child,g!==a.child))for(c.child=g;null!==g;)g.return=c,g=g.sibling;d=Sg(d,e);d.return=b;c.sibling=d;c.childExpirationTime=0;b.memoizedState=ii;b.child=c;return d}c=Xg(b,a.child,e.children,c);b.memoizedState=null;return b.child=
	c}a=a.child;if(g){g=e.fallback;e=Wg(null,d,0,null);e.return=b;e.child=a;null!==a&&(a.return=e);if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=Wg(g,d,c,null);c.return=b;e.sibling=c;c.effectTag|=2;e.childExpirationTime=0;b.memoizedState=ii;b.child=e;return c}b.memoizedState=null;return b.child=Xg(b,a,e.children,c)}
	function ki(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);pg(a.return,b)}function li(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailExpiration:0,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailExpiration=0,g.tailMode=e,g.lastEffect=f)}
	function mi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;R(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.effectTag|=64;else{if(null!==a&&0!==(a.effectTag&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&ki(a,c);else if(19===a.tag)ki(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(M,d);if(0===(b.mode&2))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===hh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);li(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===hh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}li(b,!0,c,null,f,b.lastEffect);break;case "together":li(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
	function $h(a,b,c){null!==a&&(b.dependencies=a.dependencies);var d=b.expirationTime;0!==d&&Bg(d);if(b.childExpirationTime<c)return null;if(null!==a&&b.child!==a.child)throw Error(u(153));if(null!==b.child){a=b.child;c=Sg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Sg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}var ni,oi,pi,qi;
	ni=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};oi=function(){};
	pi=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;ch($g.current);a=null;switch(c){case "input":f=zb(g,f);d=zb(g,d);a=[];break;case "option":f=Gb(g,f);d=Gb(g,d);a=[];break;case "select":f=n({},f,{value:void 0});d=n({},d,{value:void 0});a=[];break;case "textarea":f=Ib(g,f);d=Ib(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=sd)}od(c,d);var h,k;c=null;for(h in f)if(!d.hasOwnProperty(h)&&f.hasOwnProperty(h)&&null!=f[h])if("style"===
	h)for(k in g=f[h],g)g.hasOwnProperty(k)&&(c||(c={}),c[k]="");else"dangerouslySetInnerHTML"!==h&&"children"!==h&&"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(va.hasOwnProperty(h)?a||(a=[]):(a=a||[]).push(h,null));for(h in d){var l=d[h];g=null!=f?f[h]:void 0;if(d.hasOwnProperty(h)&&l!==g&&(null!=l||null!=g))if("style"===h)if(g){for(k in g)!g.hasOwnProperty(k)||l&&l.hasOwnProperty(k)||(c||(c={}),c[k]="");for(k in l)l.hasOwnProperty(k)&&g[k]!==l[k]&&(c||(c={}),
	c[k]=l[k])}else c||(a||(a=[]),a.push(h,c)),c=l;else"dangerouslySetInnerHTML"===h?(l=l?l.__html:void 0,g=g?g.__html:void 0,null!=l&&g!==l&&(a=a||[]).push(h,l)):"children"===h?g===l||"string"!==typeof l&&"number"!==typeof l||(a=a||[]).push(h,""+l):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&(va.hasOwnProperty(h)?(null!=l&&rd(e,h),a||g===l||(a=[])):(a=a||[]).push(h,l))}c&&(a=a||[]).push("style",c);e=a;if(b.updateQueue=e)b.effectTag|=4}};
	qi=function(a,b,c,d){c!==d&&(b.effectTag|=4)};function ri(a,b){switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
	function si(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return L(b.type)&&Df(),null;case 3:return eh(),H(K),H(J),c=b.stateNode,c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),null!==a&&null!==a.child||!Wh(b)||(b.effectTag|=4),oi(b),null;case 5:gh(b);c=ch(bh.current);var e=b.type;if(null!==a&&null!=b.stateNode)pi(a,b,e,d,c),a.ref!==b.ref&&(b.effectTag|=128);else{if(!d){if(null===b.stateNode)throw Error(u(166));
	return null}a=ch($g.current);if(Wh(b)){d=b.stateNode;e=b.type;var f=b.memoizedProps;d[Md]=b;d[Nd]=f;switch(e){case "iframe":case "object":case "embed":F("load",d);break;case "video":case "audio":for(a=0;a<ac.length;a++)F(ac[a],d);break;case "source":F("error",d);break;case "img":case "image":case "link":F("error",d);F("load",d);break;case "form":F("reset",d);F("submit",d);break;case "details":F("toggle",d);break;case "input":Ab(d,f);F("invalid",d);rd(c,"onChange");break;case "select":d._wrapperState=
	{wasMultiple:!!f.multiple};F("invalid",d);rd(c,"onChange");break;case "textarea":Jb(d,f),F("invalid",d),rd(c,"onChange")}od(e,f);a=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(a=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(a=["children",""+h]):va.hasOwnProperty(g)&&null!=h&&rd(c,g)}switch(e){case "input":xb(d);Eb(d,f,!0);break;case "textarea":xb(d);Lb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&
	(d.onclick=sd)}c=a;b.updateQueue=c;null!==c&&(b.effectTag|=4)}else{g=9===c.nodeType?c:c.ownerDocument;a===qd&&(a=Nb(e));a===qd?"script"===e?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(e,{is:d.is}):(a=g.createElement(e),"select"===e&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,e);a[Md]=b;a[Nd]=d;ni(a,b,!1,!1);b.stateNode=a;g=pd(e,d);switch(e){case "iframe":case "object":case "embed":F("load",
	a);h=d;break;case "video":case "audio":for(h=0;h<ac.length;h++)F(ac[h],a);h=d;break;case "source":F("error",a);h=d;break;case "img":case "image":case "link":F("error",a);F("load",a);h=d;break;case "form":F("reset",a);F("submit",a);h=d;break;case "details":F("toggle",a);h=d;break;case "input":Ab(a,d);h=zb(a,d);F("invalid",a);rd(c,"onChange");break;case "option":h=Gb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};h=n({},d,{value:void 0});F("invalid",a);rd(c,"onChange");break;case "textarea":Jb(a,
	d);h=Ib(a,d);F("invalid",a);rd(c,"onChange");break;default:h=d}od(e,h);var k=h;for(f in k)if(k.hasOwnProperty(f)){var l=k[f];"style"===f?md(a,l):"dangerouslySetInnerHTML"===f?(l=l?l.__html:void 0,null!=l&&Qb(a,l)):"children"===f?"string"===typeof l?("textarea"!==e||""!==l)&&Rb(a,l):"number"===typeof l&&Rb(a,""+l):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(va.hasOwnProperty(f)?null!=l&&rd(c,f):null!=l&&Xa(a,f,l,g))}switch(e){case "input":xb(a);Eb(a,d,!1);
	break;case "textarea":xb(a);Lb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+rb(d.value));break;case "select":a.multiple=!!d.multiple;c=d.value;null!=c?Hb(a,!!d.multiple,c,!1):null!=d.defaultValue&&Hb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof h.onClick&&(a.onclick=sd)}Fd(e,d)&&(b.effectTag|=4)}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)qi(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(u(166));
	c=ch(bh.current);ch($g.current);Wh(b)?(c=b.stateNode,d=b.memoizedProps,c[Md]=b,c.nodeValue!==d&&(b.effectTag|=4)):(c=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),c[Md]=b,b.stateNode=c)}return null;case 13:H(M);d=b.memoizedState;if(0!==(b.effectTag&64))return b.expirationTime=c,b;c=null!==d;d=!1;null===a?void 0!==b.memoizedProps.fallback&&Wh(b):(e=a.memoizedState,d=null!==e,c||null===e||(e=a.child.sibling,null!==e&&(f=b.firstEffect,null!==f?(b.firstEffect=e,e.nextEffect=f):(b.firstEffect=b.lastEffect=
	e,e.nextEffect=null),e.effectTag=8)));if(c&&!d&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(M.current&1))S===ti&&(S=ui);else{if(S===ti||S===ui)S=vi;0!==wi&&null!==T&&(xi(T,U),yi(T,wi))}if(c||d)b.effectTag|=4;return null;case 4:return eh(),oi(b),null;case 10:return og(b),null;case 17:return L(b.type)&&Df(),null;case 19:H(M);d=b.memoizedState;if(null===d)return null;e=0!==(b.effectTag&64);f=d.rendering;if(null===f)if(e)ri(d,!1);else{if(S!==ti||null!==a&&0!==(a.effectTag&
	64))for(f=b.child;null!==f;){a=hh(f);if(null!==a){b.effectTag|=64;ri(d,!1);e=a.updateQueue;null!==e&&(b.updateQueue=e,b.effectTag|=4);null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;for(d=b.child;null!==d;)e=d,f=c,e.effectTag&=2,e.nextEffect=null,e.firstEffect=null,e.lastEffect=null,a=e.alternate,null===a?(e.childExpirationTime=0,e.expirationTime=f,e.child=null,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null):(e.childExpirationTime=a.childExpirationTime,
	e.expirationTime=a.expirationTime,e.child=a.child,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,f=a.dependencies,e.dependencies=null===f?null:{expirationTime:f.expirationTime,firstContext:f.firstContext,responders:f.responders}),d=d.sibling;I(M,M.current&1|2);return b.child}f=f.sibling}}else{if(!e)if(a=hh(f),null!==a){if(b.effectTag|=64,e=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.effectTag|=4),ri(d,!0),null===d.tail&&"hidden"===d.tailMode&&!f.alternate)return b=
	b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*$f()-d.renderingStartTime>d.tailExpiration&&1<c&&(b.effectTag|=64,e=!0,ri(d,!1),b.expirationTime=b.childExpirationTime=c-1);d.isBackwards?(f.sibling=b.child,b.child=f):(c=d.last,null!==c?c.sibling=f:b.child=f,d.last=f)}return null!==d.tail?(0===d.tailExpiration&&(d.tailExpiration=$f()+500),c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=$f(),c.sibling=null,b=M.current,I(M,e?b&1|2:b&1),c):null}throw Error(u(156,
	b.tag));}function zi(a){switch(a.tag){case 1:L(a.type)&&Df();var b=a.effectTag;return b&4096?(a.effectTag=b&-4097|64,a):null;case 3:eh();H(K);H(J);b=a.effectTag;if(0!==(b&64))throw Error(u(285));a.effectTag=b&-4097|64;return a;case 5:return gh(a),null;case 13:return H(M),b=a.effectTag,b&4096?(a.effectTag=b&-4097|64,a):null;case 19:return H(M),null;case 4:return eh(),null;case 10:return og(a),null;default:return null}}function Ai(a,b){return{value:a,source:b,stack:qb(b)}}
	var Bi="function"===typeof WeakSet?WeakSet:Set;function Ci(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=qb(c));null!==c&&pb(c.type);b=b.value;null!==a&&1===a.tag&&pb(a.type);try{console.error(b)}catch(e){setTimeout(function(){throw e;})}}function Di(a,b){try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Ei(a,c)}}function Fi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Ei(a,c)}else b.current=null}
	function Gi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.effectTag&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:ig(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:case 5:case 6:case 4:case 17:return}throw Error(u(163));}
	function Hi(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.destroy;c.destroy=void 0;void 0!==d&&d()}c=c.next}while(c!==b)}}function Ii(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}
	function Ji(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:Ii(3,c);return;case 1:a=c.stateNode;if(c.effectTag&4)if(null===b)a.componentDidMount();else{var d=c.elementType===c.type?b.memoizedProps:ig(c.type,b.memoizedProps);a.componentDidUpdate(d,b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}b=c.updateQueue;null!==b&&Cg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Cg(c,b,a)}return;
	case 5:a=c.stateNode;null===b&&c.effectTag&4&&Fd(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Vc(c))));return;case 19:case 17:case 20:case 21:return}throw Error(u(163));}
	function Ki(a,b,c){"function"===typeof Li&&Li(b);switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var d=a.next;cg(97<c?97:c,function(){var a=d;do{var c=a.destroy;if(void 0!==c){var g=b;try{c()}catch(h){Ei(g,h)}}a=a.next}while(a!==d)})}break;case 1:Fi(b);c=b.stateNode;"function"===typeof c.componentWillUnmount&&Di(b,c);break;case 5:Fi(b);break;case 4:Mi(a,b,c)}}
	function Ni(a){var b=a.alternate;a.return=null;a.child=null;a.memoizedState=null;a.updateQueue=null;a.dependencies=null;a.alternate=null;a.firstEffect=null;a.lastEffect=null;a.pendingProps=null;a.memoizedProps=null;a.stateNode=null;null!==b&&Ni(b)}function Oi(a){return 5===a.tag||3===a.tag||4===a.tag}
	function Pi(a){a:{for(var b=a.return;null!==b;){if(Oi(b)){var c=b;break a}b=b.return}throw Error(u(160));}b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(u(161));}c.effectTag&16&&(Rb(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Oi(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.effectTag&2)continue b;
	if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}d?Qi(a,c,b):Ri(a,c,b)}
	function Qi(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=sd));else if(4!==d&&(a=a.child,null!==a))for(Qi(a,b,c),a=a.sibling;null!==a;)Qi(a,b,c),a=a.sibling}
	function Ri(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Ri(a,b,c),a=a.sibling;null!==a;)Ri(a,b,c),a=a.sibling}
	function Mi(a,b,c){for(var d=b,e=!1,f,g;;){if(!e){e=d.return;a:for(;;){if(null===e)throw Error(u(160));f=e.stateNode;switch(e.tag){case 5:g=!1;break a;case 3:f=f.containerInfo;g=!0;break a;case 4:f=f.containerInfo;g=!0;break a}e=e.return}e=!0}if(5===d.tag||6===d.tag){a:for(var h=a,k=d,l=c,m=k;;)if(Ki(h,m,l),null!==m.child&&4!==m.tag)m.child.return=m,m=m.child;else{if(m===k)break a;for(;null===m.sibling;){if(null===m.return||m.return===k)break a;m=m.return}m.sibling.return=m.return;m=m.sibling}g?(h=
	f,k=d.stateNode,8===h.nodeType?h.parentNode.removeChild(k):h.removeChild(k)):f.removeChild(d.stateNode)}else if(4===d.tag){if(null!==d.child){f=d.stateNode.containerInfo;g=!0;d.child.return=d;d=d.child;continue}}else if(Ki(a,d,c),null!==d.child){d.child.return=d;d=d.child;continue}if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;4===d.tag&&(e=!1)}d.sibling.return=d.return;d=d.sibling}}
	function Si(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:Hi(3,b);return;case 1:return;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps,e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[Nd]=d;"input"===a&&"radio"===d.type&&null!=d.name&&Bb(c,d);pd(a,e);b=pd(a,d);for(e=0;e<f.length;e+=2){var g=f[e],h=f[e+1];"style"===g?md(c,h):"dangerouslySetInnerHTML"===g?Qb(c,h):"children"===g?Rb(c,h):Xa(c,g,h,b)}switch(a){case "input":Cb(c,d);break;
	case "textarea":Kb(c,d);break;case "select":b=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,a=d.value,null!=a?Hb(c,!!d.multiple,a,!1):b!==!!d.multiple&&(null!=d.defaultValue?Hb(c,!!d.multiple,d.defaultValue,!0):Hb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(u(162));b.stateNode.nodeValue=b.memoizedProps;return;case 3:b=b.stateNode;b.hydrate&&(b.hydrate=!1,Vc(b.containerInfo));return;case 12:return;case 13:c=b;null===b.memoizedState?
	d=!1:(d=!0,c=b.child,Ti=$f());if(null!==c)a:for(a=c;;){if(5===a.tag)f=a.stateNode,d?(f=f.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(f=a.stateNode,e=a.memoizedProps.style,e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null,f.style.display=ld("display",e));else if(6===a.tag)a.stateNode.nodeValue=d?"":a.memoizedProps;else if(13===a.tag&&null!==a.memoizedState&&null===a.memoizedState.dehydrated){f=a.child.sibling;f.return=a;a=
	f;continue}else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===c)break;for(;null===a.sibling;){if(null===a.return||a.return===c)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}Ui(b);return;case 19:Ui(b);return;case 17:return}throw Error(u(163));}function Ui(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Bi);b.forEach(function(b){var d=Vi.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
	var Wi="function"===typeof WeakMap?WeakMap:Map;function Xi(a,b,c){c=wg(c,null);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Yi||(Yi=!0,Zi=d);Ci(a,b)};return c}
	function $i(a,b,c){c=wg(c,null);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ci(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===aj?aj=new Set([this]):aj.add(this),Ci(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
	var bj=Math.ceil,cj=Wa.ReactCurrentDispatcher,dj=Wa.ReactCurrentOwner,V=0,ej=8,fj=16,gj=32,ti=0,hj=1,ij=2,ui=3,vi=4,jj=5,W=V,T=null,X=null,U=0,S=ti,kj=null,lj=1073741823,mj=1073741823,nj=null,wi=0,oj=!1,Ti=0,pj=500,Y=null,Yi=!1,Zi=null,aj=null,qj=!1,rj=null,sj=90,tj=null,uj=0,vj=null,wj=0;function Gg(){return(W&(fj|gj))!==V?1073741821-($f()/10|0):0!==wj?wj:wj=1073741821-($f()/10|0)}
	function Hg(a,b,c){b=b.mode;if(0===(b&2))return 1073741823;var d=ag();if(0===(b&4))return 99===d?1073741823:1073741822;if((W&fj)!==V)return U;if(null!==c)a=hg(a,c.timeoutMs|0||5E3,250);else switch(d){case 99:a=1073741823;break;case 98:a=hg(a,150,100);break;case 97:case 96:a=hg(a,5E3,250);break;case 95:a=2;break;default:throw Error(u(326));}null!==T&&a===U&&--a;return a}
	function Ig(a,b){if(50<uj)throw uj=0,vj=null,Error(u(185));a=xj(a,b);if(null!==a){var c=ag();1073741823===b?(W&ej)!==V&&(W&(fj|gj))===V?yj(a):(Z(a),W===V&&gg()):Z(a);(W&4)===V||98!==c&&99!==c||(null===tj?tj=new Map([[a,b]]):(c=tj.get(a),(void 0===c||c>b)&&tj.set(a,b)))}}
	function xj(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return}null!==e&&(T===e&&(Bg(b),S===vi&&xi(e,U)),yi(e,b));return e}
	function zj(a){var b=a.lastExpiredTime;if(0!==b)return b;b=a.firstPendingTime;if(!Aj(a,b))return b;var c=a.lastPingedTime;a=a.nextKnownPendingLevel;a=c>a?c:a;return 2>=a&&b!==a?0:a}
	function Z(a){if(0!==a.lastExpiredTime)a.callbackExpirationTime=1073741823,a.callbackPriority=99,a.callbackNode=eg(yj.bind(null,a));else{var b=zj(a),c=a.callbackNode;if(0===b)null!==c&&(a.callbackNode=null,a.callbackExpirationTime=0,a.callbackPriority=90);else{var d=Gg();1073741823===b?d=99:1===b||2===b?d=95:(d=10*(1073741821-b)-10*(1073741821-d),d=0>=d?99:250>=d?98:5250>=d?97:95);if(null!==c){var e=a.callbackPriority;if(a.callbackExpirationTime===b&&e>=d)return;c!==Tf&&Kf(c)}a.callbackExpirationTime=
	b;a.callbackPriority=d;b=1073741823===b?eg(yj.bind(null,a)):dg(d,Bj.bind(null,a),{timeout:10*(1073741821-b)-$f()});a.callbackNode=b}}}
	function Bj(a,b){wj=0;if(b)return b=Gg(),Cj(a,b),Z(a),null;var c=zj(a);if(0!==c){b=a.callbackNode;if((W&(fj|gj))!==V)throw Error(u(327));Dj();a===T&&c===U||Ej(a,c);if(null!==X){var d=W;W|=fj;var e=Fj();do try{Gj();break}catch(h){Hj(a,h)}while(1);ng();W=d;cj.current=e;if(S===hj)throw b=kj,Ej(a,c),xi(a,c),Z(a),b;if(null===X)switch(e=a.finishedWork=a.current.alternate,a.finishedExpirationTime=c,d=S,T=null,d){case ti:case hj:throw Error(u(345));case ij:Cj(a,2<c?2:c);break;case ui:xi(a,c);d=a.lastSuspendedTime;
	c===d&&(a.nextKnownPendingLevel=Ij(e));if(1073741823===lj&&(e=Ti+pj-$f(),10<e)){if(oj){var f=a.lastPingedTime;if(0===f||f>=c){a.lastPingedTime=c;Ej(a,c);break}}f=zj(a);if(0!==f&&f!==c)break;if(0!==d&&d!==c){a.lastPingedTime=d;break}a.timeoutHandle=Hd(Jj.bind(null,a),e);break}Jj(a);break;case vi:xi(a,c);d=a.lastSuspendedTime;c===d&&(a.nextKnownPendingLevel=Ij(e));if(oj&&(e=a.lastPingedTime,0===e||e>=c)){a.lastPingedTime=c;Ej(a,c);break}e=zj(a);if(0!==e&&e!==c)break;if(0!==d&&d!==c){a.lastPingedTime=
	d;break}1073741823!==mj?d=10*(1073741821-mj)-$f():1073741823===lj?d=0:(d=10*(1073741821-lj)-5E3,e=$f(),c=10*(1073741821-c)-e,d=e-d,0>d&&(d=0),d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*bj(d/1960))-d,c<d&&(d=c));if(10<d){a.timeoutHandle=Hd(Jj.bind(null,a),d);break}Jj(a);break;case jj:if(1073741823!==lj&&null!==nj){f=lj;var g=nj;d=g.busyMinDurationMs|0;0>=d?d=0:(e=g.busyDelayMs|0,f=$f()-(10*(1073741821-f)-(g.timeoutMs|0||5E3)),d=f<=e?0:e+d-f);if(10<d){xi(a,c);a.timeoutHandle=
	Hd(Jj.bind(null,a),d);break}}Jj(a);break;default:throw Error(u(329));}Z(a);if(a.callbackNode===b)return Bj.bind(null,a)}}return null}
	function yj(a){var b=a.lastExpiredTime;b=0!==b?b:1073741823;if((W&(fj|gj))!==V)throw Error(u(327));Dj();a===T&&b===U||Ej(a,b);if(null!==X){var c=W;W|=fj;var d=Fj();do try{Kj();break}catch(e){Hj(a,e)}while(1);ng();W=c;cj.current=d;if(S===hj)throw c=kj,Ej(a,b),xi(a,b),Z(a),c;if(null!==X)throw Error(u(261));a.finishedWork=a.current.alternate;a.finishedExpirationTime=b;T=null;Jj(a);Z(a)}return null}function Lj(){if(null!==tj){var a=tj;tj=null;a.forEach(function(a,c){Cj(c,a);Z(c)});gg()}}
	function Mj(a,b){var c=W;W|=1;try{return a(b)}finally{W=c,W===V&&gg()}}function Nj(a,b){var c=W;W&=-2;W|=ej;try{return a(b)}finally{W=c,W===V&&gg()}}
	function Ej(a,b){a.finishedWork=null;a.finishedExpirationTime=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Id(c));if(null!==X)for(c=X.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Df();break;case 3:eh();H(K);H(J);break;case 5:gh(d);break;case 4:eh();break;case 13:H(M);break;case 19:H(M);break;case 10:og(d)}c=c.return}T=a;X=Sg(a.current,null);U=b;S=ti;kj=null;mj=lj=1073741823;nj=null;wi=0;oj=!1}
	function Hj(a,b){do{try{ng();jh.current=sh;if(mh)for(var c=N.memoizedState;null!==c;){var d=c.queue;null!==d&&(d.pending=null);c=c.next}lh=0;P=O=N=null;mh=!1;if(null===X||null===X.return)return S=hj,kj=b,X=null;a:{var e=a,f=X.return,g=X,h=b;b=U;g.effectTag|=2048;g.firstEffect=g.lastEffect=null;if(null!==h&&"object"===typeof h&&"function"===typeof h.then){var k=h;if(0===(g.mode&2)){var l=g.alternate;l?(g.updateQueue=l.updateQueue,g.memoizedState=l.memoizedState,g.expirationTime=l.expirationTime):(g.updateQueue=
	null,g.memoizedState=null)}var m=0!==(M.current&1),p=f;do{var x;if(x=13===p.tag){var z=p.memoizedState;if(null!==z)x=null!==z.dehydrated?!0:!1;else{var ca=p.memoizedProps;x=void 0===ca.fallback?!1:!0!==ca.unstable_avoidThisFallback?!0:m?!1:!0}}if(x){var D=p.updateQueue;if(null===D){var t=new Set;t.add(k);p.updateQueue=t}else D.add(k);if(0===(p.mode&2)){p.effectTag|=64;g.effectTag&=-2981;if(1===g.tag)if(null===g.alternate)g.tag=17;else{var y=wg(1073741823,null);y.tag=2;xg(g,y)}g.expirationTime=1073741823;
	break a}h=void 0;g=b;var A=e.pingCache;null===A?(A=e.pingCache=new Wi,h=new Set,A.set(k,h)):(h=A.get(k),void 0===h&&(h=new Set,A.set(k,h)));if(!h.has(g)){h.add(g);var q=Oj.bind(null,e,k,g);k.then(q,q)}p.effectTag|=4096;p.expirationTime=b;break a}p=p.return}while(null!==p);h=Error((pb(g.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+qb(g))}S!==
	jj&&(S=ij);h=Ai(h,g);p=f;do{switch(p.tag){case 3:k=h;p.effectTag|=4096;p.expirationTime=b;var B=Xi(p,k,b);yg(p,B);break a;case 1:k=h;var w=p.type,ub=p.stateNode;if(0===(p.effectTag&64)&&("function"===typeof w.getDerivedStateFromError||null!==ub&&"function"===typeof ub.componentDidCatch&&(null===aj||!aj.has(ub)))){p.effectTag|=4096;p.expirationTime=b;var vb=$i(p,k,b);yg(p,vb);break a}}p=p.return}while(null!==p)}X=Pj(X)}catch(Xc){b=Xc;continue}break}while(1)}
	function Fj(){var a=cj.current;cj.current=sh;return null===a?sh:a}function Ag(a,b){a<lj&&2<a&&(lj=a);null!==b&&a<mj&&2<a&&(mj=a,nj=b)}function Bg(a){a>wi&&(wi=a)}function Kj(){for(;null!==X;)X=Qj(X)}function Gj(){for(;null!==X&&!Uf();)X=Qj(X)}function Qj(a){var b=Rj(a.alternate,a,U);a.memoizedProps=a.pendingProps;null===b&&(b=Pj(a));dj.current=null;return b}
	function Pj(a){X=a;do{var b=X.alternate;a=X.return;if(0===(X.effectTag&2048)){b=si(b,X,U);if(1===U||1!==X.childExpirationTime){for(var c=0,d=X.child;null!==d;){var e=d.expirationTime,f=d.childExpirationTime;e>c&&(c=e);f>c&&(c=f);d=d.sibling}X.childExpirationTime=c}if(null!==b)return b;null!==a&&0===(a.effectTag&2048)&&(null===a.firstEffect&&(a.firstEffect=X.firstEffect),null!==X.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=X.firstEffect),a.lastEffect=X.lastEffect),1<X.effectTag&&(null!==
	a.lastEffect?a.lastEffect.nextEffect=X:a.firstEffect=X,a.lastEffect=X))}else{b=zi(X);if(null!==b)return b.effectTag&=2047,b;null!==a&&(a.firstEffect=a.lastEffect=null,a.effectTag|=2048)}b=X.sibling;if(null!==b)return b;X=a}while(null!==X);S===ti&&(S=jj);return null}function Ij(a){var b=a.expirationTime;a=a.childExpirationTime;return b>a?b:a}function Jj(a){var b=ag();cg(99,Sj.bind(null,a,b));return null}
	function Sj(a,b){do Dj();while(null!==rj);if((W&(fj|gj))!==V)throw Error(u(327));var c=a.finishedWork,d=a.finishedExpirationTime;if(null===c)return null;a.finishedWork=null;a.finishedExpirationTime=0;if(c===a.current)throw Error(u(177));a.callbackNode=null;a.callbackExpirationTime=0;a.callbackPriority=90;a.nextKnownPendingLevel=0;var e=Ij(c);a.firstPendingTime=e;d<=a.lastSuspendedTime?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:d<=a.firstSuspendedTime&&(a.firstSuspendedTime=
	d-1);d<=a.lastPingedTime&&(a.lastPingedTime=0);d<=a.lastExpiredTime&&(a.lastExpiredTime=0);a===T&&(X=T=null,U=0);1<c.effectTag?null!==c.lastEffect?(c.lastEffect.nextEffect=c,e=c.firstEffect):e=c:e=c.firstEffect;if(null!==e){var f=W;W|=gj;dj.current=null;Dd=fd;var g=xd();if(yd(g)){if("selectionStart"in g)var h={start:g.selectionStart,end:g.selectionEnd};else a:{h=(h=g.ownerDocument)&&h.defaultView||window;var k=h.getSelection&&h.getSelection();if(k&&0!==k.rangeCount){h=k.anchorNode;var l=k.anchorOffset,
	m=k.focusNode;k=k.focusOffset;try{h.nodeType,m.nodeType}catch(wb){h=null;break a}var p=0,x=-1,z=-1,ca=0,D=0,t=g,y=null;b:for(;;){for(var A;;){t!==h||0!==l&&3!==t.nodeType||(x=p+l);t!==m||0!==k&&3!==t.nodeType||(z=p+k);3===t.nodeType&&(p+=t.nodeValue.length);if(null===(A=t.firstChild))break;y=t;t=A}for(;;){if(t===g)break b;y===h&&++ca===l&&(x=p);y===m&&++D===k&&(z=p);if(null!==(A=t.nextSibling))break;t=y;y=t.parentNode}t=A}h=-1===x||-1===z?null:{start:x,end:z}}else h=null}h=h||{start:0,end:0}}else h=
	null;Ed={activeElementDetached:null,focusedElem:g,selectionRange:h};fd=!1;Y=e;do try{Tj()}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);Y=e;do try{for(g=a,h=b;null!==Y;){var q=Y.effectTag;q&16&&Rb(Y.stateNode,"");if(q&128){var B=Y.alternate;if(null!==B){var w=B.ref;null!==w&&("function"===typeof w?w(null):w.current=null)}}switch(q&1038){case 2:Pi(Y);Y.effectTag&=-3;break;case 6:Pi(Y);Y.effectTag&=-3;Si(Y.alternate,Y);break;case 1024:Y.effectTag&=-1025;break;case 1028:Y.effectTag&=
	-1025;Si(Y.alternate,Y);break;case 4:Si(Y.alternate,Y);break;case 8:l=Y,Mi(g,l,h),Ni(l)}Y=Y.nextEffect}}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);w=Ed;B=xd();q=w.focusedElem;h=w.selectionRange;if(B!==q&&q&&q.ownerDocument&&wd(q.ownerDocument.documentElement,q)){null!==h&&yd(q)&&(B=h.start,w=h.end,void 0===w&&(w=B),"selectionStart"in q?(q.selectionStart=B,q.selectionEnd=Math.min(w,q.value.length)):(w=(B=q.ownerDocument||document)&&B.defaultView||window,w.getSelection&&
	(w=w.getSelection(),l=q.textContent.length,g=Math.min(h.start,l),h=void 0===h.end?g:Math.min(h.end,l),!w.extend&&g>h&&(l=h,h=g,g=l),l=vd(q,g),m=vd(q,h),l&&m&&(1!==w.rangeCount||w.anchorNode!==l.node||w.anchorOffset!==l.offset||w.focusNode!==m.node||w.focusOffset!==m.offset)&&(B=B.createRange(),B.setStart(l.node,l.offset),w.removeAllRanges(),g>h?(w.addRange(B),w.extend(m.node,m.offset)):(B.setEnd(m.node,m.offset),w.addRange(B))))));B=[];for(w=q;w=w.parentNode;)1===w.nodeType&&B.push({element:w,left:w.scrollLeft,
	top:w.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<B.length;q++)w=B[q],w.element.scrollLeft=w.left,w.element.scrollTop=w.top}fd=!!Dd;Ed=Dd=null;a.current=c;Y=e;do try{for(q=a;null!==Y;){var ub=Y.effectTag;ub&36&&Ji(q,Y.alternate,Y);if(ub&128){B=void 0;var vb=Y.ref;if(null!==vb){var Xc=Y.stateNode;switch(Y.tag){case 5:B=Xc;break;default:B=Xc}"function"===typeof vb?vb(B):vb.current=B}}Y=Y.nextEffect}}catch(wb){if(null===Y)throw Error(u(330));Ei(Y,wb);Y=Y.nextEffect}while(null!==Y);Y=
	null;Vf();W=f}else a.current=c;if(qj)qj=!1,rj=a,sj=b;else for(Y=e;null!==Y;)b=Y.nextEffect,Y.nextEffect=null,Y=b;b=a.firstPendingTime;0===b&&(aj=null);1073741823===b?a===vj?uj++:(uj=0,vj=a):uj=0;"function"===typeof Uj&&Uj(c.stateNode,d);Z(a);if(Yi)throw Yi=!1,a=Zi,Zi=null,a;if((W&ej)!==V)return null;gg();return null}function Tj(){for(;null!==Y;){var a=Y.effectTag;0!==(a&256)&&Gi(Y.alternate,Y);0===(a&512)||qj||(qj=!0,dg(97,function(){Dj();return null}));Y=Y.nextEffect}}
	function Dj(){if(90!==sj){var a=97<sj?97:sj;sj=90;return cg(a,Vj)}}function Vj(){if(null===rj)return!1;var a=rj;rj=null;if((W&(fj|gj))!==V)throw Error(u(331));var b=W;W|=gj;for(a=a.current.firstEffect;null!==a;){try{var c=a;if(0!==(c.effectTag&512))switch(c.tag){case 0:case 11:case 15:case 22:Hi(5,c),Ii(5,c)}}catch(d){if(null===a)throw Error(u(330));Ei(a,d)}c=a.nextEffect;a.nextEffect=null;a=c}W=b;gg();return!0}
	function Wj(a,b,c){b=Ai(c,b);b=Xi(a,b,1073741823);xg(a,b);a=xj(a,1073741823);null!==a&&Z(a)}function Ei(a,b){if(3===a.tag)Wj(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){Wj(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===aj||!aj.has(d))){a=Ai(b,a);a=$i(c,a,1073741823);xg(c,a);c=xj(c,1073741823);null!==c&&Z(c);break}}c=c.return}}
	function Oj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);T===a&&U===c?S===vi||S===ui&&1073741823===lj&&$f()-Ti<pj?Ej(a,U):oj=!0:Aj(a,c)&&(b=a.lastPingedTime,0!==b&&b<c||(a.lastPingedTime=c,Z(a)))}function Vi(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=Gg(),b=Hg(b,a,null));a=xj(a,b);null!==a&&Z(a)}var Rj;
	Rj=function(a,b,c){var d=b.expirationTime;if(null!==a){var e=b.pendingProps;if(a.memoizedProps!==e||K.current)rg=!0;else{if(d<c){rg=!1;switch(b.tag){case 3:hi(b);Xh();break;case 5:fh(b);if(b.mode&4&&1!==c&&e.hidden)return b.expirationTime=b.childExpirationTime=1,null;break;case 1:L(b.type)&&Gf(b);break;case 4:dh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;e=b.type._context;I(jg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;
	if(0!==d&&d>=c)return ji(a,b,c);I(M,M.current&1);b=$h(a,b,c);return null!==b?b.sibling:null}I(M,M.current&1);break;case 19:d=b.childExpirationTime>=c;if(0!==(a.effectTag&64)){if(d)return mi(a,b,c);b.effectTag|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null);I(M,M.current);if(!d)return null}return $h(a,b,c)}rg=!1}}else rg=!1;b.expirationTime=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;e=Cf(b,J.current);qg(b,c);e=oh(null,
	b,d,a,e,c);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(L(d)){var f=!0;Gf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;ug(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Fg(b,d,g,a);e.updater=Jg;b.stateNode=e;e._reactInternalFiber=b;Ng(b,d,a,c);b=gi(null,b,d,!0,f,c)}else b.tag=0,R(null,b,e,c),b=b.child;return b;case 16:a:{e=b.elementType;null!==a&&(a.alternate=
	null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;ob(e);if(1!==e._status)throw e._result;e=e._result;b.type=e;f=b.tag=Xj(e);a=ig(e,a);switch(f){case 0:b=di(null,b,e,a,c);break a;case 1:b=fi(null,b,e,a,c);break a;case 11:b=Zh(null,b,e,a,c);break a;case 14:b=ai(null,b,e,ig(e.type,a),d,c);break a}throw Error(u(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),di(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),fi(a,b,d,e,c);
	case 3:hi(b);d=b.updateQueue;if(null===a||null===d)throw Error(u(282));d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;vg(a,b);zg(b,d,null,c);d=b.memoizedState.element;if(d===e)Xh(),b=$h(a,b,c);else{if(e=b.stateNode.hydrate)Ph=Jd(b.stateNode.containerInfo.firstChild),Oh=b,e=Qh=!0;if(e)for(c=Yg(b,null,d,c),b.child=c;c;)c.effectTag=c.effectTag&-3|1024,c=c.sibling;else R(a,b,d,c),Xh();b=b.child}return b;case 5:return fh(b),null===a&&Uh(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:
	null,g=e.children,Gd(d,e)?g=null:null!==f&&Gd(d,f)&&(b.effectTag|=16),ei(a,b),b.mode&4&&1!==c&&e.hidden?(b.expirationTime=b.childExpirationTime=1,b=null):(R(a,b,g,c),b=b.child),b;case 6:return null===a&&Uh(b),null;case 13:return ji(a,b,c);case 4:return dh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Xg(b,null,d,c):R(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),Zh(a,b,d,e,c);case 7:return R(a,b,b.pendingProps,c),b.child;case 8:return R(a,
	b,b.pendingProps.children,c),b.child;case 12:return R(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(jg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=$e(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!K.current){b=$h(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==
	k){g=h.child;for(var l=k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=wg(c,null),l.tag=2,xg(h,l));h.expirationTime<c&&(h.expirationTime=c);l=h.alternate;null!==l&&l.expirationTime<c&&(l.expirationTime=c);pg(h.return,c);k.expirationTime<c&&(k.expirationTime=c);break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=
	g}R(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,qg(b,c),e=sg(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,R(a,b,d,c),b.child;case 14:return e=b.type,f=ig(e,b.pendingProps),f=ig(e.type,f),ai(a,b,e,f,d,c);case 15:return ci(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ig(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,L(d)?(a=!0,Gf(b)):a=!1,qg(b,c),Lg(b,d,e),Ng(b,d,e,c),gi(null,
	b,d,!0,a,c);case 19:return mi(a,b,c)}throw Error(u(156,b.tag));};var Uj=null,Li=null;function Yj(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Uj=function(a){try{b.onCommitFiberRoot(c,a,void 0,64===(a.current.effectTag&64))}catch(e){}};Li=function(a){try{b.onCommitFiberUnmount(c,a)}catch(e){}}}catch(d){}return!0}
	function Zj(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null}function Sh(a,b,c,d){return new Zj(a,b,c,d)}
	function bi(a){a=a.prototype;return!(!a||!a.isReactComponent)}function Xj(a){if("function"===typeof a)return bi(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===gb)return 11;if(a===jb)return 14}return 2}
	function Sg(a,b){var c=a.alternate;null===c?(c=Sh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{expirationTime:b.expirationTime,
	firstContext:b.firstContext,responders:b.responders};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function Ug(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)bi(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ab:return Wg(c.children,e,f,b);case fb:g=8;e|=7;break;case bb:g=8;e|=1;break;case cb:return a=Sh(12,c,b,e|8),a.elementType=cb,a.type=cb,a.expirationTime=f,a;case hb:return a=Sh(13,c,b,e),a.type=hb,a.elementType=hb,a.expirationTime=f,a;case ib:return a=Sh(19,c,b,e),a.elementType=ib,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case db:g=
	10;break a;case eb:g=9;break a;case gb:g=11;break a;case jb:g=14;break a;case kb:g=16;d=null;break a;case lb:g=22;break a}throw Error(u(130,null==a?a:typeof a,""));}b=Sh(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function Wg(a,b,c,d){a=Sh(7,a,d,b);a.expirationTime=c;return a}function Tg(a,b,c){a=Sh(6,a,null,b);a.expirationTime=c;return a}
	function Vg(a,b,c){b=Sh(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function ak(a,b,c){this.tag=b;this.current=null;this.containerInfo=a;this.pingCache=this.pendingChildren=null;this.finishedExpirationTime=0;this.finishedWork=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=90;this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}
	function Aj(a,b){var c=a.firstSuspendedTime;a=a.lastSuspendedTime;return 0!==c&&c>=b&&a<=b}function xi(a,b){var c=a.firstSuspendedTime,d=a.lastSuspendedTime;c<b&&(a.firstSuspendedTime=b);if(d>b||0===c)a.lastSuspendedTime=b;b<=a.lastPingedTime&&(a.lastPingedTime=0);b<=a.lastExpiredTime&&(a.lastExpiredTime=0)}
	function yi(a,b){b>a.firstPendingTime&&(a.firstPendingTime=b);var c=a.firstSuspendedTime;0!==c&&(b>=c?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:b>=a.lastSuspendedTime&&(a.lastSuspendedTime=b+1),b>a.nextKnownPendingLevel&&(a.nextKnownPendingLevel=b))}function Cj(a,b){var c=a.lastExpiredTime;if(0===c||c>b)a.lastExpiredTime=b}
	function bk(a,b,c,d){var e=b.current,f=Gg(),g=Dg.suspense;f=Hg(f,e,g);a:if(c){c=c._reactInternalFiber;b:{if(dc(c)!==c||1!==c.tag)throw Error(u(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(L(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(u(171));}if(1===c.tag){var k=c.type;if(L(k)){c=Ff(c,k,h);break a}}c=h}else c=Af;null===b.context?b.context=c:b.pendingContext=c;b=wg(f,g);b.payload={element:a};d=void 0===
	d?null:d;null!==d&&(b.callback=d);xg(e,b);Ig(e,f);return f}function ck(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function dk(a,b){a=a.memoizedState;null!==a&&null!==a.dehydrated&&a.retryTime<b&&(a.retryTime=b)}function ek(a,b){dk(a,b);(a=a.alternate)&&dk(a,b)}
	function fk(a,b,c){c=null!=c&&!0===c.hydrate;var d=new ak(a,b,c),e=Sh(3,null,null,2===b?7:1===b?3:0);d.current=e;e.stateNode=d;ug(e);a[Od]=d.current;c&&0!==b&&Jc(a,9===a.nodeType?a:a.ownerDocument);this._internalRoot=d}fk.prototype.render=function(a){bk(a,this._internalRoot,null,null)};fk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;bk(null,a,null,function(){b[Od]=null})};
	function gk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function hk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new fk(a,0,b?{hydrate:!0}:void 0)}
	function ik(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=ck(g);h.call(a)}}bk(b,g,a,e)}else{f=c._reactRootContainer=hk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=ck(g);k.call(a)}}Nj(function(){bk(b,g,a,e)})}return ck(g)}function jk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:$a,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	wc=function(a){if(13===a.tag){var b=hg(Gg(),150,100);Ig(a,b);ek(a,b)}};xc=function(a){13===a.tag&&(Ig(a,3),ek(a,3))};yc=function(a){if(13===a.tag){var b=Gg();b=Hg(b,a,null);Ig(a,b);ek(a,b)}};
	za=function(a,b,c){switch(b){case "input":Cb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Qd(d);if(!e)throw Error(u(90));yb(d);Cb(d,e)}}}break;case "textarea":Kb(a,c);break;case "select":b=c.value,null!=b&&Hb(a,!!c.multiple,b,!1)}};Fa=Mj;
	Ga=function(a,b,c,d,e){var f=W;W|=4;try{return cg(98,a.bind(null,b,c,d,e))}finally{W=f,W===V&&gg()}};Ha=function(){(W&(1|fj|gj))===V&&(Lj(),Dj())};Ia=function(a,b){var c=W;W|=2;try{return a(b)}finally{W=c,W===V&&gg()}};function kk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!gk(b))throw Error(u(200));return jk(a,b,null,c)}var lk={Events:[Nc,Pd,Qd,xa,ta,Xd,function(a){jc(a,Wd)},Da,Ea,id,mc,Dj,{current:!1}]};
	(function(a){var b=a.findFiberByHostInstance;return Yj(n({},a,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Wa.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=hc(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))})({findFiberByHostInstance:tc,bundleType:0,version:"16.13.1",
	rendererPackageName:"react-dom"});exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lk;exports.createPortal=kk;exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(void 0===b){if("function"===typeof a.render)throw Error(u(188));throw Error(u(268,Object.keys(a)));}a=hc(b);a=null===a?null:a.stateNode;return a};
	exports.flushSync=function(a,b){if((W&(fj|gj))!==V)throw Error(u(187));var c=W;W|=1;try{return cg(99,a.bind(null,b))}finally{W=c,gg()}};exports.hydrate=function(a,b,c){if(!gk(b))throw Error(u(200));return ik(null,a,b,!0,c)};exports.render=function(a,b,c){if(!gk(b))throw Error(u(200));return ik(null,a,b,!1,c)};
	exports.unmountComponentAtNode=function(a){if(!gk(a))throw Error(u(40));return a._reactRootContainer?(Nj(function(){ik(null,null,a,!1,function(){a._reactRootContainer=null;a[Od]=null})}),!0):!1};exports.unstable_batchedUpdates=Mj;exports.unstable_createPortal=function(a,b){return kk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
	exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!gk(c))throw Error(u(200));if(null==a||void 0===a._reactInternalFiber)throw Error(u(38));return ik(a,b,c,!1,d)};exports.version="16.13.1";


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  if (false) {
	    // This branch is unreachable because this function is only called
	    // in production, but the condition is true only in development.
	    // Therefore if the branch is still here, dead code elimination wasn't
	    // properly applied.
	    // Don't change the message. React DevTools relies on it. Also make sure
	    // this message doesn't occur elsewhere in this function, or it will cause
	    // a false positive.
	    throw new Error('^_^');
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	if (true) {
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = __webpack_require__(37);
	} else {
	  module.exports = require('./cjs/react-dom.development.js');
	}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint-disable global-require */

	if (true) {
	  module.exports = __webpack_require__(41);
	} else {
	  module.exports = require('./AppContainer.dev');
	}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-disable react/prop-types */

	var React = __webpack_require__(1);

	var Component = React.Component;

	var AppContainer = function (_Component) {
	  _inherits(AppContainer, _Component);

	  function AppContainer() {
	    _classCallCheck(this, AppContainer);

	    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
	  }

	  _createClass(AppContainer, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.component) {
	        return React.createElement(this.props.component, this.props.props);
	      }

	      return React.Children.only(this.props.children);
	    }
	  }]);

	  return AppContainer;
	}(Component);

	module.exports = AppContainer;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint-disable global-require */

	if (true) {
	  module.exports = __webpack_require__(43);
	} else {
	  module.exports = require('./index.dev');
	}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports.AppContainer = __webpack_require__(40);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.13.1
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';var l=__webpack_require__(9),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
	60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
	function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}var I=H.prototype=new G;I.constructor=H;l(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
	function N(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
	function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
	function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
	0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++)}
	function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a))}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b)}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
	var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:l};exports.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
	exports.Component=F;exports.Fragment=r;exports.Profiler=u;exports.PureComponent=H;exports.StrictMode=t;exports.Suspense=y;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
	exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=l({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,
	key:d,ref:g,props:e,_owner:k}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:x,render:a}};exports.isValidElement=O;
	exports.lazy=function(a){return{$$typeof:A,_ctor:a,_status:-1,_result:null}};exports.memo=function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return Z().useCallback(a,b)};exports.useContext=function(a,b){return Z().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return Z().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
	exports.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return Z().useMemo(a,b)};exports.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};exports.useRef=function(a){return Z().useRef(a)};exports.useState=function(a){return Z().useState(a)};exports.version="16.13.1";


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	/** @license React v0.19.1
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';var f,g,h,k,l;
	if("undefined"===typeof window||"function"!==typeof MessageChannel){var p=null,q=null,t=function(){if(null!==p)try{var a=exports.unstable_now();p(!0,a);p=null}catch(b){throw setTimeout(t,0),b;}},u=Date.now();exports.unstable_now=function(){return Date.now()-u};f=function(a){null!==p?setTimeout(f,0,a):(p=a,setTimeout(t,0))};g=function(a,b){q=setTimeout(a,b)};h=function(){clearTimeout(q)};k=function(){return!1};l=exports.unstable_forceFrameRate=function(){}}else{var w=window.performance,x=window.Date,
	y=window.setTimeout,z=window.clearTimeout;if("undefined"!==typeof console){var A=window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");"function"!==typeof A&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"===
	typeof w&&"function"===typeof w.now)exports.unstable_now=function(){return w.now()};else{var B=x.now();exports.unstable_now=function(){return x.now()-B}}var C=!1,D=null,E=-1,F=5,G=0;k=function(){return exports.unstable_now()>=G};l=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):F=0<a?Math.floor(1E3/a):5};var H=new MessageChannel,I=H.port2;H.port1.onmessage=
	function(){if(null!==D){var a=exports.unstable_now();G=a+F;try{D(!0,a)?I.postMessage(null):(C=!1,D=null)}catch(b){throw I.postMessage(null),b;}}else C=!1};f=function(a){D=a;C||(C=!0,I.postMessage(null))};g=function(a,b){E=y(function(){a(exports.unstable_now())},b)};h=function(){z(E);E=-1}}function J(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<K(e,b))a[d]=b,a[c]=e,c=d;else break a}}function L(a){a=a[0];return void 0===a?null:a}
	function M(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>K(n,c))void 0!==r&&0>K(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>K(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function K(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var N=[],O=[],P=1,Q=null,R=3,S=!1,T=!1,U=!1;
	function V(a){for(var b=L(O);null!==b;){if(null===b.callback)M(O);else if(b.startTime<=a)M(O),b.sortIndex=b.expirationTime,J(N,b);else break;b=L(O)}}function W(a){U=!1;V(a);if(!T)if(null!==L(N))T=!0,f(X);else{var b=L(O);null!==b&&g(W,b.startTime-a)}}
	function X(a,b){T=!1;U&&(U=!1,h());S=!0;var c=R;try{V(b);for(Q=L(N);null!==Q&&(!(Q.expirationTime>b)||a&&!k());){var d=Q.callback;if(null!==d){Q.callback=null;R=Q.priorityLevel;var e=d(Q.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?Q.callback=e:Q===L(N)&&M(N);V(b)}else M(N);Q=L(N)}if(null!==Q)var m=!0;else{var n=L(O);null!==n&&g(W,n.startTime-b);m=!1}return m}finally{Q=null,R=c,S=!1}}
	function Y(a){switch(a){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1E4;default:return 5E3}}var Z=l;exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){T||S||(T=!0,f(X))};
	exports.unstable_getCurrentPriorityLevel=function(){return R};exports.unstable_getFirstCallbackNode=function(){return L(N)};exports.unstable_next=function(a){switch(R){case 1:case 2:case 3:var b=3;break;default:b=R}var c=R;R=b;try{return a()}finally{R=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=Z;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=R;R=a;try{return b()}finally{R=c}};
	exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();if("object"===typeof c&&null!==c){var e=c.delay;e="number"===typeof e&&0<e?d+e:d;c="number"===typeof c.timeout?c.timeout:Y(a)}else c=Y(a),e=d;c=e+c;a={id:P++,callback:b,priorityLevel:a,startTime:e,expirationTime:c,sortIndex:-1};e>d?(a.sortIndex=e,J(O,a),null===L(N)&&a===L(O)&&(U?h():U=!0,g(W,e-d))):(a.sortIndex=c,J(N,a),T||S||(T=!0,f(X)));return a};
	exports.unstable_shouldYield=function(){var a=exports.unstable_now();V(a);var b=L(N);return b!==Q&&null!==Q&&null!==b&&null!==b.callback&&b.startTime<=a&&b.expirationTime<Q.expirationTime||k()};exports.unstable_wrapCallback=function(a){var b=R;return function(){var c=R;R=b;try{return a.apply(this,arguments)}finally{R=c}}};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(45);
	} else {
	  module.exports = require('./cjs/scheduler.development.js');
	}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(47)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!./index.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict'

	module.exports = function (ac, value) {
	  value = (value || value === 0) ? value : 1
	  var buffer = ac.createBuffer(1, 2, ac.sampleRate)
	  var data = buffer.getChannelData(0)
	  data[0] = data[1] = value
	  var source = ac.createBufferSource()
	  source.buffer = buffer
	  source.loop = true
	  return source
	}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ]);