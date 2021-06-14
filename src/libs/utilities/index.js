import toast from 'react-hot-toast';
import colorNamer from 'color-namer';
import tinycolor from 'tinycolor2';

export const addToast = (message, type = 'success') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'loading':
      toast.loading(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export const sanitizeHex = (hex) => {
  const sanitizedHex = hex.replaceAll('##', '#');
  return sanitizedHex;
};

export const isValidColor = (val) => {
  const formated = tinycolor(val);
  return formated.isValid();
};

export const formatColor = (val) => {
  return tinycolor(val);
};

export const hexToRgb = (hex) => {
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    sanitizeHex(hex)
  );

  if (!colorParts) {
    return null;
  }

  const [, r, g, b] = colorParts;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
};

export const rgbToHex = (r, g, b) => {
  const toHex = (c) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getTextColor = (color) => {
  const rgbColor = hexToRgb(color);

  if (!rgbColor) {
    return '#333';
  }

  const { r, g, b } = rgbColor;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 120 ? '#fff' : '#333';
};

export const getColorName = (color) => {
  if (!color) return '';
  const { name } = colorNamer(`#${color}`.replace('##', '#')).ntc[0];
  const sanitizedName = name
    .replace(/['/]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return sanitizedName;
};

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
