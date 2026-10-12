import fs from 'fs';

let store = fs.readFileSync('src/lib/store.ts', 'utf8');

const oldRef = `export interface Ref {
  ordinal: number;
  label: string;
  pmid: string | null;
  doi: string | null;
  design: string;
  sampleSize: number | null;
  journal: string;
  year: number;
  abstract: string;
}`;

const newRef = `export interface Ref {
  ordinal: number;
  label: string;
  authors?: string;
  pmid: string | null;
  doi: string | null;
  design?: string;
  sampleSize?: string | number | null;
  journal?: string;
  year?: number;
  abstract?: string;
}`;

// Normalize line breaks before replacing
store = store.replace(/\r\n/g, '\n');
const normalizedOldRef = oldRef.replace(/\r\n/g, '\n');
const normalizedNewRef = newRef.replace(/\r\n/g, '\n');

if (store.includes(normalizedOldRef)) {
  store = store.replace(normalizedOldRef, normalizedNewRef);
  fs.writeFileSync('src/lib/store.ts', store, 'utf8');
  console.log('Successfully updated Ref interface in store.ts!');
} else {
  console.error('Could not find old Ref interface!');
}
