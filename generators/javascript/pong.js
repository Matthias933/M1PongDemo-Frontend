/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for Bachmann M1 blocks.
 * @author l.blenk@bachmann.info (Lukas Blenk)
 */
'use strict';

goog.provide('Blockly.JavaScript.pong');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['pong_setPosP1'] = function(block) {
  var position = Blockly.JavaScript.valueToCode(block, 'POSITION',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return '\
setPosP1(' + position + ');\n\
\n';
};

Blockly.JavaScript['pong_setPosP2'] = function(block) {
  var position = Blockly.JavaScript.valueToCode(block, 'POSITION',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return '\
setPosP2(' + position + ');\n\
\n';
};

Blockly.JavaScript['pong_getMaxPos'] = function(block) {
  var position = Blockly.JavaScript.valueToCode(block, 'POSITION',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
      
  return ["canvas.height", Blockly.JavaScript.ORDER_ATOMIC];
};