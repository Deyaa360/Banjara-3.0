/**
 * This script updates all image paths in the codebase to use the getImagePath helper
 * It's designed to be run manually or as part of a build process
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Find all tsx/jsx files
async function findAllComponentFiles(dir, fileList = []) {
  const files = await readdirAsync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await statAsync(filePath);
    
    if (stat.isDirectory()) {
      fileList = await findAllComponentFiles(filePath, fileList);
    } else if (
      file.endsWith('.tsx') || 
      file.endsWith('.jsx') || 
      file.endsWith('.ts') || 
      file.endsWith('.js')
    ) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Process a file to add the import and update image paths
async function processFile(filePath) {
  let content = await readFileAsync(filePath, 'utf8');
  const originalContent = content;
  
  // Check if file uses image paths
  if (!content.includes('src="/') && !content.includes("src='/")) {
    return false; // No changes needed
  }
  
  // Add the import if it doesn't exist
  if (!content.includes('getImagePath')) {
    // Add import only to files that have React imports (components)
    if (content.includes('import React') || content.includes('import { ')) {
      const importLine = "import { getImagePath } from \"@/lib/imagePath\";";
      
      // Find a good place to add the import
      // After the last import statement
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const lineEndIndex = content.indexOf('\n', lastImportIndex);
        if (lineEndIndex !== -1) {
          content = 
            content.substring(0, lineEndIndex + 1) + 
            importLine + '\n' + 
            content.substring(lineEndIndex + 1);
        }
      }
    }
  }
  
  // Replace image paths with getImagePath function
  content = content.replace(/src=["'](\/(.*?)["'])/g, 'src={getImagePath("/$2")}');
  
  // Check if we made any changes
  if (content !== originalContent) {
    await writeFileAsync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main function
async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const files = await findAllComponentFiles(rootDir);
  
  let changedFilesCount = 0;
  
  for (const file of files) {
    const changed = await processFile(file);
    if (changed) {
      console.log(`Updated: ${file}`);
      changedFilesCount++;
    }
  }
  
  console.log(`\nDone! Updated ${changedFilesCount} files.`);
}

main().catch(console.error);