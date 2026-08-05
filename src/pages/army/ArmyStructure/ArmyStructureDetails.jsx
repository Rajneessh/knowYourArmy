import { useCallback, useState } from 'react';
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
        <Stars count={div.stars ?? 2} size="sm" />
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
  const isOperational = corps.corpsId !== null && corps.romanNumber !== null;

  return (
    <div className={styles.corpsBlock}>
      {/* Corps header */}
      <div
        className={`${styles.corpsNode} ${!isOperational ? styles.corpsNode_nonOp : ''}`}
      >
        <div className={styles.corpsStarsWrap}>
          {corps.stars ? (
            <Stars count={corps.stars} size="sm" />
          ) : (
            <span className={styles.nonOpDash}>—</span>
          )}
        </div>
        <div className={styles.corpsMain}>
          {corps.romanNumber && (
            <span className={styles.corpsId}>{corps.romanNumber}</span>
          )}
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
function CommandColumn({ command, onSelectSubTree }) {
  return (
    <div
      className={styles.commandColumn}
      style={{
        '--cmd-accent': command.accentColor,
        '--cmd-shield': command.shieldColor,
      }}
    >
      {/* Command header — Clicking anywhere on the card header opens its sub-tree */}
      <div
        className={`${styles.commandNode} ${styles.clickableCommandNode}`}
        onClick={() => onSelectSubTree(command.id)}
        title={`Click to view ${command.name} horizontal sub-tree`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectSubTree(command.id)}
      >
        <div className={styles.commandNodeTop}>
          <Stars count={command.stars} size="md" />
          {command.emblem ? (
            <div className={styles.commandEmblemWrap}>
              <img src={command.emblem} alt={`${command.name} emblem`} className={styles.commandEmblemImg} />
            </div>
          ) : (
            <span className={styles.commandAbbr}>{command.abbreviation}</span>
          )}
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

/* ── Horizontal Sub-Tree View for Selected Command ── */
function CommandSubTreeHorizontalView({ command }) {
  return (
    <div className={styles.subTreeHorizontalWrapper}>
      {/* COAS Root Node */}
      <div className={styles.coasWrap}>
        <div className={styles.coasNode}>
          <Stars count={ARMY_HQ.stars} size="lg" />
          {ARMY_HQ.emblem && (
            <div className={styles.coasEmblemWrap}>
              <img src={ARMY_HQ.emblem} alt="Army Headquarters Emblem" className={styles.coasEmblemImg} />
            </div>
          )}
          <div className={styles.coasTitle}>{ARMY_HQ.name}</div>
          <div className={styles.coasChief}>{ARMY_HQ.chiefTitle}</div>
          <div className={styles.coasLoc}>{ARMY_HQ.location}</div>
        </div>
      </div>

      <div className={styles.subTreeConnectorLine} />

      {/* Selected Command Card Header */}
      <div
        className={styles.subTreeSelectedNode}
        style={{
          '--cmd-accent': command.accentColor,
          '--cmd-shield': command.shieldColor,
        }}
      >
        <Stars count={command.stars} size="md" />
        {command.emblem && (
          <div className={styles.subTreeSelectedEmblemWrap}>
            <img src={command.emblem} alt={`${command.name} emblem`} className={styles.subTreeSelectedEmblemImg} />
          </div>
        )}
        <h2 className={styles.subTreeSelectedTitle}>{command.name}</h2>
        <div className={styles.subTreeSelectedLoc}>{command.location}, {command.state}</div>
        <div className={styles.subTreeSelectedTagline}>{command.tagline}</div>
      </div>

      <div className={styles.subTreeConnectorLine} />

      {/* Horizontal Bridge Line for Corps Formations */}
      <div className={styles.subTreeBridge}>
        <div className={styles.subTreeBridgeLine} />
        <div className={styles.subTreeBridgeLabel}>
          {command.corps.length} CORPS FORMATIONS
        </div>
      </div>

      {/* Requirement 2: Corps Cards in Horizontal Tree Format side-by-side */}
      <div className={styles.subTreeCorpsRow}>
        {command.corps.map((corps) => (
          <div key={corps.id} className={styles.subTreeCorpsColumn}>
            <div className={styles.subTreeStemLine} />
            <CorpsNode corps={corps} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main details page ── */
export function ArmyStructureDetails() {
  useDocumentTitle('Indian Army — Order of Battle');
  const navigate = useNavigate();
  const [selectedCommandId, setSelectedCommandId] = useState(null);

  const goBack = useCallback(() => navigate('/army/structure'), [navigate]);
  const handleSelectSubTree = useCallback((id) => setSelectedCommandId(id), []);
  const handleResetSubTree = useCallback(() => setSelectedCommandId(null), []);

  const selectedCommand = COMMANDS.find((c) => c.id === selectedCommandId);

  return (
    <div className={`${styles.page} texture-topo`}>

      {/* ── Fixed top bar ── */}
      <div className={styles.topBar}>
        {/* Requirement 1: Back button on the left side */}
        <div className={styles.topBarLeft}>
          {selectedCommand ? (
            <button
              className={styles.backBtn}
              onClick={handleResetSubTree}
              type="button"
            >
              ← Back to Full Structure
            </button>
          ) : (
            <button
              id="back-to-structure"
              className={styles.backBtn}
              onClick={goBack}
              type="button"
            >
              ← Command Overview
            </button>
          )}
        </div>

        {/* Logo emblem link to main landing page */}
        <div className={styles.topBarTitle}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={styles.topBarLogoBtn}
            title="Go to Home Landing Page"
          >
            <span className={styles.topBarLabel}>Indian Army</span>
          </button>
          <span className={styles.topBarSub}>
            {selectedCommand ? `${selectedCommand.name} Sub-Tree` : 'Operational Structure'}
          </span>
        </div>

        <div className={styles.topBarHint}>
          {selectedCommand ? 'Viewing Horizontal Sub-Tree' : '← Scroll to View All Commands →'}
        </div>
      </div>

      {/* ── Chart area ── */}
      <div className={styles.chartOuter}>
        <div className={styles.chartInner}>

          {/* Render Horizontal Sub-Tree if a Command card is clicked */}
          {selectedCommand ? (
            <CommandSubTreeHorizontalView command={selectedCommand} />
          ) : (
            /* Full 7-Command Order of Battle Tree */
            <>
              {/* COAS root node */}
              <div className={styles.coasWrap}>
                <div
                  className={styles.coasNode}
                  onClick={() => navigate('/')}
                  title="Click to go to Home Landing Page"
                  style={{ cursor: 'pointer' }}
                >
                  <Stars count={ARMY_HQ.stars} size="lg" />
                  {ARMY_HQ.emblem && (
                    <div className={styles.coasEmblemWrap}>
                      <img src={ARMY_HQ.emblem} alt="Army Headquarters Emblem" className={styles.coasEmblemImg} />
                    </div>
                  )}
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
                  <CommandColumn
                    key={cmd.id}
                    command={cmd}
                    onSelectSubTree={handleSelectSubTree}
                  />
                ))}
              </div>
            </>
          )}

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



