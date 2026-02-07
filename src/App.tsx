// App.tsx
import { useState, useEffect, useRef } from 'react';

// Interfaces
interface Proceso {
  id: string;
  nombre: string;
  estado: 'RUNNING' | 'WAITING' | 'SUSPENDED' | 'BLOCKED' | 'TERMINATED' | 'FROZEN';
  pid: number;
  memoria: string;
  tiempo: string;
  usuario: string;
}

interface Archivo {
  nombre: string;
  tamano: string;
  fecha: string;
  estado: 'OK' | 'CORRUPT' | 'ENCRYPTED' | 'LOCKED' | 'MISSING';
  tipo: 'DOC' | 'LOG' | 'DAT' | 'SYS' | 'EXE';
}

interface ErrorSistema {
  codigo: string;
  mensaje: string;
  gravedad: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

// DATOS
const PROCESOS: Proceso[] = [
  { id: 'p1', nombre: 'future_loader.sh', estado: 'RUNNING', pid: 1001, memoria: '2.4MB', tiempo: '847d:12h:34m', usuario: 'system' },
  { id: 'p2', nombre: 'permission_daemon', estado: 'WAITING', pid: 1002, memoria: '1.1MB', tiempo: '912d:03h:21m', usuario: 'admin' },
  { id: 'p3', nombre: 'update_manager', estado: 'SUSPENDED', pid: 1003, memoria: '856KB', tiempo: '1247d:08h:12m', usuario: 'root' },
  { id: 'p4', nombre: 'deadline_sync', estado: 'BLOCKED', pid: 1004, memoria: '2.1MB', tiempo: 'NA', usuario: 'scheduler' },
  { id: 'p5', nombre: 'queue_processor', estado: 'WAITING', pid: 1006, memoria: '1.8MB', tiempo: '2301h:44m', usuario: 'daemon' },
  { id: 'p6', nombre: 'memory_leak_detector', estado: 'RUNNING', pid: 1007, memoria: 'ERR', tiempo: 'ERR', usuario: 'monitor' },
  { id: 'p7', nombre: 'transition_pending', estado: 'FROZEN', pid: 1008, memoria: '0KB', tiempo: 'PENDING', usuario: 'core' },
  { id: 'p8', nombre: 'permit_queue', estado: 'RUNNING', pid: 1009, memoria: '47MB', tiempo: '1567d:02h:11m', usuario: 'permits' },
  { id: 'p9', nombre: 'infrastructure_sync', estado: 'SUSPENDED', pid: 1010, memoria: 'NULL', tiempo: 'SUSPENDED', usuario: 'infrastructure' },
  { id: 'p10', nombre: 'future_buffer', estado: 'TERMINATED', pid: 1011, memoria: 'RELEASED', tiempo: 'NA', usuario: 'temporal' },
];

const ARCHIVOS: Archivo[] = [
  { nombre: 'FUTURO_2024.DAT', tamano: '0B', fecha: '2024-01-01', estado: 'LOCKED', tipo: 'DAT' },
  { nombre: 'PROYECTO_FINAL.TXT', tamano: 'ERR', fecha: '2019-12-31', estado: 'CORRUPT', tipo: 'DOC' },
  { nombre: 'PERMISOS_PENDIENTES.LOG', tamano: '447MB', fecha: 'HOY', estado: 'ENCRYPTED', tipo: 'LOG' },
  { nombre: 'CONEXION_REMOTA.SYS', tamano: '--', fecha: 'OFFLINE', estado: 'MISSING', tipo: 'SYS' },
  { nombre: 'RESPALDO_2023.DAT', tamano: 'NULL', fecha: 'ARCHIVED', estado: 'OK', tipo: 'DAT' },
  { nombre: 'COLA_PROCESOS.DAT', tamano: '892GB', fecha: 'INFINITE', estado: 'LOCKED', tipo: 'DAT' },
  { nombre: 'ACTUALIZACION_V8.EXE', tamano: 'PROMETIDO', fecha: 'NUNCA', estado: 'ENCRYPTED', tipo: 'EXE' },
  { nombre: 'DEADLINE_SYNC.LOG', tamano: 'FULL', fecha: 'OVERDUE', estado: 'CORRUPT', tipo: 'LOG' },
  { nombre: 'MANTENIMIENTO_PROG.SYS', tamano: 'SCHEDULED', fecha: '2025-∞', estado: 'LOCKED', tipo: 'SYS' },
  { nombre: 'CONTRATO_VIGENTE.DAT', tamano: 'EXPIRED', fecha: '2018-12-31', estado: 'LOCKED', tipo: 'DAT' },
  { nombre: 'RESOLUCION_PENDIENTE.TXT', tamano: 'WAITING', fecha: 'INDEFINIDO', estado: 'LOCKED', tipo: 'DOC' },
  { nombre: 'INFRAESTRUCTURA_2025.DAT', tamano: 'DISPONIBLE', fecha: 'NUNCA', estado: 'MISSING', tipo: 'DAT' },
];

const ERRORES: ErrorSistema[] = [
  { codigo: 'ERR_001', mensaje: 'Future buffer overflow — cannot allocate temporal space', gravedad: 'CRITICAL' },
  { codigo: 'ERR_002', mensaje: 'Permission denied: user "citizen" lacks clearance for future operations', gravedad: 'MEDIUM' },
  { codigo: 'ERR_003', mensaje: 'Connection to central node lost. Retry in... undefined', gravedad: 'HIGH' },
  { codigo: 'ERR_004', mensaje: 'Update signature invalid. New version: never', gravedad: 'MEDIUM' },
  { codigo: 'ERR_005', mensaje: 'Memory leak detected in sector 7G. Ignoring.', gravedad: 'LOW' },
  { codigo: 'ERR_006', mensaje: 'Deadline passed. System adjusted. No action required.', gravedad: 'MEDIUM' },
  { codigo: 'ERR_007', mensaje: 'Process "hope" terminated unexpectedly. Restart disabled.', gravedad: 'HIGH' },
  { codigo: 'ERR_008', mensaje: 'Network isolation active. External routes: none', gravedad: 'CRITICAL' },
  { codigo: 'ERR_009', mensaje: 'Infrastructure state: suspended indefinitely', gravedad: 'HIGH' },
  { codigo: 'ERR_010', mensaje: 'User authorization expired. Re-authentication: disabled', gravedad: 'MEDIUM' },
  { codigo: 'ERR_011', mensaje: 'Pending permits queue full. New permits: rejected', gravedad: 'HIGH' },
  { codigo: 'ERR_012', mensaje: 'System clock synchronization failed. Time: undetermined', gravedad: 'MEDIUM' },
];

const MENSAJES_BOOT: string[] = [
  'BIOS DATE 01/15/98 14:22:51 VER: 1.02',
  'CPU: NEC V60 16MHz',
  '640K RAM SYSTEM ... OK',
  'EXTENDED RAM ... 15360K OK',
  'INITIALIZING VIDEO ... OK',
  'LOADING KERNEL ...',
  'MOUNTING VOLUMES ...',
  'CHECKING FILE SYSTEM ...',
  'RECOVERING CORRUPTED SECTORS ...',
  'SYSTEM READY.',
];

const MENSAJES_TERMINAL: string[] = [
  'Scanning for updates...',
  'Checking network connectivity...',
  'Syncing with central server...',
  'Verifying user permissions...',
  'Loading configuration files...',
  'Initializing background processes...',
  'Cleaning up temporary files...',
  'Compacting database...',
  'Applying security patches...',
  'Optimizing memory usage...',
  'Validating digital certificates...',
  'Exporting system logs...',
  'Processing pending requests...',
  'Compiling future updates...',
  'Awaiting administrator response...',
  'Paused for maintenance...',
  'Retrying connection...',
  'Caching temporal data...',
  'Archiving completed tasks...',
  'Finalizing transaction...',
  'Verifying license status...',
  'Checking permit queue...',
  'Synchronizing timestamps...',
  'Loading user profile...',
];

// UTILIDADES
function glitchText(text: string, intensity = 0.02): string {
  if (Math.random() > intensity) return text;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
  return text.split('').map(c => (Math.random() < 0.3 && c !== ' ' ? chars[Math.floor(Math.random() * chars.length)] : c)).join('');
}

function getRandomError(): string {
  return ERRORES[Math.floor(Math.random() * ERRORES.length)].mensaje;
}

// COMPONENTES DE EFECTO
function Scanlines({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return <div className="pointer-events-none fixed inset-0 z-50 opacity-10 md:opacity-12" style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)', animation: 'scanline 8s linear infinite' }} />;
}

function VHSFlicker({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return <div className="pointer-events-none fixed inset-0 z-40 opacity-0" style={{ background: 'rgba(0, 255, 0, 0.02)', animation: 'flicker 0.15s infinite' }} />;
}

function CRTCurvature() {
  return <div className="fixed inset-0 pointer-events-none z-50 opacity-5" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, black 100%)' }} />;
}

function LoadingBar({ label }: { label: string }) {
  const [progress, setProgress] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [stuckCount, setStuckCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!frozen && progress < 67) setProgress(p => Math.min(p + Math.random() * 3, 67));
      else if (progress >= 67 && progress < 68) {
        setFrozen(true);
        setStuckCount(c => c + 1);
        setTimeout(() => setFrozen(false), 2000 + Math.random() * 4000 * (1 + stuckCount * 0.5));
      } else if (progress < 100) setProgress(p => Math.min(p + 0.05, 100));
    }, 150);
    return () => clearInterval(interval);
  }, [progress, frozen, stuckCount]);

  return (
    <div className="mb-2 md:mb-3">
      <div className="text-[9px] md:text-[10px] text-[#00FF00] font-mono mb-1 flex justify-between">
        <span>{label}</span>
        <span>{progress.toFixed(1)}%</span>
      </div>
      <div className="border border-[#00FF00]/40 p-0.5 w-full max-w-xs">
        <div className={`h-1.5 md:h-2 bg-[#00FF00] transition-all duration-100 ${frozen ? 'animate-pulse' : ''}`} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
}

