import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ARCHIVO DE REALIDAD SUSPENDIDA — SISTEMA OPERATIVO OBSOLETO
// found footage digital recuperado de nodo [REDACTED]
// ═══════════════════════════════════════════════════════════════════════════

interface Proceso {
  id: string;
  nombre: string;
  estado: 'RUNNING' | 'WAITING' | 'SUSPENDED' | 'BLOCKED' | 'TERMINATED';
  pid: number;
  memoria: string;
  tiempo: string;
  usuario: string;
}

interface Archivo {
  nombre: string;
  tamano: string;
  fecha: string;
  estado: 'OK' | 'CORRUPT' | 'ENCRYPTED' | 'LOCKED';
  tipo: 'DOC' | 'LOG' | 'DAT' | 'SYS';
}

const PROCESOS_INICIALES: Proceso[] = [
  { id: 'p1', nombre: 'future_loader.sh', estado: 'RUNNING', pid: 1001, memoria: '2.4MB', tiempo: '847d:12h:34m', usuario: 'system' },
  { id: 'p2', nombre: 'permission_daemon', estado: 'WAITING', pid: 1002, memoria: '1.1MB', tiempo: '912d:03h:21m', usuario: 'admin' },
  { id: 'p3', nombre: 'update_manager', estado: 'SUSPENDED', pid: 1003, memoria: '856KB', tiempo: '1247d:08h:12m', usuario: 'root' },
  { id: 'p4', nombre: 'deadline_sync', estado: 'BLOCKED', pid: 1004, memoria: '2.1MB', tiempo: 'NA', usuario: 'scheduler' },
  { id: 'p5', nombre: 'cache_infinite', estado: 'RUNNING', pid: 1005, memoria: '∞', tiempo: '∞', usuario: 'system' },
  { id: 'p6', nombre: 'queue_processor', estado: 'WAITING', pid: 1006, memoria: '1.8MB', tiempo: '2301h:44m', usuario: 'daemon' },
  { id: 'p7', nombre: 'memory_leak_detector', estado: 'RUNNING', pid: 1007, memoria: 'ERR', tiempo: 'ERR', usuario: 'monitor' },
  { id: 'p8', nombre: 'transition_pending', estado: 'SUSPENDED', pid: 1008, memoria: '0KB', tiempo: 'PENDING', usuario: 'core' },
];

const ARCHIVOS: Archivo[] = [
  { nombre: 'FUTURO_2024.DAT', tamano: '0B', fecha: '2024-01-01', estado: 'LOCKED', tipo: 'DAT' },
  { nombre: 'PROYECTO_FINAL.TXT', tamano: 'ERR', fecha: '2019-12-31', estado: 'CORRUPT', tipo: 'DOC' },
  { nombre: 'PERMISOS_PENDIENTES.LOG', tamano: '447MB', fecha: 'HOY', estado: 'ENCRYPTED', tipo: 'LOG' },
  { nombre: 'CONEXION_REMOTA.SYS', tamano: '--', fecha: 'OFFLINE', estado: 'LOCKED', tipo: 'SYS' },
  { nombre: 'RESPALDO_2023.DAT', tamano: 'NULL', fecha: 'ARCHIVED', estado: 'OK', tipo: 'DAT' },
  { nombre: 'COLA_PROCESOS.DAT', tamano: '892GB', fecha: 'INFINITE', estado: 'LOCKED', tipo: 'DAT' },
  { nombre: 'ACTUALIZACION_V8.EXE', tamano: 'PROMETIDO', fecha: 'NUNCA', estado: 'ENCRYPTED', tipo: 'SYS' },
  { nombre: 'DEADLINE_SYNC.LOG', tamano: 'FULL', fecha: 'OVERDUE', estado: 'CORRUPT', tipo: 'LOG' },
];

