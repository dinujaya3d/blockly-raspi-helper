/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const raspi_servo_helper = {
  type: 'raspi_servo_helper',
  message0: '%1',
  args0: [
    {
      type: 'input_value',
      name: 'ANGLE',
      check: 'Number',
      align: 'CENTRE'
    }
  ],
  inputsInline: false,
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: 'Hello',
  helpUrl: 'hello'
};

const addText = {
  type: 'add_text',
  message0: 'Add text %1 with color %2',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
    {
      type: 'input_value',
      name: 'COLOR',
      check: 'Colour',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  raspi_servo_helper, addText
]);
