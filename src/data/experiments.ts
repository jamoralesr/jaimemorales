export type ExperimentStatus =
  | 'en producción'
  | 'en desarrollo'
  | 'en exploración'
  | 'con clientes';

export interface Experiment {
  name: string;
  status: ExperimentStatus;
  description: string;
  tags: string[];
  url: string | null;
}

export const experiments: Experiment[] = [
  {
    name: 'Scriptorium',
    status: 'en producción',
    description:
      'Un sistema que lee el mundo por mí mientras duermo. Agrega RSS, sintetiza con Claude y me entrega cada mañana un informe con lo que de verdad importa.',
    tags: ['TypeScript', 'Claude API', 'RSS'],
    url: null,
  },
  {
    name: 'WorkspaceLM',
    status: 'en desarrollo',
    description:
      'Búsqueda semántica sobre el corpus de conocimiento de una organización — documentos, emails, chats — con RAG para respuestas trazables.',
    tags: ['Laravel', 'pgvector', 'RAG'],
    url: null,
  },
  {
    name: 'MagicDesk',
    status: 'en exploración',
    description:
      'Un escritorio que entiende en qué estás trabajando y tiene las herramientas correctas cargadas antes de que se las pidas.',
    tags: ['Claude Code', 'MCP'],
    url: null,
  },
  {
    name: 'Mente a Bordo',
    status: 'con clientes',
    description:
      'Una IA que vive adentro de la organización, no afuera. Centrípeta: extrae contexto en vez de dispersarlo.',
    tags: ['Laravel', 'Claude API', 'centripetal AI'],
    url: null,
  },
];
