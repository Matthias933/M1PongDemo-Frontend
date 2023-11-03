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
 * @fileoverview Bachmann M1 Controller Functions.
 * @author l.blenk@bachmann.info (Lukas Blenk)
 */
'use strict';

goog.provide('Blockly.Blocks.m1');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category. HUE SUCKS! RGB 4 THE WINN!!!!!
 */
Blockly.Blocks.m1.HUE = 130;

Blockly.Blocks['m1_getControllerPos'] = {
  init: function() {
    this.jsonInit({
      "message0": "GetContollerPos CardNb %1 ChannelNb %2 %3 %4",//Blockly.Msg.M1_GETCONTROLLERPOS,//Blockly.Msg.TEXT_PRINT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "CARDNB",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "CHANNELNB",
          "align": "RIGHT"
        },
        {
          "type": "field_variable",
          "name": "REFVALUE"
        },
        {
          "type": "input_statement",
          "name": "EVENTCODE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.m1.HUE,
      "tooltip": Blockly.Msg.M1_GETCONTROLLERPOS_TOOLTIP,
      "helpUrl": Blockly.Msg.M1_GETCONTROLLERPOS_HELPURL
    });
  },
  getVars: function() {
    return [this.getFieldValue('REFVALUE')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('REFVALUE'))) {
      this.setFieldValue(newName, 'REFVALUE');
    }
  },
  contextMenuType_: 'variables_set',
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('REFVALUE');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'REFVALUE');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};
