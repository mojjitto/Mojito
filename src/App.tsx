import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ARCHIVO DE REALIDAD SUSPENDIDA — SISTEMA OPERATIVO OBSOLETO
// found footage digital recuperado de nodo [REDACTED]
// Este archivo solo debe ejecutarse en GitHub Pages
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// DATOS DEL SISTEMA — SÍNTOMAS DE REALIDAD SUSPENDIDA
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// UTIDADES DE GLITCH Y EFECTOS
// ═══════════════════════════════════════════════════════════════════════════

function glitchText(text: string, intensity: number = 0.02): string {
  if (Math.random() > intensity) return text;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
  return text.split('').map(c => 
    Math.random() < 0.3 && c !== ' ' ? chars[Math.floor(Math.random() * chars.length)] : c
  ).join('');
}

function getRandomError(): string {
  return ERRORES[Math.floor(Math.random() * ERRORES.length)].mensaje;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTES DE EFECTO
// ═══════════════════════════════════════════════════════════════════════════

function Scanlines({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 opacity-10 md:opacity-12"
      style={{
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        animation: 'scanline 8s linear infinite',
      }}
    />
  );
}

function VHSFlicker({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-40 opacity-0"
      style={{
        background: 'rgba(0, 255, 0, 0.02)',
        animation: 'flicker 0.15s infinite',
      }}
    />
  );
}

function CRTCurvature() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-5"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, black 100%)',
      }}
    />
  );
}

