import { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { COMMANDS, ARMY_HQ } from './data/commands';
import fallbackChainData from './data/chainOfCommand.json';
import armyEmblem from '../../../assets/emblems/army.png';
import styles from './ArmyStructure.module.css';

/* ---- Sub-components ---- */

/** Card badge for each command with emblem image */
function CommandShield({ command }) {
  const ref = useRef(null);

  const handleClick = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.classList.add('animate__animated', 'animate__pulse');
    }
    document.getElementById('structure-details')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <button
      ref={ref}
      className={styles.commandShield}
      style={{ '--cmd-color': command.accentColor, '--cmd-shield': command.shieldColor }}
      onClick={handleClick}
      aria-label={`${command.name} — ${command.location}`}
    >
      <div className={styles.emblemContainer}>
        <div className={styles.emblemImageWrap}>
          <img
            src={command.emblem || armyEmblem}
            alt={`${command.name} emblem`}
            className={styles.shieldEmblemImg}
            onError={(e) => {
              e.currentTarget.src = armyEmblem;
            }}
          />
        </div>
      </div>
      <div className={styles.commandLabel}>
        <span className={styles.commandName}>{command.name}</span>
        <span className={styles.commandLoc}>{command.location}</span>
      </div>
    </button>
  );
}

/** Render star rating icons */
function StarsBadge({ stars }) {
  if (!stars) return null;
  if (typeof stars === 'string') {
    return <div className={styles.treeStars}>{stars}</div>;
  }
  return <div className={styles.treeStars}>{'★'.repeat(stars)}</div>;
}

/** Tree Card Node Component */
function TreeNodeCard({ node, extraClass = '' }) {
  if (!node) return null;
  return (
    <div className={`${styles.treeCard} ${extraClass}`}>
      <div className={styles.treeCardHeader}>
        <h3 className={styles.treeTitle}>{node.title}</h3>
      </div>
      {node.commander && (
        <div className={styles.treeCommander}>{node.commander}</div>
      )}
      {node.rank && (
        <div className={styles.treeRank}>RANK — {node.rank}</div>
      )}
      <StarsBadge stars={node.stars} />
      {node.comprises && (
        <div className={styles.treeComprises}>{node.comprises}</div>
      )}
    </div>
  );
}

