import fs from 'node:fs';
import path from 'node:path';

const documentationDirectory = path.resolve('./docs/api');

function renameREADMEtoIndex(filePath) {
  const newPath = path.join(path.dirname(filePath), 'index.md');
  fs.renameSync(filePath, newPath);
}

function fixMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newContent = lines.slice(6);
  const newLines = [];

  // Flags to track sections
  let skipCurrentLine = false;

  for (let line of newContent) {
    // Determine if the current line should be skipped
    if (line.startsWith('## Index') || line.startsWith('### Functions')) {
      skipCurrentLine = true; // Skip this specific line
    } else if (line.startsWith('## Modules')) {
      // Replace ## Modules with # Modules
      line = line.replace('## Modules', '# Modules');
      skipCurrentLine = false; // Don't skip, we processed this line
    } else {
      skipCurrentLine = false; // Reset skip flag for other lines
    }

    // Apply general replacements for other lines
    if (!skipCurrentLine) {
      line = line
        .replaceAll(/README.md/g, '')
        .replaceAll(/<([A-Za-z]+)>/g, '&lt;$1&gt;');
      newLines.push(line);
    }
  }

  // Join the processed lines and write them back to the file
  const fixedContent = newLines.join('\n');
  fs.writeFileSync(filePath, fixedContent, 'utf8');
}

function traverseDocuments(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDocuments(fullPath);
    } else if (file.endsWith('.md')) {
      console.log(`Processing file: ${file}`);
      fixMarkdown(fullPath);
      if (file === 'README.md') {
        console.log(`Renaming file: ${file} to index.md`);
        renameREADMEtoIndex(fullPath);
      }
    }
  }
}

// Run the script
traverseDocuments(documentationDirectory);