const SYSTEM_ERRORS: string[] = [
  '[ERR_01] Future buffer overflow — cannot allocate temporal space',
  '[ERR_02] Permission denied: user "citizen" lacks clearance for operation',
  '[ERR_03] Connection to central node lost. Retry in... undefined',
  '[ERR_04] Update signature invalid. New version: never',
  '[ERR_05] Memory leak detected in sector 7G. Ignoring.',
  '[ERR_06] Deadline passed. System adjusted. No action required.',
  '[ERR_07] Process "hope" terminated unexpectedly. Restart disabled.',
  '[ERR_08] Network isolation active. External routes: none',
];

const BOOT_MESSAGES: string[] = [
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

const TERMINAL_MESSAGES: string[] = [
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
];

function GlitchText({ text, glitchChance = 0.02 }: { text: string; glitchChance?: number }) {
  const [glitched, setGlitched] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < glitchChance) {
        setGlitched(true);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
        const glitchedText = text.split('').map((c) => 
          Math.random() < 0.3 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join('');
        setDisplayText(glitchedText);
        setTimeout(() => {
          setDisplayText(text);
          setGlitched(false);
        }, 80 + Math.random() * 150);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [text, glitchChance]);

  return (
    <span className={`${glitched ? 'text-red-400 animate-pulse' : 'text-[#00FF00]'} font-mono`}>
      {displayText}
    </span>
  );
}

function Scanlines() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 opacity-12"
      style={{
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        animation: 'scanline 8s linear infinite',
      }}
    />
  );
}

function VHSFlicker() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-40 opacity-0"
      style={{
        background: 'rgba(0, 255, 0, 0.02)',
        animation: 'flicker 0.1s infinite',
      }}
    />
  );
}