/** Interactive & Responsive Tree Diagram matching Image 1 & Picture 2 styling */
function ChainOfCommandTree({ data }) {
  if (!data) return null;

  const opCommandsNode = data.children?.[0]; // OPERATIONAL COMMANDS (6)
  const armyTrainingNode = data.children?.[1]; // ARMY TRAINING (1)

  const corpsNode = opCommandsNode?.children?.[0]; // CORPS
  const staticFormationsNode = opCommandsNode?.children?.[1]; // STATIC FORMATIONS AREA
  const subAreaNode = staticFormationsNode?.children?.[0]; // SUB AREA

  const trainingEstNode = armyTrainingNode?.children?.[0]; // TRAINING ESTABLISHMENTS
  const catANode = trainingEstNode?.children?.[0]; // CATEGORY A
  const catBNode = catANode?.children?.[0]; // CATEGORY B

  // Linear chain under CORPS
  const corpsChain = [];
  let curr = corpsNode?.children?.[0];
  while (curr) {
    corpsChain.push(curr);
    curr = curr.children?.[0];
  }

  return (
    <div className={styles.treeWrapper}>
      {/* Level 0: ARMY HEADQUARTERS */}
      <div className={styles.treeNodeLevel0}>
        <TreeNodeCard node={data} extraClass={styles.rootCard} />
        <div className={styles.connectorDown} />
      </div>

      {/* Main Branch Splitter: Operational Commands vs Army Training */}
      <div className={styles.mainSplitter}>
        <div className={styles.horizontalLine} />
        <div className={styles.splitConnectors}>
          <div className={styles.splitStemLeft} />
          <div className={styles.splitStemRight} />
        </div>
      </div>

      {/* Level 1: 2 Main Columns */}
      <div className={styles.treeColumns}>

        {/* Left Main Branch: OPERATIONAL COMMANDS (6) */}
        <div className={styles.opCommandsBranch}>
          <TreeNodeCard node={opCommandsNode} extraClass={styles.opCard} />
          <div className={styles.connectorDown} />

          {/* Sub Splitter under Operational Commands: CORPS vs STATIC FORMATIONS */}
          <div className={styles.subSplitter}>
            <div className={styles.subHorizontalLine} />
            <div className={styles.subSplitConnectors}>
              <div className={styles.splitStemLeft} />
              <div className={styles.splitStemRight} />
            </div>
          </div>

          <div className={styles.subColumns}>
            {/* Sub Column 1: CORPS & Downward Chain */}
            <div className={styles.corpsSubBranch}>
              <TreeNodeCard node={corpsNode} extraClass={styles.corpsCard} />

              {/* Vertical chain under CORPS */}
              {corpsChain.map((node, i) => (
                <div key={node.id || i} className={styles.chainNodeWrapper}>
                  <div className={styles.connectorDown} />
                  <TreeNodeCard node={node} extraClass={styles[`chainCard_${node.id}`]} />
                </div>
              ))}
            </div>

            {/* Sub Column 2: STATIC FORMATIONS AREA & SUB AREA */}
            <div className={styles.staticSubBranch}>
              <TreeNodeCard node={staticFormationsNode} extraClass={styles.staticCard} />
              {subAreaNode && (
                <>
                  <div className={styles.connectorDown} />
                  <TreeNodeCard node={subAreaNode} extraClass={styles.subAreaCard} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Main Branch: ARMY TRAINING (1) */}
        <div className={styles.trainingBranch}>
          <TreeNodeCard node={armyTrainingNode} extraClass={styles.trainingCard} />

          {trainingEstNode && (
            <>
              <div className={styles.connectorDown} />
              <TreeNodeCard node={trainingEstNode} extraClass={styles.estCard} />
            </>
          )}

          {catANode && (
            <>
              <div className={styles.connectorDown} />
              <TreeNodeCard node={catANode} extraClass={styles.catACard} />
            </>
          )}

          {catBNode && (
            <>
              <div className={styles.connectorDown} />
              <TreeNodeCard node={catBNode} extraClass={styles.catBCard} />
            </>
          )}
        </div>

      </div>

      {/* Source Credit */}
      {data.sourceCredit && (
        <div className={styles.sourceCredit}>
          {data.sourceCredit}
        </div>
      )}
    </div>
  );
}

/* ---- Main page ---- */

export function ArmyStructure() {
  useDocumentTitle('Indian Army — Command Structure');
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState(fallbackChainData);
  const [loading, setLoading] = useState(true);

  // Requirement 4: Fetch JSON data dynamically
  useEffect(() => {
    fetch('/data/chainOfCommand.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch from public/data');
        return res.json();
      })
      .then((data) => {
        setTreeData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Using fallback local JSON import for chain of command:', err);
        setTreeData(fallbackChainData);
        setLoading(false);
      });
  }, []);

  const goToDetails = useCallback(() => {
    navigate('/army/structure/details');
  }, [navigate]);

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>

        {/* ── Centered Header with Back Button ── */}
        <PageHeader
          eyebrow="Indian Army"
          title="Command Structure"
          motto="सेवा परमो धर्मः — Service Before Self"
          backTo="/army"
          backText="Back to Army"
        />

        {/* ── Visually Separated Commands Panel with Tree Structure (Army HQ → 7 Commands) ── */}
        <section className={styles.commandsPanel}>
          {/* ── Banner ── */}
          <div className={`${styles.sectionBanner} animate__animated animate__fadeIn`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className={styles.bannerTextWrapCentered}>
              <span className={styles.bannerTitleCentered}>7 Commands</span>
              <span className={styles.bannerSubtextCentered}>6 Operational Commands 1 Training Command</span>
            </div>
          </div>

          {/* ── Top Tree Node: ARMY HEADQUARTERS ── */}
          <div className={styles.commandsTreeHead}>
            <div className={styles.hqCardNode}>
              <div className={styles.hqEmblemWrap}>
                <img
                  src={ARMY_HQ.emblem || armyEmblem}
                  alt="Army Headquarters emblem"
                  className={styles.hqEmblemImg}
                  onError={(e) => {
                    e.currentTarget.src = armyEmblem;
                  }}
                />
              </div>
              <h3 className={styles.hqTitle}>ARMY HEADQUARTERS</h3>
              <span className={styles.hqChief}>Chief of the Army Staff (COAS)</span>
              <span className={styles.hqLoc}>New Delhi</span>
            </div>

            {/* Connectors from Army HQ down to the 7 Commands */}
            <div className={styles.hqStemDown} />
            <div className={styles.hqBridgeLine} />
            <div className={styles.hqStemsGrid}>
              {COMMANDS.map((cmd) => (
                <div key={`stem-${cmd.id}`} className={styles.hqSubStemLine} />
              ))}
            </div>
          </div>

          {/* ── 7 Commands grid with image placeholders ── */}
          <div className={styles.commandsGrid}>
            {COMMANDS.map((cmd, i) => (
              <div
                key={cmd.id}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: 'both' }}
              >
                <CommandShield command={cmd} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Visual Section Separator ── */}
        <div className={styles.sectionSeparator}>
          <span className={styles.separatorLine} />
          <span className={styles.separatorBadge}>ECHELON HIERARCHY</span>
          <span className={styles.separatorLine} />
        </div>

        {/* ── Chain of command tree structure section ── */}
        <section id="structure-details" className={styles.chainSection}>
          <h2 className={styles.chainTitle}>Chain of Command</h2>
          <p className={styles.chainSubtitle}>
            Every unit in the Indian Army belongs to a precise echelon — from Army HQ down to the individual Company & Section.
          </p>

          <div className={styles.treeOuterScroll}>
            {loading ? (
              <div className={styles.loadingBox}>Loading Command Tree...</div>
            ) : (
              <ChainOfCommandTree data={treeData} />
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`${styles.ctaWrap} animate__animated animate__fadeIn`}
          style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
          <p className={styles.ctaLabel}>Explore the full Order of Battle with every Corps and Division</p>
          <button
            id="view-order-of-battle"
            className={styles.ctaButton}
            onClick={goToDetails}
          >
            View Full Order of Battle
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}


