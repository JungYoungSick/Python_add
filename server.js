const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const port = 3000;
const pythonScriptPath = path.join(__dirname, 'public', 'A_calculator.py');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = './public/A_calculator.html';
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  } else if (req.method === 'POST' && req.url === '/calculate') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);
      const expression = data.expression;

      const pythonProcess = spawn('python3', [pythonScriptPath, expression]);

      pythonProcess.stdout.on('data', (data) => {
        const result = data.toString().trim();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`A_calculator.py error: ${data}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      });

      pythonProcess.on('close', (code) => {
        console.log(`A_calculator.py process exited with code ${code}`);
      });
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);

  // A_calculator.py 파일이 존재하는지 확인
  fs.access(pythonScriptPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`A_calculator.py not found at ${pythonScriptPath}`);
      return;
    }

    // A_calculator.py 실행
    const pythonProcess = spawn('python3', [pythonScriptPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`A_calculator.py output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`A_calculator.py error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`A_calculator.py process exited with code ${code}`);
    });
  });
});
