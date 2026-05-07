import { useState } from 'react';
import grapesjs from 'grapesjs';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import 'grapesjs/dist/css/grapes.min.css';

const GJS_BLOCKS_BASIC_PLUGIN = 'gjs-blocks-basic';
const hasWindow = typeof window !== 'undefined';
const GJS_BLOCKS_BASIC_REGISTRY_KEY = '_gjsBlocksBasicRegistered';
let grapesLoaderInitialized = false;

const isGrapesReady = () =>
  !!window.grapesjs?.plugins && !!window[GJS_BLOCKS_BASIC_REGISTRY_KEY];

function initializeGrapesLoader() {
  if (!hasWindow) return false;
  if (grapesLoaderInitialized) {
    return isGrapesReady();
  }

  if (!window.grapesjs) {
    window.grapesjs = grapesjs;
  }

  if (window.grapesjs?.plugins && !window[GJS_BLOCKS_BASIC_REGISTRY_KEY]) {
    window.grapesjs.plugins.add(GJS_BLOCKS_BASIC_PLUGIN, grapesjsBlocksBasic);
    window[GJS_BLOCKS_BASIC_REGISTRY_KEY] = true;
  }

  grapesLoaderInitialized = true;
  return isGrapesReady();
}

export default function useGrapesLoader() {
  const [loaded] = useState(() => initializeGrapesLoader());

  return loaded;
}
