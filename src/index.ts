import * as Blockly from 'blockly';
import { blocks } from './blocks/raspi_servo_helper';
import { forBlock } from './generators/python';
import { pythonGenerator } from 'blockly/python';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import { block } from 'blockly/core/tooltip';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(pythonGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild as HTMLElement;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const copyButton = document.getElementById('copyButton');

var options = {
  toolbox: toolbox,
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: false,
  sounds: true,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#888',
    snap: false
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  }
};

const ws = blocklyDiv && Blockly.inject(blocklyDiv, options );

// This function resets the code and output divs, shows the
// generated code from the workspace, and logs the code.
const runCode = () => {
  if (!ws) return;

  const code = pythonGenerator.workspaceToCode(ws);
  console.log("Generated Code:", code); // Debugging line

  if (codeDiv) codeDiv.textContent = code;

  if (outputDiv) outputDiv.innerHTML = '';

  // Note: eval cannot run Python code, so you need a Python interpreter here.
  // For demonstration purposes, we're just logging the code.
  // You need a proper Python execution environment to run the code.
  // eval(code); // This won't work for Python
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}

// Copy to clipboard functionality
if (copyButton) {
  copyButton.addEventListener('click', () => {
    if (codeDiv) {
      const range = document.createRange();
      range.selectNodeContents(codeDiv);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      try {
        document.execCommand('copy');
        alert('Code copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text', err);
      }
    }
  });
}
