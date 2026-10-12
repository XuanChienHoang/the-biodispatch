import fs from 'fs';

let store = fs.readFileSync('src/lib/store.ts', 'utf8');
store = store.replace(/],\r?\n,\r?\n\s*"ampk-nrf2-mtor-map-en"/, '],\n  "ampk-nrf2-mtor-map-en"');
fs.writeFileSync('src/lib/store.ts', store, 'utf8');
console.log('Fixed extra comma successfully!');