function Terminal({ lines }: { lines: string[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);
  return (
    <div className="bg-black/80 border border-[#00FF00]/30 p-2 font-mono text-[10px] md:text-xs h-28 md:h-36 overflow-y-auto scrollbar-hide">
      {lines.map((line, i) => <div key={i} className="text-[#00FF00] opacity-80 leading-relaxed"><span className="text-[#00AA00]">&gt;</span> {line}</div>)}
      <div ref={bottomRef} />
    </div>
  );
}

function MemoryBlock({ label, value, status = 'OK', className = '' }: { label: string; value: string; status?: 'OK' | 'WARN' | 'ERR' | 'FROZEN' | 'OFFLINE'; className?: string }) {
  const colorMap = { 'OK': 'text-[#00FF00]', 'WARN': 'text-yellow-400', 'ERR': 'text-red-500', 'FROZEN': 'text-blue-300 animate-pulse', 'OFFLINE': 'text-gray-500' };
  const color = colorMap[status] || 'text-[#00FF00]';
  return (
    <div className={`border border-[#00FF00]/40 p-1.5 md:p-2 bg-black/40 ${className}`}>
      <div className="text-[8px] md:text-[9px] text-[#00AA00] uppercase tracking-wider">{label}</div>
      <div className={`text-sm md:text-base font-mono ${color}`}>{value}</div>
    </div>
  );
}

function GlitchOverlay({ active, message }: { active: boolean; message?: string }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="border-2 border-red-500 p-4 md:p-6 bg-black max-w-md w-full text-center">
        <div className="text-red-500 text-sm md:text-base font-bold mb-2 tracking-widest">SYSTEM ERROR</div>
        <div className="text-red-400 text-xs md:text-sm font-mono">{message || getRandomError()}</div>
        <div className="mt-4 text-[#00FF00] text-[10px] md:text-xs">[PRESS ANY KEY TO CONTINUE]</div>
      </div>
    </div>
  );
}

