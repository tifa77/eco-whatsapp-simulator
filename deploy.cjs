/**
 * deploy.cjs — سكريبت البناء والنشر السريع
 * 
 * الاستخدام:
 *   node deploy.cjs
 * 
 * سيقوم بـ:
 *   1. بناء المشروع (npm run build)
 *   2. إنشاء ملف deploy.zip جاهز للرفع على Hostinger
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// ── 1. Build ─────────────────────────────────────────
console.log('🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// ── 2. Check if archiver is available ────────────────
let archiverAvailable = true;
try { require.resolve('archiver'); } catch { archiverAvailable = false; }

if (!archiverAvailable) {
  console.log('\n✅ Build complete! Files are in the dist/ folder.');
  console.log('📦 To create a ZIP, run: npm install archiver --save-dev');
  console.log('   Then run this script again.\n');
  console.log('📂 Upload these files manually from dist/ to Hostinger public_html:');
  console.log('   - index.html');
  console.log('   - Logo.png');
  console.log('   - vite.svg');
  console.log('   - assets/ (folder)');
  console.log('   - brand/ (folder)');
  console.log('   - .htaccess (create manually)\n');
  process.exit(0);
}

// ── 3. Create ZIP ─────────────────────────────────────
const output = fs.createWriteStream(path.join(__dirname, 'deploy.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const size = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`\n✅ deploy.zip created (${size} MB)`);
  console.log('📤 Upload deploy.zip to Hostinger and extract it in public_html/');
});

archive.on('error', (err) => { throw err; });
archive.pipe(output);

// أضف محتويات dist مع .htaccess
archive.directory('dist/', false);
archive.append(
  'Options -MultiViews\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^ index.html [QSA,L]\n',
  { name: '.htaccess' }
);

archive.finalize();
console.log('📦 Creating deploy.zip...');
