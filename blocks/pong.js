/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Pong Command Blocks.
 * @author l.blenk@bachmann.info (Lukas Blenk)
 */
'use strict';

goog.provide('Blockly.Blocks.pong');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category. HUE SUCKS! RGB 4 THE WINN!!!!!
 */
Blockly.Blocks.pong.HUE = 0;

Blockly.Blocks['pong_setPosP1'] = {
  /**
   * Block for set Player1 Position.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PONG_SETPOSP1,
      "args0": [
        {
          "type": "input_value",
          "name": "POSITION",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.pong.HUE,
      "tooltip": Blockly.Msg.PONG_SETPOSP1_TOOLTIP,
      "helpUrl": Blockly.Msg.PONG_SETPOSP1_HELPURL
    });
  }
};

Blockly.Blocks['pong_setPosP2'] = {
  /**
   * Block for set Player2 Position.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PONG_SETPOSP2,
      "args0": [
        {
          "type": "input_value",
          "name": "POSITION",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.pong.HUE,
      "tooltip": Blockly.Msg.PONG_SETPOSP2_TOOLTIP,
      "helpUrl": Blockly.Msg.PONG_SETPOSP2_HELPURL
    });
  }
};

Blockly.Blocks['pong_getMaxPos'] = {
  /**
   * Block for set Player2 Position.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.PONG_GETMAXPOS,
      "colour": Blockly.Blocks.pong.HUE,
      "tooltip": Blockly.Msg.PONG_GETMAXPOS_TOOLTIP,
      "helpUrl": Blockly.Msg.PONG_GETMAXPOS_HELPURL
    });
    
    this.setOutput(true, 'Number');
  }
};