function BlockedAccess({ reason }: { reason: string }) {
  const [countdown, setCountdown] = useState(999);
  useEffect(() => { const timer = setInterval(() => setCountdown(c => c + 1), 1000); return () => clearInterval(timer); }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center p-6 max-w-sm">
        <div className="text-red-500 text-4xl md:text-6xl mb-4">⚠</div>
        <h2 className="text-red-400 text-sm md:text-base font-bold mb-2">ACCESO BLOQUEADO</h2>
        <p className="text-[#00AA00] text-xs md:text-sm font-mono mb-4">{reason}</p>
        <div className="text-[10px] text-[#006600] font-mono">REINTENTO AUTOMÁTICO EN: {countdown}d:{Math.floor(countdown/24)}h:{countdown%60}m</div>
        <div className="mt-6 text-[9px] text-[#004400]">[ESTE SISTEMA CONTINÚA FUNCIONANDO]<br/>[EL FUTURO FUE CANCELADO]</div>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
export function App() {
  const [activeTab, setActiveTab] = useState<'PROCESSES' | 'FILES' | 'ERRORS' | 'TERMINAL'>('PROCESSES');
  const [bootSequence, setBootSequence] = useState(0);
  const [systemTime, setSystemTime] = useState('');
  const [uptime, setUptime] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchMessage, setGlitchMessage] = useState<string | null>(null);
  const [isGithubPages, setIsGithubPages] = useState(false);
  const [blockedReason, setBlockedReason] = useState('');
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => { const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight }); updateViewport(); window.addEventListener('resize', updateViewport); return () => window.removeEventListener('resize', updateViewport); }, []);
  useEffect(() => { const h = window.location.hostname; const gh = ['github.io','github.com']; const isLocal = h==='localhost'||h==='127.0.0.1'; setIsGithubPages(gh.some(p=>h.includes(p))||isLocal); if (!gh.some(p=>h.includes(p))&&!isLocal) setBlockedReason('Este sistema solo está autorizado para ejecutarse en GitHub Pages.'); }, []);
  useEffect(() => { if (bootSequence < MENSAJES_BOOT.length) { const t=setTimeout(()=>setBootSequence(b=>b+1), bootSequence<3?300:500); return ()=>clearTimeout(t); } }, [bootSequence]);
  useEffect(() => { const t=setInterval(()=>setSystemTime(new Date().toLocaleTimeString('en-US',{hour12:false})),1000); return ()=>clearInterval(t); }, []);
  useEffect(() => { const t=setInterval(()=>setUptime(u=>u+1),1000); return ()=>clearInterval(t); }, []);
  useEffect(() => { const i=setInterval(()=>setTerminalLines(prev=>[...prev.slice(-30),MENSAJES_TERMINAL[Math.floor(Math.random()*MENSAJES_TERMINAL.length)]]),2500); return ()=>clearInterval(i); }, []);
  useEffect(() => {
    const i = setInterval(() => {
      if (Math.random() < 0.005) { // pequeña probabilidad de error glitch
        setGlitchMessage(getRandomError());
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 3500 + Math.random() * 1500);
      }
    }, 1000);
    return () => clearInterval(i);
  }, []);

  if (blockedReason) return <BlockedAccess reason={blockedReason} />;

  return (
    <div className="relative w-full h-screen bg-black text-[#00FF00] font-mono overflow-hidden">
      {/* Efectos visuales */}
      <Scanlines />
      <VHSFlicker />
      <CRTCurvature />
      <GlitchOverlay active={showGlitch} message={glitchMessage || undefined} />

      {/* Header */}
      <header className="p-2 md:p-4 flex justify-between items-center border-b border-[#00FF00]/30">
        <div className="text-[10px] md:text-sm">SYSTEM TIME: {systemTime}</div>
        <div className="text-[10px] md:text-sm">UPTIME: {Math.floor(uptime / 3600)}h:{Math.floor((uptime % 3600)/60)}m:{uptime % 60}s</div>
      </header>

      {/* Boot sequence */}
      {bootSequence < MENSAJES_BOOT.length ? (
        <div className="p-4 font-mono text-[10px] md:text-sm space-y-1">
          {MENSAJES_BOOT.slice(0, bootSequence).map((msg, i) => (
            <div key={i} className="text-[#00FF00]">{glitchText(msg, 0.02)}</div>
          ))}
        </div>
      ) : (
        <main className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Tabs */}
          <div className="col-span-1 md:col-span-2 flex space-x-2 md:space-x-4 mb-2">
            {['PROCESSES','FILES','ERRORS','TERMINAL'].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab as any)}
                className={`px-2 py-1 md:px-3 md:py-2 border border-[#00FF00]/50 text-[10px] md:text-sm ${activeTab===tab?'bg-[#00FF00]/10':'hover:bg-[#00FF00]/5'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Contenido */}
          {activeTab==='PROCESSES' && (
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 overflow-auto max-h-[60vh]">
              {PROCESOS.map(p => (
                <MemoryBlock
                  key={p.id}
                  label={`${p.nombre} [${p.pid}]`}
                  value={`${p.estado} • ${p.memoria} • ${p.tiempo} • ${p.usuario}`}
                  status={p.estado==='RUNNING'?'OK':p.estado==='WAITING'?'WARN':p.estado==='FROZEN'?'FROZEN':'ERR'}
                />
              ))}
            </div>
          )}

          {activeTab==='FILES' && (
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 overflow-auto max-h-[60vh]">
              {ARCHIVOS.map((f,i) => (
                <MemoryBlock
                  key={i}
                  label={`${f.nombre} (${f.tipo})`}
                  value={`${f.estado} • ${f.tamano} • ${f.fecha}`}
                  status={f.estado==='OK'?'OK':f.estado==='CORRUPT'?'ERR':f.estado==='LOCKED'?'FROZEN':'WARN'}
                />
              ))}
            </div>
          )}

          {activeTab==='ERRORS' && (
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 overflow-auto max-h-[60vh]">
              {ERRORES.map((e,i) => (
                <MemoryBlock
                  key={i}
                  label={e.codigo}
                  value={`${e.gravedad} • ${e.mensaje}`}
                  status={e.gravedad==='CRITICAL'?'ERR':e.gravedad==='HIGH'?'WARN':'OK'}
                />
              ))}
            </div>
          )}

          {activeTab==='TERMINAL' && (
            <Terminal lines={terminalLines} />
          )}

          {/* Loading bars estilo retro */}
          <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
            <LoadingBar label="LOADING FUTURE MODULES..." />
            <LoadingBar label="SYNCING PERMITS..." />
            <LoadingBar label="UPDATING INFRASTRUCTURE..." />
          </div>
        </main>
      )}
    </div>
  );
}