function LoadingBar({ label }: { label: string }) {
  const [progress, setProgress] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [stuckCount, setStuckCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!frozen && progress < 67) {
        setProgress(p => Math.min(p + Math.random() * 3, 67));
      } else if (progress >= 67 && progress < 68) {
        setFrozen(true);
        setStuckCount(c => c + 1);
        const delay = 2000 + Math.random() * 4000 * (1 + stuckCount * 0.5);
        setTimeout(() => setFrozen(false), delay);
      } else if (progress < 100) {
        setProgress(p => Math.min(p + 0.05, 100));
      }
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
        <div 
          className={`h-1.5 md:h-2 bg-[#00FF00] transition-all duration-100 ${frozen ? 'animate-pulse' : ''}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

function Terminal({ lines }: { lines: string[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="bg-black/80 border border-[#00FF00]/30 p-2 font-mono text-[10px] md:text-xs h-28 md:h-36 overflow-y-auto scrollbar-hide">
      {lines.map((line, i) => (
        <div key={i} className="text-[#00FF00] opacity-80 leading-relaxed">
          <span className="text-[#00AA00]">&gt;</span> {line}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MemoryBlock({ 
  label, 
  value, 
  status = 'OK',
  className = ''
}: { 
  label: string; 
  value: string; 
  status?: 'OK' | 'WARN' | 'ERR' | 'FROZEN' | 'OFFLINE';
  className?: string;
}) {
  const colorMap = {
    'OK': 'text-[#00FF00]',
    'WARN': 'text-yellow-400',
    'ERR': 'text-red-500',
    'FROZEN': 'text-blue-300 animate-pulse',
    'OFFLINE': 'text-gray-500',
  };
  
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center p-6 max-w-sm">
        <div className="text-red-500 text-4xl md:text-6xl mb-4">⚠</div>
        <h2 className="text-red-400 text-sm md:text-base font-bold mb-2">ACCESO BLOQUEADO</h2>
        <p className="text-[#00AA00] text-xs md:text-sm font-mono mb-4">{reason}</p>
        <div className="text-[10px] text-[#006600] font-mono">
          REINTENTO AUTOMÁTICO EN: {countdown}d:{Math.floor(countdown/24)}h:{countdown%60}m
        </div>
        <div className="mt-6 text-[9px] text-[#004400]">
          [ESTE SISTEMA CONTINÚA FUNCIONANDO]<br/>
          [EL FUTURO FUE CANCELADO]
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

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

  // Detectar viewport
  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Detectar GitHub Pages
  useEffect(() => {
    const hostname = window.location.hostname;
    
    const githubPatterns = ['github.io', 'github.com'];
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isGithubPagesHost = githubPatterns.some(pattern => hostname.includes(pattern));
    
    if (isGithubPagesHost || isLocalhost) {
      setIsGithubPages(true);
    } else {
      setBlockedReason('Este sistema solo está autorizado para ejecutarse en GitHub Pages. Ha sido redirigido desde un entorno no compatible.');
    }
  }, []);

  // Boot sequence
  useEffect(() => {
    if (bootSequence < MENSAJES_BOOT.length) {
      const timer = setTimeout(() => {
        setBootSequence(b => b + 1);
      }, bootSequence < 3 ? 300 : 500);
      return () => clearTimeout(timer);
    }
  }, [bootSequence]);

  // System time (muestra tiempo suspendido)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Uptime counter (número absurdamente grande)
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(u => u + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal output
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalLines(prev => {
        const newLine = MENSAJES_TERMINAL[Math.floor(Math.random() * MENSAJES_TERMINAL.length)];
        return [...prev.slice(-30), newLine];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Random errors
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.015) {
        setGlitchMessage(getRandomError());
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 120);
        setTimeout(() => setGlitchMessage(null), 300);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const estadoColors: Record<string, string> = {
    'RUNNING': 'text-[#00FF00]',
    'WAITING': 'text-yellow-400',
    'SUSPENDED': 'text-blue-300',
    'BLOCKED': 'text-red-500',
    'TERMINATED': 'text-gray-500 line-through',
    'FROZEN': 'text-cyan-300 animate-pulse',
  };

  const estadoIcons: Record<string, string> = {
    'RUNNING': '►',
    'WAITING': '⏸',
    'SUSPENDED': '▐▐',
    'BLOCKED': '■',
    'TERMINATED': '✕',
    'FROZEN': '❄',
  };

  const gravedadColors: Record<string, string> = {
    'LOW': 'border-l-yellow-500',
    'MEDIUM': 'border-l-orange-500',
    'HIGH': 'border-l-red-500',
    'CRITICAL': 'border-l-red-700 animate-pulse',
  };

  const isMobile = viewport.width < 640;

  // Pantalla de acceso bloqueado
  if (!isGithubPages) {
    return <BlockedAccess reason={blockedReason} />;
  }

  // Pantalla de boot
  if (bootSequence < MENSAJES_BOOT.length) {
    return (
      <div className="min-h-screen bg-black font-mono text-[#00FF00] p-4 md:p-8 text-xs md:text-sm leading-relaxed">
        <Scanlines enabled={!isMobile} />
        <VHSFlicker enabled={!isMobile} />
        <CRTCurvature />
        <div className="max-w-xl mx-auto">
          {MENSAJES_BOOT.slice(0, bootSequence).map((msg, i) => (
            <div key={i} className="opacity-60 truncate">{msg}</div>
          ))}
          <div className="animate-pulse mt-2">_</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#00FF00] font-mono overflow-hidden transition-all duration-75
      ${showGlitch ? 'translate-x-[-1px] md:translate-x-[-2px] skew-x-0.5' : ''}`}>
      
      <Scanlines enabled={!isMobile} />
      <VHSFlicker enabled={!isMobile} />
      <CRTCurvature />
      <GlitchOverlay active={showGlitch} message={glitchMessage || undefined} />

      <div className="min-h-screen p-3 md:p-4 pb-20 max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-b border-[#00FF00]/30 pb-2 md:pb-3 mb-3 md:mb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h1 className="text-xs md:text-sm font-bold tracking-widest">SISTEMA OPERATIVO v2.4.1</h1>
              <p className="text-[9px] md:text-[10px] text-[#00AA00] mt-1">
                NODO: [REDACTED] | RED: LOCAL | STATUS: RUNNING
              </p>
            </div>
            <div className={`text-right text-xs md:text-sm ${isMobile ? 'mt-1' : ''}`}>
              <div>{systemTime}</div>
              <div className="text-[9px] md:text-[10px] text-[#00AA00]">
                UPTIME: {formatUptime(uptime)}
              </div>
            </div>
          </div>
        </header>

        {/* Status bar */}
        <div className={`grid gap-2 mb-3 md:mb-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <MemoryBlock label="CPU LOAD" value={`${Math.floor(Math.random() * 30 + 20)}%`} />
          <MemoryBlock label="MEMORY" value="847MB / 1GB" status="WARN" />
          <MemoryBlock label="NETWORK" value="DISCONNECTED" status="OFFLINE" />
          <MemoryBlock label="SYNC" value="FROZEN" status="FROZEN" />
        </div>

        {/* Loading bars */}
        <div className="border border-[#00FF00]/30 p-2 md:p-3 mb-3 md:mb-4 bg-black/20">
          <div className="text-[9px] md:text-[10px] text-[#00AA00] mb-2">BACKGROUND TASKS</div>
          <LoadingBar label="CARGANDO ACTUALIZACIÓN" />
          {!isMobile && <LoadingBar label="SINCRONIZANDO DATOS" />}
          {!isMobile && <LoadingBar label="PROCESANDO COLA" />}
        </div>

        {/* Navigation Tabs */}
        <div className={`flex gap-0.5 md:gap-1 mb-2 md:mb-3 border-b border-[#00FF00]/30 pb-1 overflow-x-auto scrollbar-hide`}>
          {[
            { id: 'PROCESSES', label: 'PROCESOS' },
            { id: 'FILES', label: 'ARCHIVOS' },
            { id: 'ERRORS', label: 'ERRORES' },
            { id: 'TERMINAL', label: 'TERMINAL' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-2 md:px-3 py-1.5 md:py-1 text-[10px] md:text-xs font-mono transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-[#00FF00] text-black' 
                  : 'text-[#00AA00] hover:text-[#00FF00]'}`}
            >
              [{tab.label}]
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="bg-black/40 border border-[#00FF00]/30">
          {/* PROCESOS TAB */}
          {activeTab === 'PROCESSES' && (
            <div className="p-2">
              <div className="text-[9px] md:text-[10px] text-[#00AA00] mb-2 flex justify-between">
                <span>{PROCESOS.length} PROCESOS ACTIVOS</span>
                <span className="hidden md:inline">ORDEN POR: PID</span>
              </div>
              <div className={`space-y-0.5 md:space-y-1 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                {PROCESOS.map((proc) => (
                  <div 
                    key={proc.id}
                    className={`grid gap-1 p-1 hover:bg-[#00FF00]/5 transition-colors cursor-default
                      ${isMobile ? 'grid-cols-12' : 'grid-cols-14'}`}
                  >
                    <div className={`${isMobile ? 'col-span-1' : 'col-span-1'} text-[9px] text-[#00AA00]`}>
                      {proc.pid}
                    </div>
                    <div className={`${isMobile ? 'col-span-5' : 'col-span-5'} truncate`}>
                      <span className="text-[9px] text-[#00AA00] mr-0.5">{estadoIcons[proc.estado]}</span>
                      <span className={estadoColors[proc.estado]}>{glitchText(proc.nombre, 0.005)}</span>
                    </div>
                    <div className={`${isMobile ? 'col-span-2' : 'col-span-2'} text-right`}>{proc.memoria}</div>
                    <div className={`${isMobile ? 'col-span-2' : 'col-span-2'} text-right truncate`}>{proc.tiempo}</div>
                    {!isMobile && (
                      <div className="col-span-4 text-right truncate text-[9px] text-[#008800]">{proc.usuario}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARCHIVOS TAB */}
          {activeTab === 'FILES' && (
            <div className="p-2">
              <div className="text-[9px] md:text-[10px] text-[#00AA00] mb-2">DIRECTORIO: /VAR/SPOOL/ARCHIVE</div>
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
                {ARCHIVOS.map((arch, i) => (
                  <div 
                    key={i}
                    className="border border-[#00FF00]/20 p-2 text-xs hover:bg-[#00FF00]/5 transition-colors cursor-default"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-[#00AA00] text-[9px]">{arch.tipo}</span>
                      <span className={
                        arch.estado === 'OK' ? 'text-[#00FF00]' :
                        arch.estado === 'LOCKED' ? 'text-red-400' :
                        arch.estado === 'ENCRYPTED' ? 'text-yellow-400' :
                        arch.estado === 'MISSING' ? 'text-gray-500' : 'text-red-500'
                      }>{arch.estado}</span>
                    </div>
                    <div className="truncate mb-1">{glitchText(arch.nombre, 0.003)}</div>
                    <div className="text-[9px] text-[#006600] flex justify-between">
                      <span>{arch.tamano}</span>
                      <span>{arch.fecha}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERRORES TAB */}
          {activeTab === 'ERRORS' && (
            <div className="p-2">
              <div className="text-[9px] md:text-[10px] text-[#00AA00] mb-2">REGISTRO DE ERRORES: /VAR/LOG/SYSTEM.ERR</div>
              <div className="space-y-1">
                {ERRORES.map((err, i) => (
                  <div 
                    key={i}
                    className={`text-[10px] md:text-xs p-1.5 border-l-2 ${gravedadColors[err.gravedad]} bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-default`}
                  >
                    <span className="text-red-400 font-mono text-[9px] md:text-[10px] block mb-0.5">
                      [{err.codigo}]
                    </span>
                    <span className="text-[#00FF00]">{err.mensaje}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[8px] md:text-[9px] text-[#006600] text-center">
                [ MOSTRANDO ÚLTIMOS {ERRORES.length} ERRORES — ERRORES ANTERIORES: PERDIDOS ]
              </div>
            </div>
          )}

          {/* TERMINAL TAB */}
          {activeTab === 'TERMINAL' && (
            <div className="p-2">
              <div className="text-[9px] md:text-[10px] text-[#00AA00] mb-2 flex justify-between">
                <span>SHELL: /BIN/SH — TIPO: INTERACTIVO</span>
                <span>PID: {Math.floor(Math.random() * 9000 + 1000)}</span>
              </div>
              <Terminal lines={terminalLines} />
            </div>
          )}
        </div>

        {/* Footer message */}
        <div className="mt-4 text-center px-2">
          <div className="text-[9px] md:text-[10px] text-[#00FF00] tracking-wider">
            {glitchText('[ SISTEMA OPERATIVO — TODOS LOS DERECHOS RESERVADOS — LICENCIA: PERMANENTE ]', 0.003)}
          </div>
          <div className="text-[8px] md:text-[9px] text-[#006600] mt-1 leading-relaxed">
            ESTE SISTEMA CONTINÚA FUNCIONANDO. EL FUTURO FUE CANCELADO.<br className="md:hidden" />
            <span className="hidden md:inline"> </span>
            NO HAY ACCIÓN REQUERIDA.
          </div>
        </div>
      </div>

      {/* Estilos globales */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.05; }
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @media (max-width: 640px) {
          body {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