function LoadingBar({ label }: { label: string }) {
  const [progress, setProgress] = useState(0);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!frozen && progress < 67) {
        setProgress((p) => p + Math.random() * 2);
      } else if (progress >= 67 && progress < 68) {
        setFrozen(true);
        setTimeout(() => setFrozen(false), 3000 + Math.random() * 5000);
      } else if (progress < 100) {
        setProgress((p) => p + 0.1);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [progress, frozen]);

  return (
    <div className="mb-3">
      <div className="text-[10px] text-[#00FF00] font-mono mb-1">
        [{label}] {progress.toFixed(1)}%
      </div>
      <div className="border border-[#00FF00] p-0.5 w-48">
        <div 
          className="h-2 bg-[#00FF00] transition-all duration-75"
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
    <div className="bg-black/80 border border-[#00FF00]/30 p-2 font-mono text-xs h-32 overflow-y-auto scrollbar-hide">
      {lines.map((line, i) => (
        <div key={i} className="text-[#00FF00] opacity-80">
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
  status = 'OK' 
}: { 
  label: string; 
  value: string; 
  status?: 'OK' | 'WARN' | 'ERR' | 'FROZEN' 
}) {
  const color = {
    'OK': 'text-[#00FF00]',
    'WARN': 'text-yellow-400',
    'ERR': 'text-red-500',
    'FROZEN': 'text-blue-300 animate-pulse',
  }[status];

  return (
    <div className="border border-[#00FF00]/40 p-2 bg-black/40">
      <div className="text-[9px] text-[#00AA00] uppercase tracking-wider">{label}</div>
      <div className={`text-lg font-mono ${color}`}>{value}</div>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<'PROCESSES' | 'FILES' | 'ERRORS' | 'TERMINAL'>('PROCESSES');
  const [bootSequence, setBootSequence] = useState(0);
  const [systemTime, setSystemTime] = useState('');
  const [uptime, setUptime] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showGlitch, setShowGlitch] = useState(false);
  const [randomError, setRandomError] = useState<string | null>(null);

  // Boot sequence
  useEffect(() => {
    if (bootSequence < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setBootSequence((b) => b + 1);
      }, bootSequence < 3 ? 300 : 600);

      return () => clearTimeout(timer);
    }
  }, [bootSequence]);

  // System time (always shows wrong/suspended time)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Uptime counter (shows absurdly large number)
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal output
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalLines((prev) => {
        const newLine = TERMINAL_MESSAGES[Math.floor(Math.random() * TERMINAL_MESSAGES.length)];
        return [...prev.slice(-20), newLine];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Random errors
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setRandomError(SYSTEM_ERRORS[Math.floor(Math.random() * SYSTEM_ERRORS.length)]);
        setShowGlitch(true);
        setTimeout(() => {
          setShowGlitch(false);
          setTimeout(() => setRandomError(null), 200);
        }, 150);
      }
    }, 5000);

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
  };

  const estadoIconos: Record<string, string> = {
    'RUNNING': '►',
    'WAITING': '⏸',
    'SUSPENDED': '▐▐',
    'BLOCKED': '■',
    'TERMINATED': '✕',
  };

  if (bootSequence < BOOT_MESSAGES.length) {
    return (
      <div className="min-h-screen bg-black font-mono text-[#00FF00] p-8 text-sm leading-relaxed">
        <Scanlines />
        <VHSFlicker />
        <div className="max-w-2xl mx-auto">
          {BOOT_MESSAGES.slice(0, bootSequence).map((msg, i) => (
            <div key={i} className="opacity-60">{msg}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-[#0a0a0a] text-[#00FF00] font-mono overflow-hidden transition-all duration-100
        ${showGlitch ? 'translate-x-[-2px] skew-x-1' : ''}`}
    >
      <Scanlines />
      <VHSFlicker />
      
      {/* Random error overlay */}
      {randomError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="border-2 border-red-500 p-6 bg-black max-w-lg text-center">
            <div className="text-red-500 text-lg font-bold mb-2">SYSTEM ERROR</div>
            <div className="text-red-400 text-sm font-mono">{randomError}</div>
            <div className="mt-4 text-[#00FF00] text-xs">[PRESS ANY KEY TO CONTINUE]</div>
          </div>
        </div>
      )}

      {/* CRT curvature effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, black 100%)',
        }}
      />

      <div className="min-h-screen p-4 pb-20">
        {/* Header */}
        <header className="border-b border-[#00FF00]/30 pb-3 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-sm font-bold tracking-widest">SISTEMA OPERATIVO v2.4.1</h1>
              <p className="text-[10px] text-[#00AA00] mt-1">
                NODO: [REDACTED] | RED: LOCAL | STATUS: RUNNING
              </p>
            </div>
            <div className="text-right text-xs">
              <div>{systemTime}</div>
              <div className="text-[10px] text-[#00AA00]">
                UPTIME: {formatUptime(uptime)}
              </div>
            </div>
          </div>
        </header>

        {/* Status bar */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <MemoryBlock label="CPU LOAD" value={`${Math.floor(Math.random() * 30 + 20)}%`} />
          <MemoryBlock label="MEMORY" value="847MB / 1GB" status="WARN" />
          <MemoryBlock label="NETWORK" value="DISCONNECTED" status="ERR" />
          <MemoryBlock label="SYNC" value="FROZEN" status="FROZEN" />
        </div>

        {/* Loading bars */}
        <div className="border border-[#00FF00]/30 p-3 mb-4 bg-black/20">
          <div className="text-[10px] text-[#00AA00] mb-2">BACKGROUND TASKS</div>
          <LoadingBar label="CARGANDO ACTUALIZACIÓN" />
          <LoadingBar label="SINCRONIZANDO DATOS" />
          <LoadingBar label="PROCESANDO COLA" />
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-3 border-b border-[#00FF00]/30 pb-1">
          {[
            { id: 'PROCESSES', label: 'PROCESOS' },
            { id: 'FILES', label: 'ARCHIVOS' },
            { id: 'ERRORS', label: 'ERRORES' },
            { id: 'TERMINAL', label: 'TERMINAL' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1 text-xs font-mono transition-colors
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
          {/* PROCESSES TAB */}
          {activeTab === 'PROCESSES' && (
            <div className="p-2">
              <div className="text-[10px] text-[#00AA00] mb-2 flex justify-between">
                <span>8 PROCESOS ACTIVOS</span>
                <span>ORDEN POR: PID</span>
              </div>
              <div className="space-y-1">
                {PROCESOS_INICIALES.map((proc) => (
                  <div 
                    key={proc.id}
                    className="grid grid-cols-12 gap-2 text-xs p-1 hover:bg-[#00FF00]/5 transition-colors cursor-default"
                  >
                    <div className="col-span-1 text-[10px] text-[#00AA00]">{proc.pid}</div>
                    <div className="col-span-5 truncate">
                      <span className="text-[10px] text-[#00AA00] mr-1">{estadoIconos[proc.estado]}</span>
                      <span className={estadoColors[proc.estado]}>{proc.nombre}</span>
                    </div>
                    <div className="col-span-2 text-right">{proc.memoria}</div>
                    <div className="col-span-2 text-right">{proc.tiempo}</div>
                    <div className="col-span-2 text-right truncate text-[10px] text-[#008800]">{proc.usuario}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FILES TAB */}
          {activeTab === 'FILES' && (
            <div className="p-2">
              <div className="text-[10px] text-[#00AA00] mb-2">DIRECTORIO: /VAR/SPOOL/ARCHIVE</div>
              <div className="grid grid-cols-2 gap-2">
                {ARCHIVOS.map((arch, i) => (
                  <div 
                    key={i}
                    className="border border-[#00FF00]/20 p-2 text-xs hover:bg-[#00FF00]/5 transition-colors cursor-default"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-[#00AA00] text-[10px]">{arch.tipo}</span>
                      <span className={
                        arch.estado === 'OK' ? 'text-[#00FF00]' :
                        arch.estado === 'LOCKED' ? 'text-red-400' :
                        arch.estado === 'ENCRYPTED' ? 'text-yellow-400' : 'text-red-500'
                      }>{arch.estado}</span>
                    </div>
                    <div className="truncate mb-1">{arch.nombre}</div>
                    <div className="text-[10px] text-[#006600] flex justify-between">
                      <span>{arch.tamano}</span>
                      <span>{arch.fecha}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERRORS TAB */}
          {activeTab === 'ERRORS' && (
            <div className="p-2">
              <div className="text-[10px] text-[#00AA00] mb-2">REGISTRO DE ERRORES: /VAR/LOG/SYSTEM.ERR</div>
              <div className="space-y-1">
                {SYSTEM_ERRORS.map((err, i) => (
                  <div 
                    key={i}
                    className="text-xs p-1 border-l-2 border-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-default"
                  >
                    <span className="text-red-400">{err}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[10px] text-[#006600] text-center">
                [ MOSTRANDO ÚLTIMOS 8 ERRORES — ERRORES ANTERIORES: PERDIDOS ]
              </div>
            </div>
          )}

          {/* TERMINAL TAB */}
          {activeTab === 'TERMINAL' && (
            <div className="p-2">
              <div className="text-[10px] text-[#00AA00] mb-2 flex justify-between">
                <span>SHELL: /BIN/SH — TIPO: INTERACTIVO</span>
                <span>PID: {Math.floor(Math.random() * 9000 + 1000)}</span>
              </div>
              <Terminal lines={terminalLines} />
            </div>
          )}
        </div>

        {/* Footer message */}
        <div className="mt-4 text-center">
          <GlitchText 
            text="[ SISTEMA OPERATIVO — TODOS LOS DERECHOS RESERVADOS — LICENCIA: PERMANENTE ]" 
            glitchChance={0.005}
          />
          <div className="text-[9px] text-[#006600] mt-1">
            ESTE SISTEMA CONTINÚA FUNCIONANDO. EL FUTURO FUE CANCELADO. NO HAY ACCIÓN REQUERIDA.
          </div>
        </div>
      </div>

      {/* Global styles for scrollbar */}
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
      `}</style>
    </div>
  );
}
