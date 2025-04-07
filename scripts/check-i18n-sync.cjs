const fs = require('fs');
const path = require('path');

const localesDir = path.resolve(__dirname, '../src/locales');
const languages = fs.readdirSync(localesDir);
const namespaces = fs
  .readdirSync(path.join(localesDir, languages[0]))
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace('.json', ''));

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, val]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    return typeof val === 'object' && val !== null
      ? flattenKeys(val, newKey)
      : [newKey];
  });
}

function compareKeys(baseKeys, targetKeys) {
  const missing = baseKeys.filter((k) => !targetKeys.includes(k));
  const extra = targetKeys.filter((k) => !baseKeys.includes(k));
  return { missing, extra };
}

function checkSync() {
  console.log('🔍 Checking i18n key sync...');
  const baseLang = languages[0];

  for (const ns of namespaces) {
    const basePath = path.join(localesDir, baseLang, `${ns}.json`);
    const baseJson = JSON.parse(fs.readFileSync(basePath, 'utf-8'));
    const baseKeys = flattenKeys(baseJson);

    for (const lang of languages.slice(1)) {
      const targetPath = path.join(localesDir, lang, `${ns}.json`);
      if (!fs.existsSync(targetPath)) {
        console.warn(`⚠️  Missing namespace '${ns}' in ${lang}`);
        continue;
      }

      const targetJson = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
      const targetKeys = flattenKeys(targetJson);

      const { missing, extra } = compareKeys(baseKeys, targetKeys);

      if (missing.length || extra.length) {
        console.log(`\n🌐 Namespace: ${ns} | Comparing '${baseLang}' → '${lang}'`);
        if (missing.length) console.log(`❌ Missing keys in ${lang}:`, missing);
        if (extra.length) console.log(`🗑️  Extra keys in ${lang}:`, extra);
      }
    }
  }

  console.log('\n✅ Check complete.');
}

checkSync();
