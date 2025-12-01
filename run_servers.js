import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting both servers...\n');

// Start frontend (Vite)
const frontend = spawn('npm', ['run', 'dev'], {
    shell: true,
    stdio: 'inherit',
    cwd: __dirname
});

// Start backend (Email server)
const backend = spawn('npm', ['run', 'dev:server'], {
    shell: true,
    stdio: 'inherit',
    cwd: __dirname
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down servers...');
    frontend.kill();
    backend.kill();
    process.exit();
});

frontend.on('exit', (code) => {
    console.log(`Frontend exited with code ${code}`);
    backend.kill();
    process.exit(code);
});

backend.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`);
    frontend.kill();
    process.exit(code);
});

console.log('✅ Frontend: http://localhost:5173');
console.log('✅ Backend: http://localhost:3001');
console.log('\nPress Ctrl+C to stop both servers\n');
