#!/usr/bin/env node

const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'DevBot TUI'
});

const mainBox = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: {
    type: 'line'
  },
  style: {
    fg: '#ebdbb2',
    bg: '#282828',
    border: {
      fg: '#504945'
    }
  }
});

const titleBar = blessed.box({
  parent: mainBox,
  top: 0,
  left: 0,
  width: '100%',
  height: 1,
  content: ' DevBot TUI - Terminal User Interface',
  style: {
    fg: '#282828',
    bg: '#d79921'
  },
  align: 'center'
});

const menuList = blessed.list({
  parent: mainBox,
  label: ' Menu ',
  top: 1,
  left: 0,
  width: '30%',
  height: '70%',
  border: {
    type: 'line'
  },
  style: {
    fg: '#ebdbb2',
    bg: '#282828',
    border: {
      fg: '#504945'
    },
    selected: {
      bg: '#458588',
      fg: '#ebdbb2'
    }
  },
  keys: true,
  mouse: true,
  items: [
    'Dashboard',
    'File Manager',
    'Process Monitor',
    'System Info',
    'Settings',
    'Exit'
  ]
});

const contentBox = blessed.box({
  parent: mainBox,
  label: ' Content ',
  top: 1,
  left: '30%',
  width: '70%',
  height: '70%',
  border: {
    type: 'line'
  },
  style: {
    fg: '#ebdbb2',
    bg: '#282828',
    border: {
      fg: '#504945'
    }
  },
  content: 'Welcome to DevBot TUI!\n\nUse arrow keys to navigate the menu.\nPress Enter to select an item.\nPress q or Escape to quit.',
  scrollable: true,
  alwaysScroll: true
});

const statusBar = blessed.box({
  parent: mainBox,
  bottom: 0,
  left: 0,
  width: '100%',
  height: 3,
  content: ' Status: Ready | Press q to quit | Use ↑↓ to navigate',
  style: {
    fg: '#282828',
    bg: '#ebdbb2'
  }
});

menuList.on('select', function(item) {
  const selected = item.getText();
  
  switch(selected) {
    case 'Dashboard':
      contentBox.setContent('Dashboard\n\nSystem Overview:\n- CPU Usage: 45%\n- Memory: 8.2GB / 16GB\n- Disk: 256GB / 512GB\n- Network: Active\n- Uptime: 2 days, 14 hours');
      break;
    case 'File Manager':
      contentBox.setContent('File Manager\n\nCurrent Directory: ' + process.cwd() + '\n\nFiles:\n- package.json\n- index.js\n- node_modules/\n- dist/\n\n[Navigate with arrow keys]');
      break;
    case 'Process Monitor':
      contentBox.setContent('Process Monitor\n\nRunning Processes:\n\nPID    NAME                CPU%   MEM%\n1234   node                12.5   3.2\n5678   chrome              25.1   15.8\n9012   terminal            2.3    1.1\n3456   system              5.0    8.5');
      break;
    case 'System Info':
      contentBox.setContent('System Information\n\nOS: ' + process.platform + '\nNode.js: ' + process.version + '\nArchitecture: ' + process.arch + '\nMemory Usage: ' + Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB\nUptime: ' + Math.round(process.uptime()) + ' seconds');
      break;
    case 'Settings':
      contentBox.setContent('Settings\n\nApplication Settings:\n- Theme: Dark\n- Refresh Rate: 1s\n- Auto-save: Enabled\n- Debug Mode: Disabled\n\n[Use Enter to modify settings]');
      break;
    case 'Exit':
      process.exit(0);
      break;
  }
  
  screen.render();
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

menuList.focus();

screen.append(mainBox);
screen.render();

// Start the application
process.on('uncaughtException', (err) => {
  screen.destroy();
  console.error('An error occurred:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  screen.destroy();
  process.exit(0);
});