export type FieldType = 'text' | 'checkbox' | 'dropdown' | 'signature';
export type RoomEffect = 'none' | 'unlockGate' | 'damageMonster' | 'heal' | 'stamBoost';
export type SubmissionStatus = 'completed' | 'failed' | 'expired' | 'invalid';
export type GameOutcome = 'pending' | 'win' | 'loss';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface FormCardData {
  id: string;
  title: string;
  subtitle?: string;
  fields: FormField[];
  timerMs: number;
  stampCost: number;
  monsterId?: string;
  roomEffect: RoomEffect;
}

export interface FormCardRuntime {
  cardId: string;
  startedAt: number;
  deadline: number;
  values: Record<string, string | boolean>;
  submitted: boolean;
  expired: boolean;
}

export interface MonsterData {
  id: string;
  name: string;
  x: number;
  y: number;
  health: number;
  attackIntervalMs: number;
  damage: number;
  formCardId?: string;
  blocksRoom: boolean;
}

export interface RedTapeGateData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  requiredStamps: number;
  targetRoomId?: string;
}

export interface RoomData {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  monsterIds: string[];
  formCardIds: string[];
  gates: RedTapeGateData[];
  triggerAuditor: boolean;
}

export interface LogEntry {
  id: string;
  cardId: string;
  status: SubmissionStatus;
  timestamp: number;
  timeTakenMs?: number;
  stampCost: number;
  penalty: number;
  notes?: string;
}

export interface AuditResult {
  passed: boolean;
  totalPenalty: number