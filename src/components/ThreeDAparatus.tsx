import React from 'react';
import { Atom, CircuitBoard, Eye, FlaskConical } from 'lucide-react';
import type { Experiment } from '../types';

interface ThreeDAparatusProps {
  experiment: Experiment;
}

const apparatusBySubject = {
  Physics: {
    icon: CircuitBoard,
    label: 'Photonics & circuits',
    accent: 'cyan',
    object: 'orb'
  },
  Chemistry: {
    icon: FlaskConical,
    label: 'Molecular workspace',
    accent: 'emerald',
    object: 'flask'
  },
  Biology: {
    icon: Eye,
    label: 'Cellular imaging',
    accent: 'violet',
    object: 'lens'
  },
  'Computer Science': {
    icon: Atom,
    label: 'Algorithm engine',
    accent: 'rose',
    object: 'core'
  }
} as const;

export const ThreeDAparatus: React.FC<ThreeDAparatusProps> = ({ experiment }) => {
  const config = apparatusBySubject[experiment.subject as keyof typeof apparatusBySubject] ?? apparatusBySubject.Physics;
  const Icon = config.icon;

  return (
    <div className={`apparatus-3d apparatus-${config.accent}`} aria-label={`${config.label} 3D preview`}>
      <div className="apparatus-3d-grid" />
      <div className={`apparatus-object apparatus-object-${config.object}`}>
        <div className="apparatus-rim" />
        <div className="apparatus-liquid" />
        <div className="apparatus-highlight" />
      </div>
      <div className="apparatus-orbit apparatus-orbit-one" />
      <div className="apparatus-orbit apparatus-orbit-two" />
      <div className="apparatus-label">
        <span className="apparatus-icon"><Icon size={14} /></span>
        <span>
          <strong>LIVE APPARATUS</strong>
          <small>{config.label}</small>
        </span>
      </div>
      <div className="apparatus-status"><i /> calibrated / ready</div>
    </div>
  );
};
