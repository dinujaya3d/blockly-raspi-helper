import {Order} from 'blockly/python';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['raspi_servo_helper'] = function(block:Blockly.Block, generator:Blockly.CodeGenerator) {
  var value_angle = generator.valueToCode(block, 'ANGLE', Order.ATOMIC);
  // TODO: Assemble python into code variable.
  var code = `print("Hello World ${value_angle}")`;
  return code;
};

forBlock['add_text'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const color = generator.valueToCode(block, 'COLOR', Order.ATOMIC) || "'#ffffff'";

  const addText = generator.provideFunction_(
    'addText',
    `def ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, color):
  # Add text to the output area.
  # Since this is Python, we should handle it accordingly.
  # This function should be defined in your Python execution environment
  print(f"Text: {text}, Color: {color}")
`,

  );
  
  // Generate the function call for this block.
  const code = `${addText}(${text}, ${color})\n`;
  return code;
};

