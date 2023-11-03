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

goog.provide('Blockly.JavaScript.m1');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['m1_getControllerPos'] = function(block) {
  var cardnb = Blockly.JavaScript.valueToCode(block, 'CARDNB',
      Blockly.JavaScript.ORDER_NONE) || 0;

  var channelnb = Blockly.JavaScript.valueToCode(block, 'CHANNELNB',
      Blockly.JavaScript.ORDER_NONE) || 0;

  var refvar = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('REFVALUE'), Blockly.Variables.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(block, 'EVENTCODE');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

 
  const code = '\n\
  m1lib.addEventHandler((data) => {\n\
    if(!("exception" in data)) {\n\
      for(const channelData of data) {\n\
        if(channelData.CardNb === '+cardnb+' && channelData.ChannelNb === '+channelnb+') {\n\
          if(channelData.Value < (-32768)) //AIO is not 16bit\n\
            channelData.Value = (-32768);\n\
          if(channelData.Value > 32767)    //AIO is not 16bit\n\
            channelData.Value = 32767;\n\
          channelData.Value += 32768\n\
          '+refvar+' = channelData.Value\n\
          '+branch+'\n\
        }\n\
      }\n\
    }\n\
  })\n\
  '

  return code;
};