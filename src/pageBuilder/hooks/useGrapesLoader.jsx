import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import 'grapesjs/dist/css/grapes.min.css';

const GJS_BLOCKS_BASIC_PLUGIN = 'gjs-blocks-basic';
const hasWindow = typeof window !== 'undefined';

if (hasWindow && !window.grapesjs) {
  window.grapesjs = grapesjs;
}

if (hasWindow && !window.__gjsBlocksBasicRegistered) {
  window.grapesjs.plugins.add(GJS_BLOCKS_BASIC_PLUGIN, grapesjsBlocksBasic);
  window.__gjsBlocksBasicRegistered = true;
}

export default function useGrapesLoader() {
  const [loaded, setLoaded] = useState(() => hasWindow && !!window.grapesjs);

  useEffect(() => {
    setLoaded(hasWindow && !!window.grapesjs);
  }, []);

  return loaded;
}
