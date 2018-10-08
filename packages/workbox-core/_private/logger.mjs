/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import LOG_LEVELS from '../models/LogLevels.mjs';
import '../_version.mjs';

// Safari doesn't print all console.groupCollapsed() arguments.
// Related bug: https://bugs.webkit.org/show_bug.cgi?id=182754
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const GREY = `#7f8c8d`;
const GREEN = `#2ecc71`;
const YELLOW = `#f39c12`;
const RED = `#c0392b`;
const BLUE = `#3498db`;

const getDefaultLogLevel = () => (process.env.NODE_ENV === 'production') ?
  LOG_LEVELS.warn : LOG_LEVELS.log;

let logLevel = getDefaultLogLevel();
const shouldPrint = (minLevel) => (logLevel <= minLevel);
const setLoggerLevel = (newLogLevel) => logLevel = newLogLevel;
const getLoggerLevel = () => logLevel;

// We always want groups to be logged unless logLevel is silent.
const groupLevel = LOG_LEVELS.error;

const _print = function(keyName, logArgs, levelColor) {
  const logLevel = keyName.indexOf('group') === 0 ?
    groupLevel : LOG_LEVELS[keyName];
  if (!shouldPrint(logLevel)) {
    return;
  }

  if (!levelColor || (keyName === 'groupCollapsed' && isSafari)) {
    console[keyName](...logArgs);
    return;
  }

  const logPrefix = [
    '%cworkbox',
    `background: ${levelColor}; color: white; padding: 2px 0.5em; ` +
      `border-radius: 0.5em;`,
  ];
  console[keyName](...logPrefix, ...logArgs);
};

const groupEnd = () => {
  if (shouldPrint(groupLevel)) {
    console.groupEnd();
  }
};

const defaultExport = {
  groupEnd,
  unprefixed: {
    groupEnd,
  },
};

const setupLogs = (keyName, color) => {
  defaultExport[keyName] =
    (...args) => _print(keyName, args, color);
  defaultExport.unprefixed[keyName] =
    (...args) => _print(keyName, args);
};

const levelToColor = {
  debug: GREY,
  log: GREEN,
  warn: YELLOW,
  error: RED,
  groupCollapsed: BLUE,
};
Object.keys(levelToColor).forEach(
    (keyName) => setupLogs(keyName, levelToColor[keyName])
);

export {getDefaultLogLevel};
export {setLoggerLevel};
export {getLoggerLevel};
export {defaultExport as logger};
