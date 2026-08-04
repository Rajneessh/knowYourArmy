import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { COMMANDS, ARMY_HQ, DIVISION_TYPES } from './data/commands';
import styles from './ArmyStructureDetails.module.css';

/* ── Stars helper ── */
function Stars({ count, size = 'md' }) {
  if (!count) return null;
  return (
    <span className={`${styles.stars} ${styles[`stars_${size}`]}`} aria-label={`${count} stars`}>
      {'★'.repeat(count)}
    </span>
  );
}

/* ── Division node ── */
function DivisionNode({ div }) {
  const typeInfo = DIVISION_TYPES[div.type] ?? DIVISION_TYPES.infantry;
  return (
    <div
      className={styles.divisionNode}
      style={{ '--div-color': typeInfo.color }}
      title={`${div.name} — ${div.location}`}
    >
      <div className={styles.divStars}>
        <Stars count={1} size="sm" />
      </div>
      <div className={styles.divBody}>
        <span className={styles.divName}>{div.shortName}</span>
        <span className={styles.divLocation}>{div.location}</span>
        <span className={styles.divType}>{typeInfo.label}</span>
      </div>
    </div>
  );
}

/* ── Corps node ── */
function CorpsNode({ corps }) {
  const isOperational = corps.number !== null;

  return (
    <div className={styles.corpsBlock}>
      {/* Corps header */}
      <div
        className={`${styles.corpsNode} ${!isOperational ? styles.corpsNode_nonOp : ''}`}
      >
        {isOperational && <Stars count={corps.stars} size="sm" />}
        <div className={styles.corpsMain}>
          <span className={styles.corpsId}>{corps.romanNumber ?? '—'}</span>
          <span className={styles.corpsName}>{corps.name}</span>
          {corps.nickname && (
            <span className={styles.corpsNickname}>{corps.nickname}</span>
          )}
        </div>
        <div className={styles.corpsLocation}>{corps.location}</div>
      </div>

      {/* Divisions */}
      {corps.divisions.length > 0 && (
        <div className={styles.divisionsGroup}>
          <div className={styles.divisionsLabel}>
            <span>Divisions</span>
          </div>
          <div className={styles.divisionsList}>
            {corps.divisions.map((div) => (
              <DivisionNode key={`${div.number}-${div.location}`} div={div} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Command column ── */
function CommandColumn({ command }) {
  return (
    <div
      className={styles.commandColumn}
      style={{
        '--cmd-accent': command.accentColor,
        '--cmd-shield': command.shieldColor,
      }}
    >
      {/* Command header */}
      <div className={styles.commandNode}>
        <div className={styles.commandNodeTop}>
          <Stars count={command.stars} size="md" />
          <span className={styles.commandAbbr}>{command.abbreviation}</span>
        </div>
        <div className={styles.commandNodeBody}>
          <span className={styles.commandNodeName}>{command.name}</span>
          <span className={styles.commandNodeLoc}>{command.location}</span>
          <span className={styles.commandNodeState}>{command.state}</span>
        </div>
        <div className={styles.commandTagline}>{command.tagline}</div>
      </div>

      {/* Vertical trunk line */}
      <div className={styles.trunkLine} />

      {/* Corps */}
      <div className={styles.corpsList}>
        {command.corps.map((corps) => (
          <CorpsNode key={corps.id} corps={corps} />
        ))}
      </div>
    </div>
  );
}

/* ── Main details page ── */
export function ArmyStructureDetails() {
  useDocumentTitle('Indian Army — Order of Battle');
  const navigate = useNavigate();

  const goBack = useCallback(() => navigate('/army/structure'), [navigate]);

  return (
    <div className={`${styles.page} texture-topo`}>

      {/* ── Fixed top bar ── */}
      <div className={styles.topBar}>
        <button
          id="back-to-structure"
          className={styles.backBtn}
          onClick={goBack}
          type="button"
        >
          ← Command Overview
        </button>
        <div className={styles.topBarTitle}>
          <span className={styles.topBarLabel}>Indian Army</span>
          <span className={styles.topBarSub}>Order of Battle</span>
        </div>
        <div className={styles.topBarHint}>← scroll horizontally →</div>
      </div>

      {/* ── Chart area ── */}
      <div className={styles.chartOuter}>
        <div className={styles.chartInner}>

          {/* COAS root node */}
          <div className={styles.coasWrap}>
            <div className={styles.coasNode}>
              <Stars count={ARMY_HQ.stars} size="lg" />
              <div className={styles.coasTitle}>{ARMY_HQ.name}</div>
              <div className={styles.coasChief}>{ARMY_HQ.chiefTitle}</div>
              <div className={styles.coasLoc}>{ARMY_HQ.location}</div>
            </div>

            {/* Special units branching from COAS */}
            <div className={styles.specialUnitsRow}>
              {ARMY_HQ.specialUnits.map((u) => (
                <div key={u.name} className={styles.specialUnit}>
                  <div className={styles.specialBranch} />
                  <div className={styles.specialNode}>
                    <span className={styles.specialName}>{u.shortName}</span>
                    <span className={styles.specialLoc}>{u.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal line spanning all commands */}
          <div className={styles.commandsBridge}>
            <div className={styles.bridgeLine} />
            <div className={styles.bridgeLabel}>7 FIELD COMMANDS</div>
          </div>

          {/* 7 command columns */}
          <div className={styles.commandsRow}>
            {COMMANDS.map((cmd) => (
              <CommandColumn key={cmd.id} command={cmd} />
            ))}
          </div>

        </div>
      </div>

      {/* ── Legend ── */}
      <div className={styles.legend}>
        <span className={styles.legendTitle}>Unit Types</span>
        {Object.entries(DIVISION_TYPES).map(([key, val]) => (
          <span key={key} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: val.color }} />
            {val.label}
          </span>
        ))}
      </div>

    </div>
  );
}
